import * as React from 'react';
import {
  cloneElement,
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react';

import { noop } from '@/lib/helpers';
import { JetConfirmationModal } from '@/Components/Jetstream';

const callAll = (...fns: any[]) => (...args: any) => fns.forEach(fn => fn && fn(...args));

type ContextProps = [boolean, Dispatch<SetStateAction<boolean>>];

const ModalContext = createContext<ContextProps>([false, noop]);

const ConfirmModal = ({ children, isOpen }: { children: ReactElement[], isOpen?: boolean }) => {
  const [show, setShow] = useState(isOpen || false);

  useEffect(() => {
    setShow(isOpen || false);
  }, [isOpen]);

  return (
    <ModalContext.Provider value={[show, setShow]}>
      {children}
    </ModalContext.Provider>
  );
};

interface ConfirmModalButtonProps {
  children: ReactElement;
}

const ConfirmModalOpenButton = ({ children: child }: ConfirmModalButtonProps) => {
  const [, setShow] = useContext(ModalContext);
  return cloneElement(child, {
    onClick: callAll(() => setShow(true), child.props.onClick),
  });
};

const ConfirmModalDismissButton = ({ children: child }: ConfirmModalButtonProps) => {
  const [, setShow] = useContext(ModalContext);
  return cloneElement(child, {
    onClick: callAll(() => setShow(false), child.props.onClick),
  });
};

const ConfirmModalDismissAsyncButton = ({ children: child }: ConfirmModalButtonProps) => {
  const [, setIsOpen] = useContext(ModalContext);
  return cloneElement(child, {
    onClick: async () => {
      if (child.props.onClick) {
        await child.props.onClick();
        setIsOpen(false);
      }
    },
  });
};

interface ConfirmModalContentsProps {
  title: string;
  children: ReactElement;
  actions: ReactElement;
}

const ConfirmModalContents = ({ title, children, actions }: ConfirmModalContentsProps) => {
  const [isOpen, setIsOpen] = useContext(ModalContext);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <JetConfirmationModal isOpen={isOpen} onClose={onClose}>
      <JetConfirmationModal.Content title={title}>
        {children}
      </JetConfirmationModal.Content>
      <JetConfirmationModal.Footer>
        {actions}
      </JetConfirmationModal.Footer>
    </JetConfirmationModal>
  );
};

export {
  ConfirmModal,
  ConfirmModalOpenButton,
  ConfirmModalDismissButton,
  ConfirmModalDismissAsyncButton,
  ConfirmModalContents,
};
