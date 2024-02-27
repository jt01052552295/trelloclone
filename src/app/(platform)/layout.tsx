import { ReactNode } from 'react'
import AuthSession from '@/components/AuthSession'
import { Toaster } from 'sonner'

import { ModalProvider } from '@/components/providers/modal-provider'
import { QueryProvider } from '@/components/providers/query-provider'

type Props = { children: ReactNode; modal: ReactNode }
const PlatformLayout = ({ children, modal }: Props) => {
  return (
    <AuthSession>
      <QueryProvider>
        <Toaster />
        <ModalProvider />
        {children}
        {modal}
      </QueryProvider>
    </AuthSession>
  )
}

export default PlatformLayout
