import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Actions } from './Actions';
import { useState } from 'react';

export default {
  title: 'Form Actions',
  component: Actions,
} as ComponentMeta<typeof Actions>;

const Template: ComponentStory<typeof Actions> = (args) => {
  const [items, setItems] = useState(args.items)
  return <Actions {...args} items={items} setItems={items => setItems(items)}/>;
}

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
      description: 'Very very hot!'
    },
    {
      key: Math.random().toString(16).slice(2),
      name: 'Acid',
      description: ''
    },
  ],
};