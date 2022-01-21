import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { JetDropdownLink } from '@/Components/Jetstream/DropdownLink';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: JetDropdownLink,
} as ComponentMeta<typeof JetDropdownLink>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof JetDropdownLink> = (args) => <JetDropdownLink {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  children: 'Dropdown Link',
};
