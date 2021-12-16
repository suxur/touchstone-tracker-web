import * as React from 'react';
import { TabTypes } from './Codex';

interface Props {
  type: TabTypes;
  title: string;
}

export const CodexTab = ({ type, title }: Props) => (
  <>
    <span className="hidden xl:inline-block">{title}</span>
    <span className="inline-block xl:hidden">
        <i className={`icon-${type}s`} />
      </span>
  </>
);
