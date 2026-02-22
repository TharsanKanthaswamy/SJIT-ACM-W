'use server'

import { createClient } from '@/lib/supabase/server'

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
