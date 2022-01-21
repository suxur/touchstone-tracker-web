import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Counter } from './Counter';

export default {
  title: 'Counter',
  component: Counter,
} as ComponentMeta<typeof Counter>;

const Template: ComponentStory<typeof Counter> = (args) => <Counter {...args} />;

export const Default = Template.bind({});
Default.args = {
  active: false,
};

export const Active = Template.bind({});
Active.args = {
  active: true,
};
