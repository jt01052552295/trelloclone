'use server'

import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'
import { createSafeAction } from '@/lib/create-safe-action'

import { UpdateCardOrder } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { user }: any = await auth()

  if (!user) {
    return {
      error: 'Unauthorized!',
    }
  }
  const orgId = 'organization-1'

  const { items, boardId } = data
  let updatedCards

  try {
    const transaction = items.map((card) =>
      db.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              orgId,
            },
          },
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      })
    )

    updatedCards = await db.$transaction(transaction)
  } catch (error) {
    return {
      error: 'Failed to cards reorder.',
    }
  }

  revalidatePath(`/board/${boardId}`)
  return { data: updatedCards }
}

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler)
