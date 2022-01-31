import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TimeSince } from './TimeSince';

export default {
  title: 'TimeSince',
  component: TimeSince,
} as ComponentMeta<typeof TimeSince>;

const Template: ComponentStory<typeof TimeSince> = (args) => <TimeSince {...args} />;

export const Default = Template.bind({});
Default.args = {
  date: '2021-12-15 03:53:42',
};
