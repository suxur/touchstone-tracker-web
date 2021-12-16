// JetActionMessage.stories.ts|tsx
import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { JetAuthenticationCard } from '../../resources/js/Components/Jetstream/AuthenticationCard';


export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  component: JetAuthenticationCard,
} as ComponentMeta<typeof JetAuthenticationCard>;

const Template: ComponentStory<typeof JetAuthenticationCard> = (args) => <JetAuthenticationCard {...args}/>;

export const Primary = Template.bind({});
Primary.args = {
  children: 'This is an Authentication Card!'
}
