import * as React from 'react';
import { PropsWithChildren } from 'react';
import { JetModal, ModalProps } from './Modal';

const JetDialogModalContent = ({ title, children }: PropsWithChildren<{ title: string }>) => (
  <div className="px-6 py-4">
    <div className="text-lg">{title}</div>
    <div className="mt-4">{children}</div>
  </div>
);

const JetDialogModalFooter = ({ children }: PropsWithChildren<Record<string, unknown>>) => (
  <div className="px-6 py-4 bg-gray-100 text-right">{children}</div>
);

export const JetDialogModal = ({ children, ...modalProps }: PropsWithChildren<ModalProps>) => (
  <JetModal {...modalProps}>{children}</JetModal>
);

JetDialogModal.Content = JetDialogModalContent;
JetDialogModal.Footer = JetDialogModalFooter;
