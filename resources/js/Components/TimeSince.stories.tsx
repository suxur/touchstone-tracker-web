import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TimeSince } from './TimeSince';

export default {
  title: 'TimeSince',
  component: TimeSince,
} as ComponentMeta<typeof TimeSince>;

const Template: ComponentStory<typeof TimeSince> = (args) => <TimeSince {...args} />;

const getDateString = () => {
  const date = new Date();

  return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} 12:00:00`
}

console.log(getDateString());
export const Default = Template.bind({});
Default.args = {
  date: getDateString(),
};
