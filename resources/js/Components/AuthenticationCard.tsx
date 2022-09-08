import * as React from 'react';
import { PropsWithChildren, ReactNode } from 'react';
import { LogoHorizontal } from '@/Components/LogoHorizontal';

export const AuthenticationCard = ({ children }: PropsWithChildren<ReactNode>) => (
  <div className="bg-purple-700 min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
    <div className="w-48 pb-4">
      <LogoHorizontal />
    </div>
    <div className="w-full sm:max-w-md mt-2 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
      {children}
    </div>
  </div>
);
