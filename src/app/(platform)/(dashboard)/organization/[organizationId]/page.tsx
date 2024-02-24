import { Suspense } from 'react'
import { auth, signOut } from '@/auth'

import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'
import { useAction } from '@/hooks/use-action'
import { createBoard } from '@/actions/create-board'

const OrganizationIdPage = async () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, 'success')
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const image = '1|2|3|4|5'

    execute({ title, image })
  }

  const boards = await db.board.findMany()
  return (
    <div className="w-full mb-20">
      <form action={onSubmit}>
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
