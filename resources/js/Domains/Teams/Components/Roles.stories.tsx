import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Roles } from './Roles';

export default {
  title: 'Team/Roles',
  component: Roles,
} as ComponentMeta<typeof Roles>;

const Template: ComponentStory<typeof Roles> = (args) => <Roles {...args} />;

export const Default = Template.bind({});
Default.args = {
  roles: [
    {
      key: 'dm',
      name: 'Dungeon Master',
      description: 'Administrator users can perform any action.',
      permissions: [
        'create', 'read', 'update', 'delete'
      ]
    },
    {
      key: 'player',
      name: 'Player',
      description: 'Editor users have the ability to read, create, and update.',
      permissions: [
        'read', 'update'
      ]
    },
  ]
};

export const Selected = Template.bind({});
Selected.args = {
  ...Default.args,
  selected: 'dm',
};
