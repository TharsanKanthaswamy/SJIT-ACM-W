'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createUpdate(formData: FormData) {
    const supabase = await createClient()

    // Extract from formData
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const content = formData.get('content') as string
    const published = formData.get('published') === 'true'
    const dateStr = formData.get('date') as string
    const date = dateStr ? new Date(dateStr).toISOString() : new Date().toISOString()

    const file = formData.get('image') as File | null

    let imageUrl = null

    if (file && file.size > 0) {
        // Validate type
        const validTypes = ['image/jpeg', 'image/png', 'image/webp']
        if (!validTypes.includes(file.type)) {
            return { error: 'Invalid file type. Only JPG, PNG, and WEBP are allowed.' }
        }
        // Validate size (5MB = 5 * 1024 * 1024)
        if (file.size > 5 * 1024 * 1024) {
            return { error: 'File size exceeds 5MB limit.' }
        }

        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`

        const { error } = await supabase.storage
            .from('updates-images')
            .upload(fileName, file)

        if (error) {
            return { error: `Upload failed: ${error.message}` }
        }

        const { data: publicUrlData } = supabase.storage
            .from('updates-images')
            .getPublicUrl(fileName)

        imageUrl = publicUrlData.publicUrl
    }

    const { error } = await supabase
        .from('updates')
        .insert([{ title, description, content, published, date, imageUrl }])

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin/updates')
    revalidatePath('/updates')
    return { success: true }
}

export async function updateUpdate(id: string, formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const content = formData.get('content') as string
    const published = formData.get('published') === 'true'
    const dateStr = formData.get('date') as string
    const date = dateStr ? new Date(dateStr).toISOString() : new Date().toISOString()

    const file = formData.get('image') as File | null
    const existingImageUrl = formData.get('existingImageUrl') as string

    let imageUrl = existingImageUrl

    if (file && file.size > 0) {
        const validTypes = ['image/jpeg', 'image/png', 'image/webp']
        if (!validTypes.includes(file.type)) return { error: 'Invalid file type' }
        if (file.size > 5 * 1024 * 1024) return { error: 'File size exceeds 5MB' }

        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`

        const { error: uploadError } = await supabase.storage
            .from('updates-images')
            .upload(fileName, file)

        if (uploadError) return { error: `Upload failed: ${uploadError.message}` }

        const { data: publicUrlData } = supabase.storage
            .from('updates-images')
            .getPublicUrl(fileName)

        imageUrl = publicUrlData.publicUrl
    }

    const { error } = await supabase
        .from('updates')
        .update({ title, description, content, published, date, imageUrl })
        .eq('id', id)

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
