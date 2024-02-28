'use server'

import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

import { db } from '@/lib/db'
import { createAuditLog } from '@/lib/create-audit-log'
import { createSafeAction } from '@/lib/create-safe-action'

import { StripeRedirect } from './schema'
import { InputType, ReturnType } from './types'

import { absoluteUrl } from '@/lib/utils'
import { stripe } from '@/lib/stripe'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { user }: any = await auth()

  if (!user) {
    return {
      error: 'Unauthorized!',
    }
  }
  const orgId = 'organization-1'

  const settingsUrl = absoluteUrl(`/organization/${orgId}`)

  let url = ''

  try {
    const orgSubscription = await db.orgSubscription.findUnique({
      where: {
        orgId,
      },
    })

    if (orgSubscription && orgSubscription.stripeCustomerId) {
      console.log('StripeRedirect', 1)
      //   const stripeSession = await stripe.billingPortal.sessions.create({
      //     customer: orgSubscription.stripeCustomerId,
      //     return_url: settingsUrl,
      //   })
      //   url = stripeSession.url
    } else {
      console.log('StripeRedirect', 2)
      //   const stripeSession = await stripe.checkout.sessions.create({
      //     success_url: settingsUrl,
      //     cancel_url: settingsUrl,
      //     payment_method_types: ['card'],
      //     mode: 'subscription',
      //     billing_address_collection: 'auto',
      //     customer_email: user.emailAddresses[0].emailAddress,
      //     line_items: [
      //       {
      //         price_data: {
      //           currency: 'USD',
      //           product_data: {
      //             name: 'Taskify Pro',
      //             description: 'Unlimited boards for your organization',
      //           },
      //           unit_amount: 2000,
      //           recurring: {
      //             interval: 'month',
      //           },
      //         },
      //         quantity: 1,
      //       },
      //     ],
      //     metadata: {
      //       orgId,
      //     },
      //   })
      //   url = stripeSession.url || ''
    }
  } catch {
    return {
      error: 'Something went wrong!',
    }
  }

  revalidatePath(`/organization/${orgId}`)
  return { data: url }
}

export const stripeRedirect = createSafeAction(StripeRedirect, handler)
