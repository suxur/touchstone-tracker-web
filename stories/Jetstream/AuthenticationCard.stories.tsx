// JetActionMessage.stories.ts|tsx
import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { JetAuthenticationCard } from '@/Components/Jetstream/AuthenticationCard';

export default {
  component: JetAuthenticationCard,
} as ComponentMeta<typeof JetAuthenticationCard>;

const Template: ComponentStory<typeof JetAuthenticationCard> = (args) => (
  <JetAuthenticationCard>
    {args.children}
  </JetAuthenticationCard>
);
export const Primary = Template.bind({});

Primary.args = {
  children: 'This is an Authentication Card!'
}
