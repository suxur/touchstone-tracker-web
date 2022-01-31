import React, { FormEvent, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { GuestLayout } from '@/Layouts/GuestLayout';
import { JetButton } from '@/Components/Jetstream';
import { AuthLabel } from '@/Components/Auth/Label';
import { AuthInput } from '@/Components/Auth/Input';
import useRoute from '@/Hooks/useRoute';

export default function Register() {
  const route = useRoute();
  const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => () => {
    form.reset('password', 'password_confirmation');
  }, [form]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    form.post(route('register'));
  };

  return (
    <GuestLayout>
      <Head title="Register" />

      <form onSubmit={onSubmit}>
        <div>
          <AuthLabel title="Name" name="name" error={form.errors.name} />
          <AuthInput
            type="text"
            name="name"
            value={form.data.name}
            className="mt-1 block w-full"
            autoComplete="name"
            autoFocus
            onChange={e => form.setData('name', e.target.value)}
            required
            hasError={!!form.errors.name}
          />
        </div>

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
          <Link href={route('login')} className="underline text-sm text-gray-600 hover:text-gray-900">
            Already registered?
          </Link>
          <JetButton className="ml-4" processing={form.processing}>
            Register
          </JetButton>
        </div>
      </form>
    </GuestLayout>
  );
}
