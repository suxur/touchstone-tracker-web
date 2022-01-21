import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CombatantRow } from './CombatantRow';
import { Action, Combatant, EncounterStats } from '@/types';

export default {
  title: 'CombatantRow',
  component: CombatantRow,
  decorators: [
    (Story) => (
      <div className="border border-gray-200">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof CombatantRow>;

const Template: ComponentStory<typeof CombatantRow> = (args) => <CombatantRow {...args} />;

export const Default = Template.bind({});
Default.args = {
  combatant: {
    id: 1,
    stat_block: null,
    name: 'Alodray',
    type: 'character',
    armor_class: 15,
    current_hit_points: 12,
    hit_point_maximum: 12,
    temporary_hit_points: 0,
    initiative: 13,
    action: false,
    bonus_action: false,
    death_save_failure: 0,
    death_save_success: 0,
    order: 0,
    reaction: false,
    is_hidden: false,
  },
  encounter: {
    id: 1,
    combatants: [],
    user_id: null,
    slug: 'abc123',
    round: 1,
    monster_hp_status: -1,
    character_hp_status: -1,
    is_active: true,
    active_index: 0,
    started_at: '1985-12-25'
  }
};

export const Active = Template.bind({});
Active.args = {
  ...Default.args,
  active: true
};

export const DeathSaves = Template.bind({});
DeathSaves.args = {
  ...Default.args,
  combatant: {
    ...Default.args.combatant as Combatant,
    action: false,
    bonus_action: false,
    death_save_failure: 2,
    death_save_success: 1,
    current_hit_points: 0,
    hit_point_maximum: 12,
    temporary_hit_points: 0,
    initiative: 13,
    order: 0,
    reaction: false,
  }
  // combatant: {
  //   encounter_stats: {
  //     ...Default.args.combatant.encounter_stats,
  //     hit_points: 0,
  //     death_save_failure: 2,
  //     death_save_success: 1,
  //   }
  // }
};
