import * as React from 'react';
import { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Skills } from '@/Components/Form/Skills';

export default {
  title: 'Skills',
  component: Skills,
} as ComponentMeta<typeof Skills>;

const Template: ComponentStory<typeof Skills> = ({ items, ...args }) => {
  const [data, setData] = useState(items);
  return <Skills {...args} items={data} setItems={i => setData(i)} />;
};

export const Default = Template.bind({});
Default.args = {
  title: 'Damage Vulnerabilities',
  items: [],
  values: [
    'Acid',
    'Fire',
    'Cold',
  ],
};

export const WithData = Template.bind({});
WithData.args = {
  title: 'Damage Vulnerabilities',
  items: [
    {
      key: Math.random().toString(16).slice(2),
      name: 'Fire',
      value: 2,
    },
    {
      key: Math.random().toString(16).slice(2),
      name: 'Acid',
      value: 1,
    },
  ],
  values: [
    'Acid',
    'Fire',
    'Cold',
  ],
};
