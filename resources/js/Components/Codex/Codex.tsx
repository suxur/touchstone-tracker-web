import * as React from 'react';
import { useContext } from 'react';
import clsx from 'clsx';
import { Tab } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useTypedPage from '@/Hooks/useTypedPage';
import { CodexTab } from '@/Components/Codex/CodexTab';
import { SidebarContext } from '@/Components/Sidebar/SidebarContext';
import { Card } from '@/Components/Card';
import { CharactersTab, EncountersTab, MonstersTab, SpellsTab } from '@/Components/Codex/Tabs';
import { MoveableStatBlock } from '@/Components/StatBlock/MoveableStatBlock';
import { useCodex } from '@/Components/Codex/CodexContext';
import { MoveableSpellBlock } from '@/Components/SpellBlock/MoveableSpellBlock';

export type TabTypes = 'monster' | 'character' | 'spell' | 'encounter';

export const Codex = () => {
  const { user } = useTypedPage().props;
  const { toggleOpen } = useContext(SidebarContext);
  const { state, dispatch } = useCodex();

  return (
    <>
      <Card>
        <Card.Header>
          <div className="flex h-10 justify-between items-center min-h-10">
            <p><strong>Codex</strong></p>
            <button
              type="button"
              className="button bg-transparent hover:bg-gray-200 text-gray-500 text-lg p-2 py-1"
              onClick={toggleOpen}
            >
              <FontAwesomeIcon icon="times" />
            </button>
          </div>
        </Card.Header>
        <Card.Body>
          <Tab.Group
            defaultIndex={localStorage.codex_tab ?? 0}
            onChange={index => { localStorage.codex_tab = index; }}
          >
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
              {!!user && (
                <Tab className={({ selected }) => clsx('tab', { 'tab-selected': selected })}>
                  <CodexTab type="encounter" title="Encounters" />
                </Tab>
              )}
            </Tab.List>
            <Tab.Panels className="relative rounded-b-md flex flex-grow overflow-hidden">
              <div className="absolute inset-0 divide-y divide-gray-200 flex flex-col">
                <Tab.Panel className="flex flex-grow flex-col min-h-0">
                  <MonstersTab />
                </Tab.Panel>
                <Tab.Panel className="flex flex-grow flex-col min-h-0">
                  <CharactersTab />
                </Tab.Panel>
                <Tab.Panel className="flex flex-grow flex-col min-h-0">
                  <SpellsTab />
                </Tab.Panel>
                {!!user && (
                  <Tab.Panel className="flex flex-grow flex-col min-h-0">
                    <EncountersTab />
                  </Tab.Panel>
                )}
              </div>
            </Tab.Panels>
          </Tab.Group>
        </Card.Body>
      </Card>
      {state.stat_blocks.map(sb => (
        <MoveableStatBlock
          key={sb.id}
          isOpen
          id={sb.id}
          close={() => dispatch({ type: 'close_stat_block', id: sb.id })}
        />
      ))}
      {state.spell_blocks.map(sb => (
        <MoveableSpellBlock
          key={sb.id}
          isOpen
          id={sb.id}
          close={() => dispatch({ type: 'close_spell_block', id: sb.id })}
        />
      ))}
    </>
  );
};
