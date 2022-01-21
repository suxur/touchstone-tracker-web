import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { evaluate } from 'mathjs';

import { JetInput } from '@/Components/Jetstream';

interface Props extends React.HTMLProps<HTMLDivElement> {
  max?: number,
  value: string | number,
  editable?: boolean;
  shouldFocus?: boolean;
  shouldHighlight?: boolean;
  onDone?: (s: string) => void;
}

export const InlineInput = ({
  editable = true, shouldFocus = false, value, max, className, onDone, shouldHighlight = false
}: Props) => {
  const [editValue, setEditValue] = useState(value);
  useEffect(() => {
    setEditValue(value);
  }, [value]);
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const edit = useCallback(() => {
    if (editable) {
      setEditing(true);
    }
  }, [editable]);

  const done = useCallback(() => {
    setEditing(false);
    if (editValue !== '') {
      let newValue = Math.floor(evaluate(editValue.toString()));
      if (max && newValue > max && max !== 0) {
        newValue = max;
      }
      if (onDone) {
        onDone(newValue.toString());
      }
    }
  }, [editValue, max]);

  return (
    <div className={clsx('w-12 h-10 flex justify-center items-center cursor-pointer', className)} onClick={edit}>
      {!editing ? <>{editValue}</> : (
        <JetInput
          ref={ref}
          type="text"
          className="px-0 w-12 text-center rounded-md bg-white text-gray-900"
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={done}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              done();
            }
          }}
          value={editValue}
          autoFocus
          onFocus={(e) => {
            if (shouldHighlight) {
              e.target.select();
            }
          }}
        />
      )}
    </div>
  );
};
