import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { JetSectionTitle } from '../../resources/js/Components/Jetstream/SectionTitle';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: JetSectionTitle,
} as ComponentMeta<typeof JetSectionTitle>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof JetSectionTitle> = (args) => <JetSectionTitle {...args} />;


export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  title: 'Section Title',
  description: 'Section Description'
};
