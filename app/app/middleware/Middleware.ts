import { useAuth } from '@/components/AuthProvider'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/problemset')) {
    return NextResponse.rewrite(new URL('/problems', request.url))
  }
  if (request.nextUrl.pathname.startsWith('/profil')) {
    const authState = useAuth()
    if (authState.user) {
        return NextResponse.rewrite(new URL(`/profile/${user.username}`, request.url))
    }else{
        return NextResponse.rewrite(new URL('login/', request.url))
    }
  }
}

export const config = {
    matcher: ['/problems/:path*', '/profil/:path*', '/contest/:path*', '/test/:path*'],
  }

// corse
