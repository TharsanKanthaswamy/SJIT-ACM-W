'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormValues = z.infer<typeof contactSchema>

export function ContactForm() {
    const [isPending, setIsPending] = useState(false)
    const { toast } = useToast()

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema)
    })

    // Simulated submission since DB schema wasn't specified for messages in this architecture run
    const onSubmit = async (data: ContactFormValues) => {
        setIsPending(true)
        try {
            // Simulate network
            await new Promise(resolve => setTimeout(resolve, 1500))
            console.log('Sending message:', data)
            toast({
                title: "Message Sent!",
                description: "Thank you for reaching out. We will get back to you soon.",
            })
            reset()
        } catch {
            toast({
                title: "Error",
                description: "Failed to send message. Please try again.",
                variant: "destructive"
            })
        } finally {
            setIsPending(false)
        }
    }

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-soft-xl"
        >
            <div>
                <Input
                    {...register("name")}
                    placeholder="Your Full Name"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 p-6 rounded-lg focus-visible:ring-white/30"
                />
                {errors.name && <p className="text-red-300 text-sm mt-2">{errors.name.message}</p>}
            </div>

            <div>
                <Input
                    {...register("email")}
                    type="email"
                    placeholder="Your Email Address"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 p-6 rounded-lg focus-visible:ring-white/30"
                />
                {errors.email && <p className="text-red-300 text-sm mt-2">{errors.email.message}</p>}
            </div>

            <div>
                <Textarea
                    {...register("message")}
                    placeholder="How can we help you?"
                    rows={5}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 p-6 rounded-lg focus-visible:ring-white/30 resize-none"
                />
                {errors.message && <p className="text-red-300 text-sm mt-2">{errors.message.message}</p>}
            </div>

            <Button
                type="submit"
                className="w-full py-6 text-lg font-bold bg-[#D2C1B6] text-[#1B3C53] hover:bg-white transition-colors rounded-lg flex items-center justify-center"
                disabled={isPending}
            >
                {isPending ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</>
                ) : "Send Message"}
            </Button>
        </motion.form>
    )
}
