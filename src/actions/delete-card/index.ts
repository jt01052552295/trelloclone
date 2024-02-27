'use server'

import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

import { db } from '@/lib/db'
// import { createAuditLog } from "@/lib/create-audit-log";
import { createSafeAction } from '@/lib/create-safe-action'

import { DeleteCard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { user }: any = await auth()

  if (!user) {
    return {
      error: 'Unauthorized!',
    }
  }

  const orgId = 'organization-1'

  const { id, boardId } = data
  let card

  try {
    card = await db.card.delete({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    })

    // await createAuditLog({
    //   entityTitle: card.title,
    //   entityId: card.id,
    //   entityType: ENTITY_TYPE.CARD,
    //   action: ACTION.DELETE,
    // })
  } catch (error) {
    return {
      error: 'Failed to delete.',
    }
  }

  revalidatePath(`/board/${boardId}`)
  return { data: card }
}

export const deleteCard = createSafeAction(DeleteCard, handler)
