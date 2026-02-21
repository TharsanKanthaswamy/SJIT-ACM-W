import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    // Set up the Supabase Client
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // Verify the user via getUser() (secure method)
    const {
        data: { user },
    } = await supabase.auth.getUser()

    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
    const isLoginRoute = request.nextUrl.pathname === '/admin/login'
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL

    if (isAdminRoute && !isLoginRoute) {
        // 1. If not authenticated, redirect to login
        if (!user) {
            const url = request.nextUrl.clone()
            url.pathname = '/admin/login'
            return NextResponse.redirect(url)
        }

        // 2. If authenticated but wrong email, redirect to home
        if (user.email !== adminEmail) {
            const url = request.nextUrl.clone()
            url.pathname = '/'
            return NextResponse.redirect(url)
        }
    }

    // 3. If accessing login route but already logged in as admin, bypass login
    if (isLoginRoute && user && user.email === adminEmail) {
        const url = request.nextUrl.clone()
        url.pathname = '/admin/updates' // or wherever they should land
        return NextResponse.redirect(url)
    }

    return supabaseResponse
}
