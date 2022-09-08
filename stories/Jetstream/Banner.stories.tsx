// Banner.stories.ts|tsx
import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Banner } from '@/Components/Banner';


export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  component: Banner,
} as ComponentMeta<typeof Banner>;

const Template: ComponentStory<typeof Banner> = (args) => <Banner {...args}/>;

export const Success = Template.bind({});
Success.args = {
  message: 'This is a banner message!',
  style: 'success',
}

export const Danger = Template.bind({});
Danger.args = {
  message: 'This is a banner message!',
  style: 'danger',
}
