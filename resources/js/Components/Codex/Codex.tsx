import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import { useContext } from 'react';
import { CodexTab } from './CodexTab';
import { SidebarContext } from '../Sidebar/SidebarContext';
import { Card } from '../Card';
import { Characters, Monsters, Spells } from './Tabs';

export type TabTypes = 'monster' | 'character' | 'spell' | 'encounter';

export const Codex = () => {
  const { toggleOpen } = useContext(SidebarContext);

  return (
    <Card>
      <Card.Header>
        <div className="flex h-10 justify-between items-center min-h-10">
          <p><strong>Codex</strong></p>
          <button
            className="button bg-transparent hover:bg-gray-200 text-gray-500 text-lg p-2 py-1"
            onClick={toggleOpen}
          >
            <FontAwesomeIcon icon="times" />
          </button>
        </div>
      </Card.Header>
      <Card.Body>
        <Tab.Group>
          <Tab.List className="bg-gray-600 flex rounded-t-md h-10">
            <Tab className={({ selected }) => clsx('tab', { 'tab-selected': selected })}>
              <CodexTab type="monster" title="Monsters" />
            </Tab>
            <Tab className={({ selected }) => clsx('tab', { 'tab-selected': selected })}>
              <CodexTab type="character" title="Characters" />
            </Tab>
            <Tab className={({ selected }) => clsx('tab', { 'tab-selected': selected })}>
              <CodexTab type="spell" title="Spells" />
            </Tab>
            {/*{!!user && (*/}
            {/*  <Tab className={({ selected }) => clsx('tab', { 'tab--selected': selected })}>*/}
            {/*    <CodexTab type="encounter" title="Encounters" />*/}
            {/*  </Tab>*/}
            {/*)}*/}
          </Tab.List>
          <Tab.Panels className="relative rounded-b-md flex flex-grow overflow-hidden">
            <div className="absolute inset-0 divide-y divide-gray-200 flex flex-col">
              <Tab.Panel className="flex flex-grow flex-col min-h-0">
                <Monsters />
              </Tab.Panel>
              <Tab.Panel className="flex flex-grow flex-col min-h-0">
                <Characters />
              </Tab.Panel>
              <Tab.Panel className="flex flex-grow flex-col min-h-0">
                <Spells />
              </Tab.Panel>
            </div>
          </Tab.Panels>
        </Tab.Group>
      </Card.Body>
    </Card>
  );
};
