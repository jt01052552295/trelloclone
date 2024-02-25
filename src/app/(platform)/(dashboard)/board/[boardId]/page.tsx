import React from 'react'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { auth } from '@/auth'

interface BoardIdPageProps {
  params: {
    boardId: string
  }
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
  const { user }: any = await auth()
  const orgId = 'organization-1'

  if (!user) {
    redirect('/select-org')
  }

  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: 'asc',
        },
      },
    },
    orderBy: {
      order: 'asc',
    },
  })

  return <div className="p-4 h-full overflow-x-auto">{params.boardId}</div>
}

export default BoardIdPage
