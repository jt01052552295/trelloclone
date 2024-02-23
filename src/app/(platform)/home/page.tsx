import React from 'react'
import { auth, signOut } from '@/auth'

const HomePage = async () => {
  const { user }: any = await auth()
  console.log(user)
  return <div>HomePage</div>
}

export default HomePage
