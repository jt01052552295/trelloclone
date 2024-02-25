'use server'
import { auth } from '@/auth'
import { InputType, ReturnType } from './types'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { CreateBoard } from './schema'
import { createSafeAction } from '@/lib/create-safe-action'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { user }: any = await auth()

  if (!user) {
    return {
      error: 'Unauthorized!',
    }
  }

  const { title, image } = data

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] = image.split('|')

  if (!imageId || !imageThumbUrl || !imageFullUrl || !imageUserName || !imageLinkHTML) {
    return {
      error: 'Missing fields. Failed to create board.',
    }
  }

  let board

  const orgId = 'organization-1'

  try {
    // throw Error("test");
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHTML,
      },
    })
  } catch (error) {
    return {
      error: 'Failed to create.',
    }
  }

  revalidatePath(`/board/${board.id}`)
  return { data: board }
}

export const createBoard = createSafeAction(CreateBoard, handler)
