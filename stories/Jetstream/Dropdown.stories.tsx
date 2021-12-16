import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { JetDropdown } from '../../resources/js/Components/Jetstream/Dropdown';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: JetDropdown,
} as ComponentMeta<typeof JetDropdown>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof JetDropdown> = (args) => <JetDropdown {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  children: 'Button',
  renderTrigger(): JSX.Element {
    return <div>Dropdown</div>
  }
};
