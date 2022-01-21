// JetActionSection.stories.ts|tsx
import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { JetApplicationLogo } from '@/Components/Jetstream/ApplicationLogo';


export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  component: JetApplicationLogo,
} as ComponentMeta<typeof JetApplicationLogo>;

export const Primary: ComponentStory<typeof JetApplicationLogo> = () => <JetApplicationLogo />;

