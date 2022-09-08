import { ActionMessage, JetFormSection, JetInput, JetLabel } from '@/Components/Jetstream';
import clsx from 'clsx';
import { PriceCard } from '@/Components/PriceCard';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { PaymentMethod } from '@stripe/stripe-js';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useRoute from '@/Hooks/useRoute';
import { StripeCardElement } from '@stripe/stripe-js/types/stripe-js/elements';
import { Button } from '@/Components/Button';

type StripePlan = {
  id: string;
  price: number;
  product_id: string;
}

interface FormProps {
  name: string;
  price_id: string;
  payment_method_id: string | PaymentMethod | null;
}

interface Props {
  clientSecret: string;
  plans: {
    monthly: StripePlan,
    yearly: StripePlan
  };
}

const paymentMethod = (card: StripeCardElement, name: string) => {
  return { payment_method: { card, billing_details: { name } } };
};

export const SubscriptionForm = ({ clientSecret, plans }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const route = useRoute();

  const [processing, setProcessing] = useState(false);
  const [recurring, setRecurring] = useState<'monthly' | 'yearly'>('monthly');

  const form = useForm<FormProps>();

  const onSubmit = (data: FormProps) => {
    axios.post(route('subscription.update'), data);
  };

  const handleSubmit = async () => {
    if (!stripe || !elements) return;
    const cardElement = elements.getElement('card');
    if (cardElement) {
      setProcessing(true);
      const { setupIntent, error } = await stripe.confirmCardSetup(
        clientSecret,
        paymentMethod(cardElement, form.getValues('name'))
      );
      setProcessing(false);

      if (error) {
        console.log(error);
      } else {
        form.setValue('payment_method_id', setupIntent.payment_method)
        await form.handleSubmit(onSubmit)();
      }
    }
  };

  return (
    <JetFormSection
      onSubmit={handleSubmit}
      title="Subscription"
      description="Upgrade or downgrade your account"
      renderActions={() => (
        <>
          <Button
            className={clsx({ 'opacity-25': processing })}
            disabled={processing}
          >
            Save
          </Button>
          <ActionMessage on={false} className="ml-3">
            Saved.
          </ActionMessage>
        </>
      )}
    >
      <div className="col-span-6">
        <div className="flex items-center justify-center">
          <div className="inline-flex" role="group">
            <Button
              type="button"
              className="rounded-r-none"
              bg={recurring === 'monthly' ? 'primary' : 'primary-inverted'}
              onClick={() => setRecurring('monthly')}
            >
              Monthly
            </Button>
            <Button
              type="button"
              className="rounded-l-none"
              bg={recurring === 'yearly' ? 'primary' : 'primary-inverted'}
              onClick={() => setRecurring('yearly')}
            >
              Yearly
            </Button>
          </div>
        </div>
      </div>
      <div className="col-span-6 grid grid-cols-6 gap-6">
        <PriceCard recurring="monthly" type="Basic" onClick={() => form.setValue('price_id', '')} />
        <PriceCard
          price={plans[recurring]?.price}
          recurring={recurring}
          type="Pro"
          onClick={() => form.setValue('price_id', plans[recurring]?.id)}
        />
      </div>
      <div className={clsx('col-span-6', { 'hidden': form.getValues('price_id') === '' })}>
        <div className="col-span-6 sm:col-span-4 mb-2">
          <JetLabel htmlFor="name" value="Name" />
          <JetInput
            id="name"
            type="text"
            className="mt-1 block w-full"
            autoComplete="name"
            { ...form.register('name') }
          />
        </div>
        <div className="col-span-6 sm:col-span-4">
          <JetLabel value="Payment Info" className="mb-1" />
          <CardElement
            options={{
              classes: { base: 'form-input StripeElement' }
            }}
          />
        </div>
      </div>
    </JetFormSection>
  );
};
