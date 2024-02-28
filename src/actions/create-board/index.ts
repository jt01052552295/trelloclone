'use server'
import { auth } from '@/auth'
import { InputType, ReturnType } from './types'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { CreateBoard } from './schema'
import { createAuditLog } from '@/lib/create-audit-log'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { createSafeAction } from '@/lib/create-safe-action'
import { incrementAvailableCount, hasAvailableCount } from '@/lib/org-limit'
import { checkSubscription } from '@/lib/subscription'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { user }: any = await auth()

  if (!user) {
    return {
      error: 'Unauthorized!',
    }
  }
  const canCreate = await hasAvailableCount()
  const isPro = await checkSubscription()
  // const isPro = false

  if (!canCreate && !isPro) {
    return {
      error: 'You have reached your limit of free boards. Please upgrade to create more.',
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

    if (!isPro) {
      await incrementAvailableCount()
    }

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
    })
  } catch (error) {
    return {
      error: 'Failed to create.',
    }
  }

  revalidatePath(`/board/${board.id}`)
  // 해당 /URL에 있던 캐시를 삭제하고 다시 생성해주는 함수인데 페이지를 다시 로드해주는 기능도 있음,
  // 새로고침이 아니라 차이점만 바꿔주는 새로고침

  return { data: board }
}

export const createBoard = createSafeAction(CreateBoard, handler)
