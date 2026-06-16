import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import SuccessVisual from './SuccessVisual'
// তৈরি করা ভিজ্যুয়াল কম্পোনেন্টটি ইমপোর্ট করুন

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    customer_details
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  // সফল হলে প্রিমিয়াম অ্যানিমেটেড পেজটি দেখাবে
  if (status === 'complete') {
    const customerEmail = customer_details?.email || 'your email';
    return <SuccessVisual customerEmail={customerEmail} />
  }
}