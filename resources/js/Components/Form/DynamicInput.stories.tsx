import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DynamicInput } from './DynamicInput';
import { useState } from 'react';

export default {
  title: 'DynamicInput',
  component: DynamicInput,
} as ComponentMeta<typeof DynamicInput>;

const Template: ComponentStory<typeof DynamicInput> = (args) => {
  const [items, setItems] = useState(args.items)
  return <DynamicInput {...args} items={items} setItems={items => setItems(items)}/>;
};

export const Default = Template.bind({});
Default.args = {
  title: 'Damage Vulnerabilities',
  items: []
};

export const WithData = Template.bind({});
WithData.args = {
  title: 'Damage Vulnerabilities',
  items: [
    {
      key: Math.random().toString(16).slice(2),
      value: 'Fire',
    },
    {
      key: Math.random().toString(16).slice(2),
      value: 'Acid',
    },
  ]
};