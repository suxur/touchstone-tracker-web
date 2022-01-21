import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { JetInputError } from '@/Components/Jetstream/InputError';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: JetInputError,
} as ComponentMeta<typeof JetInputError>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof JetInputError> = (args) => <JetInputError {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  message: 'Your password is incorrect!'
};
