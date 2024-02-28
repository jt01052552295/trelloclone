'use server'
import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { db } from '@/lib/db'
import { createSafeAction } from '@/lib/create-safe-action'

import { UpdateBoard } from './schema'
import { InputType, ReturnType } from './types'
import { createAuditLog } from '@/lib/create-audit-log'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { decreaseAvailableCount } from '@/lib/org-limit'
// import { checkSubscription } from "@/lib/subscription";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { user }: any = await auth()

  if (!user) {
    return {
      error: 'Unauthorized!',
    }
  }

  //   const isPro = await checkSubscription()
  const isPro = false
  const orgId = 'organization-1'

  const { title, id } = data
  let board

  try {
    board = await db.board.update({
      where: {
        id,
        orgId,
      },
      data: {
        title,
      },
    })

    if (!isPro) {
      await decreaseAvailableCount()
    }

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.DELETE,
    })
  } catch (error) {
    return {
      error: 'Failed to delete.',
    }
  }

  revalidatePath(`/board/${id}`)
  return { data: board }
}

export const updateBoard = createSafeAction(UpdateBoard, handler)
