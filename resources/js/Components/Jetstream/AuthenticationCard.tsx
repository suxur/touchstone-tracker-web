import * as React from 'react';
import { PropsWithChildren, ReactNode } from 'react';
import { LogoHorizontal } from '../LogoHorizontal';

export const JetAuthenticationCard = ({ children }: PropsWithChildren<ReactNode>) => (
  <div className="guest-background min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
    <div className="w-48">
      <LogoHorizontal />
    </div>
    <div className="w-full sm:max-w-md mt-2 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
      {children}
    </div>
  </div>
);
