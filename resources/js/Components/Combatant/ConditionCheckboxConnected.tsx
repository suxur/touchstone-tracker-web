import * as React from "react";
import { filter, upperFirst } from "lodash";

import { useCombatant } from "@/Hooks/useCombatant";
import { Combatant, Condition } from "@/types";
import { Checkbox } from '@/Components/Checkbox';

type Props = {
  combatant: Combatant;
  condition: Condition;
};

export const ConditionCheckbox = ({ condition, combatant }: Props) => {
  const { mutation } = useCombatant(combatant);

  const update = (condition: Condition) => {
    mutation.mutate({
      ...combatant,
      conditions: getConditions(condition),
    });
  };

  const getConditions = (condition: Condition) => {
    if (isConditionChecked(condition)) {
      return filter(combatant.conditions, (c) => c.id !== condition.id);
    }

    return [...combatant.conditions, condition];
  };

  const isConditionChecked = (condition: Condition) => {
    return !!combatant.conditions.find((c) => c.id === condition.id);
  };

  return (
    <label key={condition.id}>
      <Checkbox
        className="mr-2"
        name="action"
        checked={isConditionChecked(condition)}
        onChange={() => update(condition)}
      />
      <span>{upperFirst(condition.name)}</span>
    </label>
  );
};
