// import Stripe from "stripe";
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'

export async function GET(req: Request) {
  const { body } = await req.json()
  const signature = headers().get('Stripe-Signature') as string
  const orgId = 'organization-1'

  //   let event: Stripe.Event

  //   try {
  //     event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  //   } catch (error) {
  //     return new NextResponse('Webhook error', { status: 400 })
  //   }

  //   const session = event.data.object as Stripe.Checkout.Session

  if (false) {
    // const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
    // if (!session?.metadata?.orgId) {
    //   return new NextResponse('Org ID is required', { status: 400 })
    // }
    // await db.orgSubscription.create({
    //   data: {
    //     orgId: orgId,
    //     stripeSubscriptionId: subscription.id,
    //     stripeCustomerId: subscription.customer as string,
    //     stripePriceId: subscription.items.data[0].price.id,
    //     stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
    //   },
    // })
  }

  if (false) {
    // const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
    // await db.orgSubscription.update({
    //   where: {
    //     stripeSubscriptionId: subscription.id,
    //   },
    //   data: {
    //     stripePriceId: subscription.items.data[0].price.id,
    //     stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
    //   },
    // })
  }

  return new NextResponse(body, { status: 200 })
}
