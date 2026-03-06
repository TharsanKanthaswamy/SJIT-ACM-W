'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/-+/g, '-')
}

export async function createEvent(formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const eventDateStr = formData.get('eventDate') as string
    const eventDate = eventDateStr ? new Date(eventDateStr).toISOString() : new Date().toISOString()
    const shortDescription = formData.get('shortDescription') as string
    const fullSummary = formData.get('fullSummary') as string
    const registrationOpen = formData.get('registrationOpen') === 'true'
    const registrationDateStr = formData.get('registrationDate') as string
    const registrationDate = registrationDateStr ? new Date(registrationDateStr).toISOString() : null
    const registrationLink = formData.get('registrationLink') as string | null
    const published = formData.get('published') === 'true'

    // Single image upload for now to match other pages, but the schema supports an array `images`
    // Actually, we'll store it as an array of length 1 or 0 for now.
    const file = formData.get('image') as File | null
    const images: string[] = []

    if (file && file.size > 0) {
        const validTypes = ['image/jpeg', 'image/png', 'image/webp']
        if (!validTypes.includes(file.type)) return { error: 'Invalid file type.' }
        if (file.size > 5 * 1024 * 1024) return { error: 'File size exceeds 5MB limit.' }

        const fileExt = file.name.split('.').pop()
        const eventSlug = slugify(title)
        const fileName = `${eventSlug}/${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`

        const adminClient = createAdminClient()
        const { error: uploadError } = await adminClient.storage
            .from('event-images')
            .upload(fileName, file)

        if (uploadError) return { error: `Upload failed: ${uploadError.message}` }

        const { data: publicUrlData } = adminClient.storage
            .from('event-images')
            .getPublicUrl(fileName)

        images.push(publicUrlData.publicUrl)
    }

    const { error } = await supabase
        .from('events')
        .insert([{ title, event_date: eventDate, short_description: shortDescription, full_summary: fullSummary, registration_open: registrationOpen, registration_date: registrationDate, registration_link: registrationLink, published, images }])

    if (error) return { error: error.message }

    revalidatePath('/admin/events')
    revalidatePath('/')
    return { success: true }
}

export async function updateEvent(id: string, formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const eventDateStr = formData.get('eventDate') as string
    const eventDate = eventDateStr ? new Date(eventDateStr).toISOString() : new Date().toISOString()
    const shortDescription = formData.get('shortDescription') as string
    const fullSummary = formData.get('fullSummary') as string
    const registrationOpen = formData.get('registrationOpen') === 'true'
    const registrationDateStr = formData.get('registrationDate') as string
    const registrationDate = registrationDateStr ? new Date(registrationDateStr).toISOString() : null
    const registrationLink = formData.get('registrationLink') as string | null
    const published = formData.get('published') === 'true'

    const file = formData.get('image') as File | null
    const existingImageUrl = formData.get('existingImageUrl') as string

    let images: string[] = existingImageUrl ? [existingImageUrl] : []

    if (file && file.size > 0) {
        const validTypes = ['image/jpeg', 'image/png', 'image/webp']
        if (!validTypes.includes(file.type)) return { error: 'Invalid file type' }
        if (file.size > 5 * 1024 * 1024) return { error: 'File size exceeds 5MB' }

        const fileExt = file.name.split('.').pop()
        const eventSlug = slugify(title)
        const fileName = `${eventSlug}/${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`

        const adminClient = createAdminClient()
        const { error: uploadError } = await adminClient.storage
            .from('event-images')
            .upload(fileName, file)

        if (uploadError) return { error: `Upload failed: ${uploadError.message}` }

        const { data: publicUrlData } = adminClient.storage
            .from('event-images')
            .getPublicUrl(fileName)

        images = [publicUrlData.publicUrl]
    }

    const { error } = await supabase
        .from('events')
        .update({ title, event_date: eventDate, short_description: shortDescription, full_summary: fullSummary, registration_open: registrationOpen, registration_date: registrationDate, registration_link: registrationLink, published, images })
        .eq('id', id)

    if (error) return { error: error.message }

    revalidatePath('/admin/events')
    revalidatePath('/')
    return { success: true }
}

export async function deleteEvent(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('events').delete().eq('id', id)
    if (error) return { error: error.message }

    revalidatePath('/admin/events')
    revalidatePath('/')
    return { success: true }
}
