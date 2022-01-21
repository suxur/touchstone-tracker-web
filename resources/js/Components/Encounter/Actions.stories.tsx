import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Actions } from './Actions';

export default {
  title: 'Actions',
  component: Actions,
} as ComponentMeta<typeof Actions>;

const Template: ComponentStory<typeof Actions> = (args) => <Actions {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Active = Template.bind({});
Active.args = {
  active: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
