import { Ref, useEffect } from 'react';

export const useOnClickOutside = (ref: Ref<HTMLElement>, handler: (event: UIEvent) => void) => {
  useEffect(
    () => {
      const listener = (event: UIEvent) => {
        // Do nothing if clicking ref's element or descendent elements
        // if (!ref || ref.contains(event.target as Node)) {
        //   return;
        // }

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler],
  );
};
