import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Bean } from './Bean';

export default {
  title: 'Bean',
  component: Bean,
} as ComponentMeta<typeof Bean>;

const Template: ComponentStory<typeof Bean> = (args) => <Bean {...args} />;

export const Default = Template.bind({});
Default.args = {
  active: false,
  filled: false,
};

export const Filled = Template.bind({});
Filled.args = {
  active: false,
  filled: true,
}

export const Active = Template.bind({});
Active.args = {
  active: true,
  filled: false,
}

export const FilledActive = Template.bind({});
FilledActive.args = {
  active: true,
  filled: true,
}
