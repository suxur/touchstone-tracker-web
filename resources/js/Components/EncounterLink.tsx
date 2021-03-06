import * as React from 'react';
import { useState } from 'react';
import copy from 'clipboard-copy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useRoute from '@/Hooks/useRoute';

interface Props {
  slug: string;
}

export const EncounterLink = ({ slug }: Props) => {
  const route = useRoute();
  const [copied, setCopied] = useState(false);
  const copyLink = () => {
    setCopied(true);
    copy(route('player.show', { slug }));
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <button className="ml-1 font-bold text-purple-600 focus:outline-none relative" onClick={copyLink}>
      {slug}
      <FontAwesomeIcon className="ml-1" icon="copy" />
      {copied && (
        <span className="animate-ping text-xs absolute -top-5 left-0 right-0 mx-auto">Copied!</span>
      )}
    </button>
  );
};
