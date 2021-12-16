import React, { ChangeEvent, FormEvent, useEffect } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/inertia-react';
import { GuestLayout } from '@/Layouts/GuestLayout';
import { AuthLabel } from '@/Components/Auth/Label';
import { AuthInput } from '@/Components/Auth/Input';
import route from '@/lib/route';
import { Button } from 'react-query/types/devtools/styledComponents';
import { JetButton, JetCheckbox, JetValidationErrors } from '@/Components/Jetstream';
import { Page, PageProps } from '@inertiajs/inertia';

interface Props extends PageProps {
  status: string;
  canResetPassword: boolean;
}

export default function Login() {
  const { status, canResetPassword } = usePage<Page<Props>>().props;
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    post(route('login'));
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

      <JetValidationErrors errors={errors} />

      <form onSubmit={submit}>
        <div>
          <AuthLabel title="Email" name="email"/>
          <AuthInput
            type="text"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            autoFocus
            onChange={e => setData('email', e.target.value)}
          />

        </div>

        <div className="mt-4">
          <AuthLabel title="Password" name="password" />

          <AuthInput
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="current-password"
            onChange={e => setData('password', e.target.value)}
          />
        </div>

        <div className="block mt-4">
          <label className="flex items-center">
            <JetCheckbox name="remember" checked={data.remember} onChange={e => setData('remember', e.target.checked)} />

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

          <JetButton className="ml-4" processing={processing}>
            Log in
          </JetButton>
        </div>
      </form>
    </GuestLayout>
  );
}
