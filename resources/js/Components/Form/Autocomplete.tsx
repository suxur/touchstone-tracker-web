import * as React from 'react';
import { ChangeEvent, KeyboardEvent, Fragment, useCallback, useRef, useState } from 'react';
import clsx from 'clsx';
import { Transition } from '@headlessui/react';
import { JetInput, JetLabel } from '@/Components/Jetstream';
import { useOnClickOutside } from '@/Hooks/useOnClickOutside';
import { Keys } from '@/lib/keyboard';

interface Props {
  label: string;
  items: string[];
  required?: boolean;
}

export const Autocomplete = ({ label, required, items }: Props) => {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState('');
  const [results, setResults] = useState(items);
  const [arrowCounter, setArrowCounter] = useState(-1);

  useOnClickOutside(ref, () => {
    setOpen(false);
    setArrowCounter(-1);
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setResult(e.target.value);
    filter(e.target.value);
    // filter results
    setOpen(results.length > 0);
  };

  const onFocus = () => {
    if (result === '') {
      // filter results
      setOpen(true);
    }
  };

  const setItem = (item: string) => {
    setResult(item);
    setOpen(false);
  };

  const filter = (value: string) => {
    setResults(items.filter((item) => item.toLowerCase().indexOf(value.toLowerCase()) > -1));
  };

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLElement>) => {
    switch (event.key) {
      // Ref: https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction-13

      case Keys.Space:
      case Keys.Enter:
        event.preventDefault();
        event.stopPropagation();
        setResult(results[arrowCounter]);
        setOpen(false);
        setArrowCounter(-1);
        break;
      case Keys.ArrowDown:
        event.preventDefault();
        event.stopPropagation();
        setOpen(true);
        if (arrowCounter < items.length - 1) {
          setArrowCounter(arrowCounter + 1);
        }
        break;
      case Keys.ArrowUp:
        event.preventDefault();
        event.stopPropagation();
        if (arrowCounter > 0) {
          setArrowCounter(arrowCounter - 1);
        }
        break;
      default:
        break;
    }
  }, [arrowCounter, items]);

  return (
    <div className="relative w-full" ref={ref} onKeyDown={handleKeyDown}>
      <JetLabel htmlFor={label.toLowerCase()} value={label} required={required} className="mb-1" />
      <JetInput
        id={label.toLowerCase()}
        type="text"
        required={required}
        value={result}
        onChange={(e) => onChange(e)}
        onFocus={onFocus}
      />
      <Transition
        show={open}
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <ul
          className={clsx('absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm', { 'mt-2': open })}
        >
          {results.map((item, i) => (
            <li
              key="i"
              className={clsx('', { 'rounded-md bg-purple-200': i === arrowCounter })}
            >
              <button
                type="button"
                onClick={() => setItem(item)}
                className="w-full px-4 py-2 text-left hover:bg-purple-100 hover:text-purple-900"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </Transition>
    </div>
  );
};
