import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from '@/Components/Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: Button,
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  processing: false,
  children: 'Button',
};

export const Loading = Template.bind({});
Loading.args = {
  processing: true,
  children: 'Button',
};
