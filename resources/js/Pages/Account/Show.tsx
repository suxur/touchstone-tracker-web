import React from 'react';
import useTypedPage from '@/Hooks/useTypedPage';
import { AppLayout } from '@/Layouts/AppLayout';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { SubscriptionForm } from '@/Domains/Account/SubscriptionForm';

const stripePromise = loadStripe('pk_test_51LTArPC8Qo9OAEzH9grPzRcocVxieqSyLmOyqAv5SbVp5DM6WSkzb9r6KnwQO8SKrycgMN0l4R3ckOAKeds370d900rSDq8DU3');

type StripePlan = {
  id: string;
  price: number;
  product_id: string;
}

interface PageProps {
  intent: {
    client_secret: string;
  },
  plans: {
    monthly: StripePlan,
    yearly: StripePlan
  }
}

export default function Show() {
  const page = useTypedPage<PageProps>();

  const options = {
    clientSecret: page.props.intent.client_secret,
    theme: 'stripe'
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <AppLayout title="Subscription">
        <SubscriptionForm clientSecret={page.props.intent.client_secret} plans={page.props.plans}/>
      </AppLayout>
    </Elements>
  );
}
