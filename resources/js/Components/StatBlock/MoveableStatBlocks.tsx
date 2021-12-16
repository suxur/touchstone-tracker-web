import * as React from 'react';
import { createPortal } from 'react-dom';
import { FC, useEffect, useState } from 'react';

export const MoveableStatBlocks: FC = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [root, setRoot] = useState<Element | null>(null)

  useEffect(() => {
    setRoot(document.querySelector('#__next'));
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted && root ? createPortal(children, root) : null;
};
