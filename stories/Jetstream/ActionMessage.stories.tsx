// JetActionMessage.stories.ts|tsx
import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { JetActionMessage } from '../../resources/js/Components/Jetstream/ActionMessage';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  component: JetActionMessage,
} as ComponentMeta<typeof JetActionMessage>;

const Template: ComponentStory<typeof JetActionMessage> = (args) => <JetActionMessage {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  on: true,
  children: 'This is an Action Message!'
};
