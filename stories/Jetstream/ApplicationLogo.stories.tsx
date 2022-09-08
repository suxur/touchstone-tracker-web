// ActionSection.stories.ts|tsx
import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ApplicationLogo } from '@/Components/ApplicationLogo';


export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  component: ApplicationLogo,
} as ComponentMeta<typeof ApplicationLogo>;

export const Primary: ComponentStory<typeof ApplicationLogo> = () => <ApplicationLogo />;

