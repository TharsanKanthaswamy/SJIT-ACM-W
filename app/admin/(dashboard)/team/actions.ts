'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function createTeamMember(formData: FormData) {
    const supabase = await createClient()

    // Extract from formData
    const name = formData.get('name') as string
    const position = formData.get('position') as string
    const category = formData.get('category') as string || 'student'
    const orderStr = formData.get('orderPosition') as string
    const orderPosition = orderStr ? parseInt(orderStr) : null
    const linkedinUrl = formData.get('linkedinUrl') as string || null

    const file = formData.get('image') as File | null

    let imageUrl = null

    if (file && file.size > 0) {
        const validTypes = ['image/jpeg', 'image/png', 'image/webp']
        if (!validTypes.includes(file.type)) return { error: 'Invalid file type.' }
        if (file.size > 5 * 1024 * 1024) return { error: 'File size exceeds 5MB limit.' }

        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`

        const adminClient = createAdminClient()
        const { error: uploadError } = await adminClient.storage
            .from('team-images')
            .upload(fileName, file)

        if (uploadError) return { error: `Upload failed: ${uploadError.message}` }

        const { data: publicUrlData } = adminClient.storage
            .from('team-images')
            .getPublicUrl(fileName)

        imageUrl = publicUrlData.publicUrl
    }

    const { error } = await supabase
        .from('team_members')
        .insert([{ name, position, category, order_position: orderPosition, image_url: imageUrl, linkedin_url: linkedinUrl }])

    if (error) return { error: error.message }

    revalidatePath('/admin/team')
    revalidatePath('/')
    return { success: true }
}

export async function updateTeamMember(id: string, formData: FormData) {
    const supabase = await createClient()

    const name = formData.get('name') as string
    const position = formData.get('position') as string
    const category = formData.get('category') as string || 'student'
    const orderStr = formData.get('orderPosition') as string
    const orderPosition = orderStr ? parseInt(orderStr) : null
    const linkedinUrl = formData.get('linkedinUrl') as string || null

    const file = formData.get('image') as File | null
    const existingImageUrl = formData.get('existingImageUrl') as string

    let imageUrl = existingImageUrl

    if (file && file.size > 0) {
        const validTypes = ['image/jpeg', 'image/png', 'image/webp']
        if (!validTypes.includes(file.type)) return { error: 'Invalid file type' }
        if (file.size > 5 * 1024 * 1024) return { error: 'File size exceeds 5MB' }

        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`

        const adminClient = createAdminClient()
        const { error: uploadError } = await adminClient.storage
            .from('team-images')
            .upload(fileName, file)

        if (uploadError) return { error: `Upload failed: ${uploadError.message}` }

        const { data: publicUrlData } = adminClient.storage
            .from('team-images')
            .getPublicUrl(fileName)

        imageUrl = publicUrlData.publicUrl
    }

    const { error } = await supabase
        .from('team_members')
        .update({ name, position, category, order_position: orderPosition, image_url: imageUrl, linkedin_url: linkedinUrl })
        .eq('id', id)

    if (error) return { error: error.message }

    revalidatePath('/admin/team')
    revalidatePath('/')
    return { success: true }
}

export async function deleteTeamMember(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('team_members').delete().eq('id', id)
    if (error) return { error: error.message }

    revalidatePath('/admin/team')
    revalidatePath('/')
    return { success: true }
}
