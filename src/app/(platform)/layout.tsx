import { ReactNode } from 'react'
import AuthSession from '@/components/AuthSession'
import { Toaster } from 'sonner'

type Props = { children: ReactNode; modal: ReactNode }
const PlatformLayout = ({ children, modal }: Props) => {
  return (
    <div data-layout="platform">
      <AuthSession>
        <Toaster />
        {children}
        {modal}
      </AuthSession>
    </div>
  )
}

export default PlatformLayout
