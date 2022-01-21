import * as React from 'react';
import { Fragment } from 'react';
import { JetLabel } from '@/Components/Jetstream';
import { Listbox, Transition } from '@headlessui/react';
import { startCase } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

type Props = {
  value: string;
  label?: string;
  onChange: (value: string) => void;
  data: string[];
  required?: boolean;
  placeholder?: string;
};

export const Dropdown = ({ value, label, onChange, data, placeholder, required = false }: Props) => (
  <Listbox value={value} onChange={e => onChange(e)}>
    {label && (
      <JetLabel htmlFor="class" value={label} required={required} className="mb-1" />
    )}
    <div className="relative flex flex-grow">
      <Listbox.Button className="h-10 w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 sm:text-sm">
        <span className="block text-base truncate">{value ? startCase(value) : placeholder || `Select a ${label}`}</span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <FontAwesomeIcon icon="sort" className="w-5 h-5 text-gray-400" aria-hidden="true" />
          </span>
      </Listbox.Button>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options className="absolute top-10 z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {data.map(datum => (
            <Listbox.Option
              key={datum}
              className={({ active }) => clsx(active ? 'text-purple-900 bg-purple-100' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-10 pr-4')}
              value={datum}
            >
              {({ selected, active }) => (
                <>
                    <span className={clsx(selected ? 'font-medium' : 'font-normal', 'block truncate')}>
                      {startCase(datum)}
                    </span>
                  {selected ? (
                    <span className={clsx(active ? 'text-purple-600' : 'text-purple-600', 'absolute inset-y-0 left-0 flex items-center pl-3')}>
                      <FontAwesomeIcon icon="check" className="w-5 h-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </div>
  </Listbox>
);