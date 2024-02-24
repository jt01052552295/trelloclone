import { Suspense } from 'react'
import { auth, signOut } from '@/auth'
import { create } from '@/actions/createBoard'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'

const OrganizationIdPage = async () => {
  const boards = await db.board.findMany()
  return (
    <div className="w-full mb-20">
      <form action={create}>
        <input id="title" name="title" required className="border-black border p-1" />
        <Button type="submit">Submit</Button>
      </form>
      <div>
        {boards.map((board) => (
          <div key={board.id}>{board.title}</div>
        ))}
      </div>
    </div>
  )
}

export default OrganizationIdPage
