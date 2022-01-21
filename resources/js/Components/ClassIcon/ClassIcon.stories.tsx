import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ClassIcon } from './ClassIcon';

export default {
  title: 'ClassIcon',
  component: ClassIcon,
} as ComponentMeta<typeof ClassIcon>;

const Template: ComponentStory<typeof ClassIcon> = (args) => <ClassIcon {...args} />;

export const Default = Template.bind({});
Default.args = {
  icon: 'artificer',
};

export const Artificer = Template.bind({});
Artificer.args = {
  icon: 'artificer',
};

export const Barbarian = Template.bind({});
Barbarian.args = {
  icon: 'barbarian',
};

export const Bard = Template.bind({});
Bard.args = {
  icon: 'bard',
};

export const Cleric = Template.bind({});
Cleric.args = {
  icon: 'cleric',
};

export const Druid = Template.bind({});
Druid.args = {
  icon: 'druid',
};

export const Fighter = Template.bind({});
Fighter.args = {
  icon: 'fighter',
};

export const Monk = Template.bind({});
Monk.args = {
  icon: 'monk',
};

export const Paladin = Template.bind({});
Paladin.args = {
  icon: 'paladin',
};

export const Ranger = Template.bind({});
Ranger.args = {
  icon: 'ranger',
};

export const Rogue = Template.bind({});
Rogue.args = {
  icon: 'rogue',
};

export const Sorcerer = Template.bind({});
Sorcerer.args = {
  icon: 'sorcerer',
};

export const Warlock = Template.bind({});
Warlock.args = {
  icon: 'warlock',
};

export const Wizard = Template.bind({});
Wizard.args = {
  icon: 'wizard',
};
