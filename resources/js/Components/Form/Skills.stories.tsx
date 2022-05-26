import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Skills } from '@/Components/Form/Skills';
import { FormProvider, useForm } from 'react-hook-form';
import { FormProps } from '@/Hooks/useStatBlockForm';
import { SKILLS } from '@/constants';

export default {
  title: 'Skills',
  component: Skills,
} as ComponentMeta<typeof Skills>;

const Template: ComponentStory<typeof Skills> = ({ ...args }) => {
  return <Skills {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  title: 'Skills',
  name: 'skills',
  values: SKILLS
};
Default.decorators = [
  (Story) => {
    const methods = useForm<FormProps>();
    return (
      <FormProvider {...methods}>
        <Story />
      </FormProvider>
    );
  },
];

export const WithData = Template.bind({});
WithData.args = {
  title: 'Skills',
  name: 'skills',
  values: SKILLS
};
WithData.decorators = [
  (Story) => {
    const methods = useForm<FormProps>();
    return (
      <FormProvider {...methods}>
        <Story />
      </FormProvider>
    );
  },
];
