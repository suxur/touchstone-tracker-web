import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { JetCheckbox } from '@/Components/Jetstream/Checkbox';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: JetCheckbox,
} as ComponentMeta<typeof JetCheckbox>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof JetCheckbox> = (args) => <JetCheckbox {...args} />;

export const Checked = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Checked.args = {
  checked: true,
};

export const Unchecked = Template.bind({});
Unchecked.args = {
  checked: false,
};
