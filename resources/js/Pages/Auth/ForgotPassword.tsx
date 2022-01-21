import * as React from 'react';
import { FormEvent } from 'react';
import { Head, useForm } from '@inertiajs/inertia-react';

import useRoute from '@/Hooks/useRoute';
import { GuestLayout } from '@/Layouts/GuestLayout';
import { JetButton } from '@/Components/Jetstream/Button';
import { AuthLabel } from '@/Components/Auth/Label';
import { AuthInput } from '@/Components/Auth/Input';
import { JetBanner } from '@/Components/Jetstream';

interface Props {
  status: string;
}

export default function ForgotPassword({ status }: Props) {
  const route = useRoute();
  const form = useForm({
    email: '',
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    form.post(route('password.email'));
  }

  return (
    <GuestLayout>
      <Head title="Forgot Password" />

      {status && <JetBanner className="mb-4 rounded-md" message={status} style="success" />}

      <div className="mb-4 text-sm text-gray-600">
        Forgot your password? No worries! Let us know your email address
        and we will email you a password reset link that will allow you to
        choose a new one.
      </div>

      <form onSubmit={onSubmit}>
        <div>
          <AuthLabel title="Email" name="Email" error={form.errors.email} />
          <AuthInput
            id="email"
            type="email"
            className="mt-1 block w-full"
            value={form.data.email}
            onChange={e => form.setData('email', e.currentTarget.value)}
            required
            autoFocus
            hasError={!!form.errors.email}
          />
        </div>

        <div className="flex items-center justify-end mt-4">
          <JetButton processing={form.processing}>
            Email Password Reset Link
          </JetButton>
        </div>
      </form>
    </GuestLayout>
  );
}
