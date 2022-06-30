import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ConditionDropdown } from './ConditionDropdown';

export default {
  title: 'ConditionDropdown',
  component: ConditionDropdown,
} as ComponentMeta<typeof ConditionDropdown>;

const Template: ComponentStory<typeof ConditionDropdown> = (args) => <ConditionDropdown {...args} />;

export const Default = Template.bind({});
Default.args = {};
