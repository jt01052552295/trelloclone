import { auth } from '@/auth'
import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

export async function GET(req: Request, { params }: { params: { cardId: string } }) {
  try {
    const { user }: any = await auth()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const orgId = 'organization-1'

    const card = await db.card.findUnique({
      where: {
        id: params.cardId,
        list: {
          board: {
            orgId,
          },
        },
      },
      include: {
        list: {
          select: {
            title: true,
          },
        },
      },
    })

    return NextResponse.json(card)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
