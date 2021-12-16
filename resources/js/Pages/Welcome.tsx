import React, { FormEvent } from 'react';
import { Link, Head, useForm } from '@inertiajs/inertia-react';
import { PageProps } from "@inertiajs/inertia";
import clsx from 'clsx';

import { GuestLayout } from '../Layouts/GuestLayout';
import route from '../lib/route';
import { InputError } from '../Components/InputError';
import { User } from '@/types';

interface Props extends PageProps {
    auth: {
        user: User
    };
}

export default function Welcome(props: Props) {
    const { post, processing, errors, hasErrors, setData } = useForm({
        'lookup': ''
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(route('encounter.lookup'));
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
                <Link href="/e" className="button button-primary w-full h-10 mb-4">
                    Start Encounter
                </Link>
            )}
            <form onSubmit={submit}>
                <div className="flex h-10">
                    <input
                        type="text"
                        placeholder="Encounter ID or URL"
                        name="lookup"
                        className="form-input flex-grow rounded-l-md border-r-0"
                        onChange={e => setData('lookup', e.target.value)}
                    />
                    <button
                        type="submit"
                        className={clsx('button rounded-l-none', { 'loading': processing })}
                        disabled={processing}
                    >
                        Join
                    </button>
                </div>
                {hasErrors && errors.lookup && (
                    <InputError className="mt-2">
                        {errors.lookup}
                    </InputError>
                )}
            </form>
        </GuestLayout>
    );
}
