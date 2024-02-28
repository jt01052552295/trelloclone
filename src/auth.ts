import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { cookies } from 'next/headers'
import cookie from 'cookie'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    // 로그인, 회원가입 url을 등록함.
    signIn: '/sign-in',
    newUser: '/sign-up',
  },
  callbacks: {
    session({ session, newSession, user }) {
      // console.log('auth.ts session', session, newSession, user)
      return session
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        console.log('CredentialsProvider11', credentials)
        // console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/login`)
        const authResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            id: credentials.username,
            pwd: credentials.password,
          }),
        })

        let setCookie = authResponse.headers.get('Set-Cookie')
        console.log('set-cookie', setCookie)
        if (setCookie) {
          const parsed = cookie.parse(setCookie)
          cookies().set('connect.sid', parsed['connect.sid'], parsed) // 브라우저에 쿠키를 심어주는 것
        }

        if (!authResponse.ok) {
          return { error: 'what?' }
        }

        const user = await authResponse.json()
        console.log('CredentialsProvider22', user)
        // NextAuth 에서 user 타입이 id, name, email, image 고정되있어서 아래처럼 해줘야됨.
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          ...user,
        }
      },
    }),
  ],
})
