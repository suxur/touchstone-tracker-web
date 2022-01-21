import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { JetModal } from '@/Components/Jetstream/Modal';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: JetModal,
} as ComponentMeta<typeof JetModal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof JetModal> = (args) => <JetModal {...args} />;

export const Small = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Small.args = {
  isOpen: true,
  maxWidth: 'sm',
  onClose: () => {},
  children: 'Here is a small modal'
};

export const Medium = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Medium.args = {
  isOpen: true,
  maxWidth: 'md',
  onClose: () => {},
  children: 'Here is a medium modal'
};

export const Large = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Large.args = {
  isOpen: true,
  maxWidth: 'lg',
  onClose: () => {},
  children: 'Here is a large modal'
};

export const ExtraLarge = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ExtraLarge.args = {
  isOpen: true,
  maxWidth: 'xl',
  onClose: () => {},
  children: 'Here is a extra large modal'
};

export const Max = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Max.args = {
  isOpen: true,
  maxWidth: 'sxl',
  onClose: () => {},
  children: 'Here is a max size modal'
};
