'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react' // 클라이언트

const SigninPage = () => {
  const [id, setId] = useState('Bianca')
  const [pwd, setPassword] = useState('1111')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value)
  }

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value)
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      console.log(id, pwd)
      // auth.ts 에 등록한 signIn이 여기서 쓴다.
      const response = await signIn('credentials', {
        username: id,
        password: pwd,
        redirect: false, // 서버쪽에서 리다이렉트 함.
      })

      if (!response?.ok) {
        setMessage('로그인 실패.')
      } else {
        router.replace('/organization/organization-1')
      }
    } catch (err) {
      console.error(err)
      setMessage('아이디와 비밀번호가 일치하지 않습니다.')
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Button type="submit">sign in</Button>
      </form>
    </div>
  )
}

export default SigninPage
