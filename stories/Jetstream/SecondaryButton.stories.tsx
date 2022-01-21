import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { JetSecondaryButton } from '@/Components/Jetstream/SecondaryButton';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: JetSecondaryButton,
} as ComponentMeta<typeof JetSecondaryButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof JetSecondaryButton> = (args) => <JetSecondaryButton {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  children: 'Button',
};
