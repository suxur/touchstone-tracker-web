import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { JetFormSection } from '../../resources/js/Components/Jetstream/FormSection';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: JetFormSection,
} as ComponentMeta<typeof JetFormSection>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof JetFormSection> = (args) => <JetFormSection {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  title: 'Form Section',
  description: 'Form Section Description'
};
