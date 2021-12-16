import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { JetLabel } from '../../resources/js/Components/Jetstream/Label';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: JetLabel,
} as ComponentMeta<typeof JetLabel>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof JetLabel> = (args) => <JetLabel {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  value: 'Email Address'
};
