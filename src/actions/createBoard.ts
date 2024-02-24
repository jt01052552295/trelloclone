'use server'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const CreateBoard = z.object({
  title: z.string(),
})

export async function create(formData: FormData) {
  const { title } = CreateBoard.parse({
    title: formData.get('title'),
  })

  const orgId = '1'
  const imageId = '2'
  const imageThumbUrl = '3'
  const imageFullUrl = '4'
  const imageUserName = '5'
  const imageLinkHTML = '6'

  await db.board.create({
    data: { title, orgId, imageId, imageThumbUrl, imageFullUrl, imageUserName, imageLinkHTML },
  })

  revalidatePath('/organization/organization-1')
}
