import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { JetInput } from '@/Components/Jetstream/Input';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: JetInput,
} as ComponentMeta<typeof JetInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof JetInput> = (args) => <JetInput {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};
