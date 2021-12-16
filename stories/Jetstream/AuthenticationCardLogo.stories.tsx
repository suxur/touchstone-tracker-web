// JetActionSection.stories.ts|tsx
import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { JetAuthenticationCardLogo } from '../../resources/js/Components/Jetstream/AuthenticationCardLogo';


export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  component: JetAuthenticationCardLogo,
} as ComponentMeta<typeof JetAuthenticationCardLogo>;

export const Primary: ComponentStory<typeof JetAuthenticationCardLogo> = () => <JetAuthenticationCardLogo />;

