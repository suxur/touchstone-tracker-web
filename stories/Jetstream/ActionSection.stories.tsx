// ActionSection.stories.ts|tsx
import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ActionSection } from '@/Components/ActionSection';


export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  component: ActionSection,
} as ComponentMeta<typeof ActionSection>;

const Template: ComponentStory<typeof ActionSection> = (args) => <ActionSection {...args}/>;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Action Section Title',
  description: 'Action Section Description',
  children: 'This is an Action Message!'
}
