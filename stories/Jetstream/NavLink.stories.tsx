import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { JetNavLink } from '@/Components/Jetstream/NavLink';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: JetNavLink,
} as ComponentMeta<typeof JetNavLink>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof JetNavLink> = (args) => <JetNavLink {...args} />;

export const Active = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Active.args = {
  href: '/',
  active: true,
  children: 'Nav Link',
};

export const Inactive = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Inactive.args = {
  href: '/',
  active: false,
  children: 'Nav Link',
};
