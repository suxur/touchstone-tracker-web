import * as React from 'react';
import { useCallback, useRef, useState } from 'react';
import { evaluate } from 'mathjs';

interface Props {
  max?: number,
  value: string | number,
  editable?: boolean;
  shouldFocus?: boolean;
}

// <input ref="input" type="text" v-model="edit_value" @keydown.enter="done" @keydown.prevent.tab="tab" @blur="done" className="form-input px-0 w-12 text-center rounded-md">
export const InlineInput = ({ editable = true, shouldFocus = false, value, max }: Props) => {
  const [editValue, setEditValue] = useState(value);
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
      setEditValue(newValue.toString());
    }
  }, [editValue, max]);

  return (
    <div className="w-12 flex justify-center" onClick={edit}>
      {!editing ? (<>{ editValue }</>) : (
        <input
          ref={ref}
          type="text"
          className="form-input px-0 w-12 text-center rounded-md"
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={done}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              done();
            }
          }}
          value={editValue}
          autoFocus
        />
      )}
    </div>
  );
};
