import { useRef, useEffect } from 'react';

export const useIsMounting = () => {
  const isMountedRef = useRef(true);
  useEffect(() => {
    isMountedRef.current = false;
  }, []);
  return isMountedRef.current;
};