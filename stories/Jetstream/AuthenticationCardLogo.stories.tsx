// JetActionSection.stories.ts|tsx
import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { JetAuthenticationCardLogo } from '@/Components/Jetstream/AuthenticationCardLogo';


export default {
  component: JetAuthenticationCardLogo,
} as ComponentMeta<typeof JetAuthenticationCardLogo>;

export const Primary: ComponentStory<typeof JetAuthenticationCardLogo> = () => <JetAuthenticationCardLogo />;

