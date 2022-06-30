import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DeathSaves } from './DeathSaves';
import { handlers } from '../../mocks/handlers';

export default {
  title: 'DeathSaves',
  component: DeathSaves,
} as ComponentMeta<typeof DeathSaves>;

const Template: ComponentStory<typeof DeathSaves> = (args) => <DeathSaves {...args} />;

export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers,
  }
};

Default.args = {
  active: true,
  combatant: {
    id: 1,
    encounter_id: 1,
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
    status: null,
    death_save_failure: 0,
    death_save_success: 0,
    order: 0,
    reaction: false,
    is_hidden: false,
    conditions: [],
  },
};
