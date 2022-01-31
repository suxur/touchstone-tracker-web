import * as React from 'react';
import { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Actions } from '@/Components/Form/Actions';

export default {
  title: 'Form Actions',
  component: Actions,
} as ComponentMeta<typeof Actions>;

const Template: ComponentStory<typeof Actions> = ({ items, ...args }) => {
  const [data, setData] = useState(items);
  return <Actions {...args} items={data} setItems={i => setData(i)} />;
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
      name: 'Fire',
      description: 'Very very hot!',
    },
    {
      key: Math.random().toString(16).slice(2),
      name: 'Acid',
      description: '',
    },
  ],
};
