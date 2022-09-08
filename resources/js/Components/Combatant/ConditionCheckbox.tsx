import * as React from "react";

import { VoidFn } from "@/types";
import { Checkbox } from '@/Components/Checkbox';

type Props = {
  update: VoidFn;
  checked: boolean;
  name: string;
};

export const ConditionCheckbox = ({ update, checked, name }: Props) => (
  <label>
    <Checkbox
      className="mr-2"
      name="condition"
      checked={checked}
      onChange={update}
    />
    <span>{name}</span>
  </label>
);
