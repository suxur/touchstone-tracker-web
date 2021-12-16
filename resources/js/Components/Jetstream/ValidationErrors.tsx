import * as React from 'react';
import { ResponseErrors } from '@/types';

export const JetValidationErrors = ({ errors, className }: { errors: ResponseErrors, className?: string; }) => {
  const hasErrors = Object.keys(errors).length > 0;

  if (!hasErrors) {
    return null;
  }

  return (
    <div className={className}>
      <div className="font-medium text-red-600">
        Whoops! Something went wrong.
      </div>
      <ul className="mt-3 list-disc list-inside text-sm text-red-600">
        {Object.keys(errors).map(key => (
          <li key={key}>{errors[key]}</li>
        ))}
      </ul>
    </div>
  );
};
