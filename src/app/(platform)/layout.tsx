import { ReactNode } from 'react'
import AuthSession from '@/components/AuthSession'
import { Toaster } from 'sonner'

type Props = { children: ReactNode; modal: ReactNode }
const PlatformLayout = ({ children, modal }: Props) => {
  return (
    <AuthSession>
      <Toaster />
      {children}
      {modal}
    </AuthSession>
  )
}

export default PlatformLayout
