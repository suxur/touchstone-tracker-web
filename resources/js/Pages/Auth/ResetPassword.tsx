import * as React from 'react';
import { FormEvent } from 'react';
import { Head, useForm } from '@inertiajs/inertia-react';

import useRoute from '@/Hooks/useRoute';
import { GuestLayout } from '@/Layouts/GuestLayout';
import { Button } from '@/Components/Button';
import { AuthLabel } from '@/Components/Auth/Label';
import { AuthInput } from '@/Components/Auth/Input';

interface Props {
  token: string;
  email: string;
}

export default function ResetPassword({ token, email }: Props) {
  const route = useRoute();
  const form = useForm({
    token,
    email,
    password: '',
    password_confirmation: '',
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    form.post(route('password.update'), {
      onFinish: () => form.reset('password', 'password_confirmation'),
    });
  };

  return (
    <GuestLayout>
      <Head title="Reset Password" />

      <form onSubmit={onSubmit}>
        <div className="mt-4">
          <AuthLabel title="Email" name="email" error={form.errors.email} />
          <AuthInput
            type="email"
            name="email"
            value={form.data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            onChange={e => form.setData('email', e.target.value)}
            required
            hasError={!!form.errors.email}
          />
        </div>

        <div className="mt-4">
          <AuthLabel title="Password" name="password" error={form.errors.password} />
          <AuthInput
            type="password"
            name="password"
            value={form.data.password}
            className="mt-1 block w-full"
            autoComplete="new-password"
            onChange={e => form.setData('password', e.target.value)}
            required
            hasError={!!form.errors.password}
          />
        </div>

        <div className="mt-4">
          <AuthLabel title="Confirm Password" name="password_confirmation" error={form.errors.password_confirmation} />
          <AuthInput
            type="password"
            name="password_confirmation"
            value={form.data.password_confirmation}
            className="mt-1 block w-full"
            onChange={e => form.setData('password_confirmation', e.target.value)}
            required
            hasError={!!form.errors.password_confirmation}
          />
        </div>

        <div className="flex items-center justify-end mt-4">
          <Button processing={form.processing}>
            Reset Password
          </Button>
        </div>
      </form>
    </GuestLayout>
  );
}
