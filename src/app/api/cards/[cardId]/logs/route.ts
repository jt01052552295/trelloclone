import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import { ENTITY_TYPE } from '@prisma/client'

import { db } from '@/lib/db'

export async function GET(request: Request, { params }: { params: { cardId: string } }) {
  try {
    const { user }: any = await auth()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const orgId = 'organization-1'

    const auditLogs = await db.auditLog.findMany({
      where: {
        orgId,
        entityId: params.cardId,
        entityType: ENTITY_TYPE.CARD,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 3,
    })

    return NextResponse.json(auditLogs)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
