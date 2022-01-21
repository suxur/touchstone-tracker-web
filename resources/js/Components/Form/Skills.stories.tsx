import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Skills } from './Skills';
import { useState } from 'react';

export default {
  title: 'Skills',
  component: Skills,
} as ComponentMeta<typeof Skills>;

const Template: ComponentStory<typeof Skills> = (args) => {
  const [items, setItems] = useState(args.items)
  return <Skills {...args} items={items} setItems={items => setItems(items)}/>;
}

export const Default = Template.bind({});
Default.args = {
  title: 'Damage Vulnerabilities',
  items: [],
  values: [
    'Acid',
    'Fire',
    'Cold'
  ]
};

export const WithData = Template.bind({});
WithData.args = {
  title: 'Damage Vulnerabilities',
  items: [
    {
      key: Math.random().toString(16).slice(2),
      name: 'Fire',
      value: 2
    },
    {
      key: Math.random().toString(16).slice(2),
      name: 'Acid',
      value: 1
    },
  ],
  values: [
    'Acid',
    'Fire',
    'Cold'
  ]
};