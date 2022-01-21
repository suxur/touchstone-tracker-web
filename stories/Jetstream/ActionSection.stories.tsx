// JetActionSection.stories.ts|tsx
import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { JetActionSection } from '@/Components/Jetstream/ActionSection';


export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  component: JetActionSection,
} as ComponentMeta<typeof JetActionSection>;

const Template: ComponentStory<typeof JetActionSection> = (args) => <JetActionSection {...args}/>;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Action Section Title',
  description: 'Action Section Description',
  children: 'This is an Action Message!'
}
