import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { DynamicInput } from "@/Components/Form/DynamicInput";
import { FormProps } from "@/Hooks/useStatBlockForm";

export default {
  title: "DynamicInput",
  component: DynamicInput,
} as ComponentMeta<typeof DynamicInput>;

const Template: ComponentStory<typeof DynamicInput> = ({ ...args }) => {
  return <DynamicInput {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  title: "Damage Vulnerabilities",
  name: "damage_vulnerabilities",
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
  title: "Damage Vulnerabilities",
  name: "damage_vulnerabilities",
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
