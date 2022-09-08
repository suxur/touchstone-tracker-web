// ActionMessage.stories.ts|tsx
import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ActionMessage } from '@/Components/ActionMessage';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  component: ActionMessage,
} as ComponentMeta<typeof ActionMessage>;

const Template: ComponentStory<typeof ActionMessage> = (args) => <ActionMessage {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  on: true,
  children: 'This is an Action Message!'
};
