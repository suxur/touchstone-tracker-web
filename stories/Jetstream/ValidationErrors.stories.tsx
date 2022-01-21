import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { JetValidationErrors } from '@/Components/Jetstream/ValidationErrors';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: JetValidationErrors,
} as ComponentMeta<typeof JetValidationErrors>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof JetValidationErrors> = (args) => <JetValidationErrors {...args} />;


export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  errors: {
    email: 'Your email is invalid',
    password: 'Your password is incorrect',
  }
};
