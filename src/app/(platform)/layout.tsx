import { ReactNode } from 'react'
import AuthSession from '@/components/AuthSession'

type Props = { children: ReactNode; modal: ReactNode }
const PlatformLayout = ({ children, modal }: Props) => {
  return (
    <div data-layout="platform">
      <AuthSession>
        {children}
        {modal}
      </AuthSession>
    </div>
  )
}

export default PlatformLayout
