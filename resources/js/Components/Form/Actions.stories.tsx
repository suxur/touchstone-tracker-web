import * as React from 'react';
import { FormProvider, useForm } from "react-hook-form";
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Actions } from '@/Components/Form/Actions';
import { FormProps } from "@/Hooks/useStatBlockForm";

export default {
  title: 'Form Actions',
  component: Actions,
} as ComponentMeta<typeof Actions>;

const Template: ComponentStory<typeof Actions> = ({ ...args }) => {
  return <Actions {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  title: 'Actions',
  name: 'actions'
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
  title: 'Actions',
  name: 'actions'
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
