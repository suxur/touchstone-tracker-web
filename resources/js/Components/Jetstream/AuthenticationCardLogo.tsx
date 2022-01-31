import * as React from 'react';
import { Link } from '@inertiajs/inertia-react';
import { JetApplicationLogo } from '@/Components/Jetstream/ApplicationLogo';

export const JetAuthenticationCardLogo = () => (
    <Link href="/">
        <JetApplicationLogo />
    </Link>
);
