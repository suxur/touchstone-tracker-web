import * as React from 'react';
import { FormEvent, useRef, useState } from 'react';
import { Head, useForm } from '@inertiajs/inertia-react';

import useRoute from '@/Hooks/useRoute';
import { AuthenticationCard } from '@/Components/AuthenticationCard';
import { Button } from '@/Components/Button';
import { AuthLabel } from '@/Components/Auth/Label';
import { AuthInput } from '@/Components/Auth/Input';

export default function TwoFactorChallenge() {
  const route = useRoute();
  const [recovery, setRecovery] = useState(false);
  const form = useForm({
    code: '',
    recovery_code: '',
  });

  const recoveryCodeRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);

  const toggleRecovery = (e: FormEvent) => {
    e.preventDefault();
    setRecovery(!recovery);

    setTimeout(() => {
      if (recovery) {
        recoveryCodeRef.current?.focus();
        form.setData('code', '');
      } else {
        codeRef.current?.focus();
        form.setData('recovery_code', '');
      }
    }, 100);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    form.post(route('two-factor.login'));
  };

  return (
    <AuthenticationCard>
      <Head title="Two-Factor Confirmation" />

      <div className="mb-4 text-sm text-gray-600">
        {recovery
          ? 'Please confirm access to your account by entering one of your emergency recovery codes.'
          : 'Please confirm access to your account by entering the authentication code provided by your authenticator application.'}
      </div>

      <form onSubmit={onSubmit}>
        {recovery ? (
          <div>
            <AuthLabel title="Recovery Code" name="recovery_code" />
            <AuthInput
              ref={recoveryCodeRef}
              id="recovery_code"
              type="text"
              className="mt-1 block w-full"
              value={form.data.recovery_code}
              onChange={e => form.setData('recovery_code', e.target.value)}
              autoComplete="one-time-code"
            />
          </div>
        ) : (
          <div>
            <AuthLabel title="Code" name="code" />
            <AuthInput
              ref={codeRef}
              id="code"
              type="text"
              inputMode="numeric"
              className="mt-1 block w-full"
              value={form.data.code}
              onChange={e => form.setData('code', e.currentTarget.value)}
              autoFocus
              autoComplete="one-time-code"
            />
          </div>
        )}

        <div className="flex items-center justify-end mt-4">
          <button
            type="button"
            className="text-sm text-gray-600 hover:text-gray-900 underline cursor-pointer"
            onClick={toggleRecovery}
          >
            {recovery ? 'Use an authentication code' : 'Use a recovery code'}
          </button>

          <Button className="ml-4" processing={form.processing}>
            Login
          </Button>
        </div>
      </form>
    </AuthenticationCard>
  );
}
