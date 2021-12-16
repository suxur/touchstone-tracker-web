import * as React from 'react';

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
    bindings?: {}
  }
}
