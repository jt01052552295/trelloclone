'use client'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const Logout = () => {
  const { data: me } = useSession()
  const router = useRouter()

  const onLogout = () => {
    console.log(me) // 세션정보 확인가능함.
    signOut({ redirect: false }).then(() => {
      router.replace('/')
    })
  }

  return <Button onClick={onLogout}>Sign out</Button>
}

export default Logout
