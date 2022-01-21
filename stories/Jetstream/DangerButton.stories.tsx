import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { JetDangerButton } from '@/Components/Jetstream/DangerButton';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: JetDangerButton,
} as ComponentMeta<typeof JetDangerButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof JetDangerButton> = (args) => <JetDangerButton {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  children: 'Button',
};
