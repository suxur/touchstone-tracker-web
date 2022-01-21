import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { JetSectionBorder } from '@/Components/Jetstream/SectionBorder';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: JetSectionBorder,
} as ComponentMeta<typeof JetSectionBorder>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Primary: ComponentStory<typeof JetSectionBorder> = () => <JetSectionBorder  />;
