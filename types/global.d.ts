import * as React from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
  interface Window {
    Echo: Echo,
    Pusher: Pusher
  }
}

declare module '@inertiajs/inertia-react' {
  interface InertiaHeadProps {
    title?: string;
  }

  type InertiaHead = React.FunctionComponent<InertiaHeadProps>

  export const Head: InertiaHead;
}

declare module 'ziggy-js' {
  export interface Route {
    uri: string;
    methods: Array<'GET' | 'HEAD' | 'POST' | 'PATCH' | 'PUT' | 'OPTIONS' | 'DELETE'>;
    domain?: null | string | undefined;
    bindings?: Record<string, unknown>
  }
}
