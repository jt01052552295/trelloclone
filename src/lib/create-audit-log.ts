import { auth } from '@/auth'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

import { db } from '@/lib/db'

interface Props {
  entityId: string
  entityType: ENTITY_TYPE
  entityTitle: string
  action: ACTION
}

export const createAuditLog = async (props: Props) => {
  try {
    const { user }: any = await auth()
    const orgId = 'organization-1'

    if (!user || !orgId) {
      throw new Error('User not found!')
    }

    const { entityId, entityType, entityTitle, action } = props
    console.log('createAuditLog', user)
    await db.auditLog.create({
      data: {
        orgId,
        entityId,
        entityType,
        entityTitle,
        action,
        userId: user?.email ?? '',
        userImage: user?.imageUrl ?? '',
        userName: user?.name ?? '',
      },
    })
  } catch (error) {
    console.error('[AUDIT_LOG_ERROR]', error)
  }
}
