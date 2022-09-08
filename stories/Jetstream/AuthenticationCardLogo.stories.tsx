// ActionSection.stories.ts|tsx
import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AuthenticationCardLogo } from '@/Components/AuthenticationCardLogo';


export default {
  component: AuthenticationCardLogo,
} as ComponentMeta<typeof AuthenticationCardLogo>;

export const Primary: ComponentStory<typeof AuthenticationCardLogo> = () => <AuthenticationCardLogo />;

