// ActionMessage.stories.ts|tsx
import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AuthenticationCard } from '@/Components/AuthenticationCard';

export default {
  component: AuthenticationCard,
} as ComponentMeta<typeof AuthenticationCard>;

const Template: ComponentStory<typeof AuthenticationCard> = (args) => (
  <AuthenticationCard>
    {args.children}
  </AuthenticationCard>
);
export const Primary = Template.bind({});

Primary.args = {
  children: 'This is an Authentication Card!'
}
