import { Suspense } from 'react'
import { auth, signOut } from '@/auth'

import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'
import { useAction } from '@/hooks/use-action'
import { createBoard } from '@/actions/create-board'
import Info from './_components/info'
import { Separator } from '@/components/ui/separator'
import { BoardList } from './_components/board-list'

const OrganizationIdPage = async () => {
  const boards = await db.board.findMany()
  return (
    <div className="w-full mb-20">
      <Info isPro={false} />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  )
}

export default OrganizationIdPage
