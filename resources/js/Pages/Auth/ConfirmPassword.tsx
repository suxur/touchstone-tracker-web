import * as React from 'react';
import { FormEvent } from 'react';
import { Head, useForm } from '@inertiajs/inertia-react';

import useRoute from '@/Hooks/useRoute';
import { JetAuthenticationCard } from '@/Components/Jetstream/AuthenticationCard';
import { JetButton } from '@/Components/Jetstream/Button';
import { AuthLabel } from '@/Components/Auth/Label';
import { AuthInput } from '@/Components/Auth/Input';

export default function ConfirmPassword() {
  const route = useRoute();
  const form = useForm({
    password: '',
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    form.post(route('password.confirm'), {
      onFinish: () => form.reset(),
    });
  };

  return (
    <JetAuthenticationCard>
      <Head title="Secure Area" />

      <div className="mb-4 text-sm text-gray-600">
        This is a secure area of the application. Please confirm your password
        before continuing.
      </div>

      <form onSubmit={onSubmit}>
        <div>
          <AuthLabel title="Password" name="password" error={form.errors.password} />
          <AuthInput
            type="password"
            name="password"
            value={form.data.password}
            className="mt-1 block w-full"
            autoComplete="current-password"
            onChange={e => form.setData('password', e.target.value)}
            required
            hasError={!!form.errors.password}
          />
        </div>

        <div className="flex justify-end mt-4">
          <JetButton processing={form.processing}>
            Confirm
          </JetButton>
        </div>
      </form>
    </JetAuthenticationCard>
  );
}
