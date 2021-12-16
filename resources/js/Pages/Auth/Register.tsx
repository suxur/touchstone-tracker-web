import React, { ChangeEvent, FormEvent, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { GuestLayout } from '@/Layouts/GuestLayout';
import { JetButton, JetValidationErrors } from '@/Components/Jetstream';
import route from '@/lib/route';
import { AuthLabel } from '@/Components/Auth/Label';
import { AuthInput } from '@/Components/Auth/Input';

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as 'name' | 'email' | 'password' | 'password_confirmation';
    setData(name, event.target.value);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();

    post(route('register'));
  };

  return (
    <GuestLayout>
      <Head title="Register" />

      <JetValidationErrors errors={errors} />

      <form onSubmit={submit}>
        <div>
          <AuthLabel title="Name" name="name" />
          <AuthInput
            type="text"
            name="name"
            value={data.name}
            className="mt-1 block w-full"
            autoComplete="name"
            autoFocus
            onChange={e => setData('name', e.target.value)}
            required
          />
        </div>

        <div className="mt-4">
          <AuthLabel title="Email" name="email" />

          <AuthInput
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            onChange={onHandleChange}
            required
          />
        </div>

        <div className="mt-4">
          <AuthLabel title="Password" name="password" />
          <AuthInput
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="new-password"
            onChange={onHandleChange}
            required
          />
        </div>

        <div className="mt-4">
          <AuthLabel title="Confirm Password" name="password_confirmation" />
          <AuthInput
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className="mt-1 block w-full"
            onChange={onHandleChange}
            required
          />
        </div>

        <div className="flex items-center justify-end mt-4">
          <Link href={route('login')} className="underline text-sm text-gray-600 hover:text-gray-900">
            Already registered?
          </Link>

          <JetButton className="ml-4" processing={processing}>
            Register
          </JetButton>
        </div>
      </form>
    </GuestLayout>
  );
}
