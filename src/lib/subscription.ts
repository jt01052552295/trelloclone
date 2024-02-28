import { auth } from '@/auth'
import { db } from '@/lib/db'

const DAY_IN_MS = 86_400_000

export const checkSubscription = async () => {
  const { user }: any = await auth()

  if (!user) {
    return false
  }
  const orgId = 'organization-1'

  const orgSubscription = await db.orgSubscription.findUnique({
    where: {
      orgId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  })

  if (!orgSubscription) {
    return false
  }

  const isValid = orgSubscription.stripePriceId && orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

  return !!isValid
}
