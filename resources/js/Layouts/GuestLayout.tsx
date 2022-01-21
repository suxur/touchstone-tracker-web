import * as React from 'react';
import { FC } from 'react';
import { Link } from '@inertiajs/inertia-react';

import useRoute from '@/Hooks/useRoute';
import { LogoHorizontal } from '@/Components/LogoHorizontal';

export const GuestLayout: FC = ({ children }) => {
  const route = useRoute();

  return (
    <div className="relative flex flex-grow h-full">
      <div className="absolute top-0 flex items-center justify-end w-full px-2 py-6 sm:px-6">
        <div className="flex items-center ml-6">
          <Link href={route('login')} className="underline text-sm text-purple-50 hover:text-purple-100">
            Login
          </Link>
          <Link href={route('register')} className="button bg-purple-200 text-purple-900 hover:bg-purple-300 ml-4">
            Sign Up
          </Link>
        </div>
      </div>
      <main className="flex h-full flex-grow flex-col">
        <div className="bg-purple-700 w-full flex justify-center h-96 items-end">
          <Link href={route('welcome')} className="w-48 pt-4 pb-20">
            <LogoHorizontal />
          </Link>
        </div>
        <div className="relative bg-gray-100 w-full flex rounded-t-lg pt-24 items-center flex-col flex-grow">
          <div
            className="absolute top-0 rounded-full h-28 w-28 border-4 border-purple-700 -mt-14 bg-gray-100 justify-center items-center flex"
          >
            <i className="icon-encounters text-7xl text-purple-700" />
          </div>
          <div className="w-96 mb-12">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
