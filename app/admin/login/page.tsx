'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { loginAdmin } from '@/app/actions'

export default function LoginPage() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { toast } = useToast()

    const handleLogin = async (formData: FormData) => {
        setLoading(true)

        const result = await loginAdmin(formData)

        if (result?.error) {
            toast({
                title: "Login Failed",
                description: result.error,
                variant: "destructive",
            })
            setLoading(false)
        } else {
            router.push('/admin/events')
            router.refresh()
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Card className="w-full max-w-md shadow-lg border-0">
                <CardHeader className="space-y-1 pb-8">
                    <CardTitle className="text-3xl font-extrabold text-center text-[#1B3C53]">Admin Login</CardTitle>
                    <CardDescription className="text-center text-gray-500">
                        Enter your credentials to access the dashboard
                    </CardDescription>
                </CardHeader>
                <form action={handleLogin}>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="font-bold text-[#1B3C53]">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="admin@example.com"
                                required
                                className="p-6"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="font-bold text-[#1B3C53]">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="p-6"
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            type="submit"
                            className="w-full py-6 text-lg font-bold bg-[#1B3C53] hover:bg-[#153043] transition-all"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
