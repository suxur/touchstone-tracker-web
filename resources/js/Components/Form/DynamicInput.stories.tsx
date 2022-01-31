import * as React from 'react';
import { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DynamicInput } from '@/Components/Form/DynamicInput';

export default {
  title: 'DynamicInput',
  component: DynamicInput,
} as ComponentMeta<typeof DynamicInput>;

const Template: ComponentStory<typeof DynamicInput> = ({ items, ...args }) => {
  const [data, setData] = useState(items);
  return <DynamicInput {...args} items={data} setItems={i => setData(i)} />;
};

export const Default = Template.bind({});
Default.args = {
  title: 'Damage Vulnerabilities',
  items: [],
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
  ],
};
