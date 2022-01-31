import * as React from 'react';
import { FormEvent, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

import useRoute from '@/Hooks/useRoute';
import { GuestLayout } from '@/Layouts/GuestLayout';
import { AuthLabel } from '@/Components/Auth/Label';
import { AuthInput } from '@/Components/Auth/Input';
import { JetBanner, JetButton, JetCheckbox } from '@/Components/Jetstream';
import useTypedPage from '@/Hooks/useTypedPage';

interface Props {
  status: string;
  canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: Props) {
  const route = useRoute();
  const { errors } = useTypedPage().props;

  const form = useForm({
    email: '',
    password: '',
    remember: false,
  });

  useEffect(() => () => {
    form.reset('password');
  }, [form]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    form.post(route('login'));
  };

  return (
    <GuestLayout>
      <Head title="Login" />

      {status && <JetBanner className="mb-4 rounded-md" message={status} style="success" />}
      {errors.email && <JetBanner className="mb-4 rounded-md" message={errors.email} style="danger" />}

      <form onSubmit={onSubmit}>
        <div>
          <AuthLabel title="Email" name="email" error={form.errors.email} />
          <AuthInput
            type="text"
            name="email"
            value={form.data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            autoFocus
            onChange={e => form.setData('email', e.target.value)}
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
            autoComplete="current-password"
            onChange={e => form.setData('password', e.target.value)}
            hasError={!!form.errors.password}
          />
        </div>

        <div className="block mt-4">
          <label className="flex items-center">
            <JetCheckbox
              name="remember"
              checked={form.data.remember}
              onChange={e => form.setData('remember', e.target.checked)}
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
        </div>

        <div className="flex items-center justify-end mt-4">
          {canResetPassword && (
            <Link
              href={route('password.request')}
              className="underline text-sm text-gray-600 hover:text-gray-900"
            >
              Forgot your password?
            </Link>
          )}

          <JetButton className="ml-4" processing={form.processing}>
            Login
          </JetButton>
        </div>
      </form>
    </GuestLayout>
  );
}
