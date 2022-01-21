import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DeathSaves } from './DeathSaves';

export default {
  title: 'DeathSaves',
  component: DeathSaves,
} as ComponentMeta<typeof DeathSaves>;

const Template: ComponentStory<typeof DeathSaves> = (args) => <DeathSaves {...args} />;

export const Default = Template.bind({});
Default.args = {};
