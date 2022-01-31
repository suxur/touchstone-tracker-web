import React, { FormEvent } from 'react';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

import useRoute from '@/Hooks/useRoute';
import { GuestLayout } from '@/Layouts/GuestLayout';
import { InputError } from '@/Components/InputError';
import { JetButton } from '@/Components/Jetstream';

export default function Welcome() {
  const route = useRoute();
  const form = useForm({
    lookup: '',
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    form.post(route('encounter.lookup'));
  };

  const activeEncounter = false;

  return (
    <GuestLayout>
      <Head title="Welcome" />
      <div className="mb-4 text-center px-8">
        <p>
          Keep track of player and monsters initiatives for each encounter for
          Dungeons &amp; Dragons 5E
        </p>
      </div>
      {activeEncounter ? (
        <Link href="/">
          Active Encounter
        </Link>
      ) : (
        <Link href={route('encounter')} className="button button-primary w-full h-10 mb-4">
          Start Encounter
        </Link>
      )}
      <form onSubmit={submit}>
        <div className="flex h-10">
          <input
            type="text"
            placeholder="Encounter ID or URL"
            name="lookup"
            className="border-gray-300 focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 shadow-sm flex-grow rounded-l-md border-r-0"
            onChange={e => form.setData('lookup', e.target.value)}
            required
          />
          <JetButton
            type="submit"
            className="rounded-l-none"
            processing={form.processing}
          >
            Join
          </JetButton>
        </div>
        {form.hasErrors && form.errors.lookup && (
          <InputError className="mt-2">
            {form.errors.lookup}
          </InputError>
        )}
      </form>
    </GuestLayout>
  );
}
