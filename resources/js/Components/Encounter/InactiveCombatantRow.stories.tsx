import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { InactiveCombatantRowComponent } from './InactiveCombatantRow';

export default {
  title: 'InactiveCombatantRow',
  component: InactiveCombatantRowComponent,
} as ComponentMeta<typeof InactiveCombatantRowComponent>;

const Template: ComponentStory<typeof InactiveCombatantRowComponent> = (args) => <InactiveCombatantRowComponent {...args} />;

export const Default = Template.bind({});
Default.args = {
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
  destroyMutation: undefined,
};
