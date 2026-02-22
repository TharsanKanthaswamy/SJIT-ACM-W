'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// Keep standard text string generation (UUID hack for unique files without installing heavy uuid lib or standard crypto not being available in some contexts)
function generateUniqueId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export async function uploadAdminImage(formData: FormData, bucketName: 'event-images' | 'team-images' | 'updates-images' | 'assets') {
    const supabase = await createClient()
    const file = formData.get('image') as File | null

    if (!file) {
        return { error: 'No image file provided.' }
    }

    // Validation: 5MB size limit
    if (file.size > 5 * 1024 * 1024) {
        return { error: 'Image size must be less than 5MB.' }
    }

    // Validation: File type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
    if (!validTypes.includes(file.type)) {
        return { error: 'Invalid file type. Only JPG, PNG, and WEBP are allowed.' }
    }

    // Unique filename generation
    const extension = file.name.split('.').pop()
    const safeName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-z0-9]/gi, '_').toLowerCase()
    const uniqueFilename = `${safeName}_${generateUniqueId()}.${extension}`

    // Upload
    const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(uniqueFilename, file, {
            cacheControl: '3600',
            upsert: false
        })

    if (uploadError) {
        return { error: uploadError.message }
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(uniqueFilename)

    return { url: publicUrlData.publicUrl }
}

export async function submitContactForm(formData: {
    name: string
    email: string
    message: string
}) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('contact_messages')
        .insert([{
            name: formData.name,
            email: formData.email,
            message: formData.message,
        }])

    if (error) {
        return { error: error.message }
    }

    return { success: true }
}

export async function loginAdmin(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (email !== process.env.ADMIN_EMAIL) {
        return { error: 'Unauthorized email address.' }
    }

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error.message }
    }

    return { success: true }
}

export async function logoutAdmin() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    return { success: true }
}

// --- TEAM CRUD ---

export async function createTeamMember(formData: FormData) {
    const supabase = await createClient()
    const { error } = await supabase.from('team_members').insert([{
        name: formData.get('name') as string,
        position: formData.get('position') as string,
        image_url: formData.get('image_url') as string,
        order_position: parseInt(formData.get('order_position') as string) || 0,
        linkedin_url: formData.get('linkedin_url') as string || null,
        twitter_url: formData.get('twitter_url') as string || null,
        instagram_url: formData.get('instagram_url') as string || null,
        facebook_url: formData.get('facebook_url') as string || null
    }])

    if (error) return { error: error.message }
    revalidatePath('/admin/team')
    revalidatePath('/')
    revalidatePath('/team')
    return { success: true }
}

export async function updateTeamMember(id: string, formData: FormData) {
    const supabase = await createClient()
    const { error } = await supabase.from('team_members').update({
        name: formData.get('name') as string,
        position: formData.get('position') as string,
        image_url: formData.get('image_url') as string,
        order_position: parseInt(formData.get('order_position') as string) || 0,
        linkedin_url: formData.get('linkedin_url') as string || null,
        twitter_url: formData.get('twitter_url') as string || null,
        instagram_url: formData.get('instagram_url') as string || null,
        facebook_url: formData.get('facebook_url') as string || null
    }).eq('id', id)

    if (error) return { error: error.message }
    revalidatePath('/admin/team')
    revalidatePath('/')
    revalidatePath('/team')
    return { success: true }
}

export async function deleteTeamMember(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('team_members').delete().eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/admin/team')
    revalidatePath('/')
    revalidatePath('/team')
    return { success: true }
}

// --- EVENTS CRUD ---

export async function createEvent(formData: FormData) {
    const supabase = await createClient()
    const { error } = await supabase.from('events').insert([{
        title: formData.get('title') as string,
        event_date: formData.get('event_date') as string,
        short_description: formData.get('short_description') as string,
        full_summary: formData.get('full_summary') as string || null,
        registration_link: formData.get('registration_link') as string || null,
        registration_date: formData.get('registration_date') as string || null,
        registration_open: formData.get('registration_open') === 'true',
        published: formData.get('published') === 'true',
        images: formData.getAll('images') as string[] || []
    }])

    if (error) return { error: error.message }
    revalidatePath('/admin/events')
    revalidatePath('/')
    revalidatePath('/events')
    return { success: true }
}

export async function updateEvent(id: string, formData: FormData) {
    const supabase = await createClient()
    const { error } = await supabase.from('events').update({
        title: formData.get('title') as string,
        event_date: formData.get('event_date') as string,
        short_description: formData.get('short_description') as string,
        full_summary: formData.get('full_summary') as string || null,
        registration_link: formData.get('registration_link') as string || null,
        registration_date: formData.get('registration_date') as string || null,
        registration_open: formData.get('registration_open') === 'true',
        published: formData.get('published') === 'true',
        images: formData.getAll('images') as string[] || []
    }).eq('id', id)

    if (error) return { error: error.message }
    revalidatePath('/admin/events')
    revalidatePath('/')
    revalidatePath('/events')
    return { success: true }
}

export async function deleteEvent(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('events').delete().eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/admin/events')
    revalidatePath('/')
    revalidatePath('/events')
    return { success: true }
}

// --- UPDATES CRUD ---

export async function createUpdate(formData: FormData) {
    const supabase = await createClient()
    const { error } = await supabase.from('updates').insert([{
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        imageUrl: formData.get('imageUrl') as string || null,
        date: formData.get('date') as string,
        published: formData.get('published') === 'true'
    }])

    if (error) return { error: error.message }
    revalidatePath('/admin/updates')
    revalidatePath('/updates')
    return { success: true }
}

export async function editUpdate(id: string, formData: FormData) {
    const supabase = await createClient()
    const { error } = await supabase.from('updates').update({
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        imageUrl: formData.get('imageUrl') as string || null,
        date: formData.get('date') as string,
        published: formData.get('published') === 'true'
    }).eq('id', id)

    if (error) return { error: error.message }
    revalidatePath('/admin/updates')
    revalidatePath('/updates')
    return { success: true }
}

export async function deleteUpdate(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('updates').delete().eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/admin/updates')
    revalidatePath('/updates')
    return { success: true }
}
