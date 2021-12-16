import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { JetResponsiveNavLink } from '../../resources/js/Components/Jetstream/ResponsiveNavLink';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: JetResponsiveNavLink,
} as ComponentMeta<typeof JetResponsiveNavLink>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof JetResponsiveNavLink> = (args) => <JetResponsiveNavLink {...args} />;

export const LinkActive = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
LinkActive.args = {
  href: '/',
  active: true,
  children: 'Responsive Nav Link',
};

export const LinkInactive = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
LinkInactive.args = {
  href: '/',
  active: false,
  children: 'Responsive Nav Link',
};

export const ButtonActive = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ButtonActive.args = {
  as: 'button',
  href: '/',
  active: true,
  children: 'Button Responsive Nav Link',
};

export const ButtonInactive = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ButtonInactive.args = {
  as: 'button',
  href: '/',
  active: false,
  children: 'Button Responsive Nav Link',
};
