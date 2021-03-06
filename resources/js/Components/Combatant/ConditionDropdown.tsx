import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import { useCombatant } from "@/Hooks/useCombatant";
import { Combatant, Condition } from "@/types";
import { Fade } from "../Fade";
import { JetTransparentButton } from "../Jetstream/TransparentButton";
import { ConditionCheckbox } from "./ConditionCheckbox";

type Props = {
  active: boolean;
  combatant: Combatant;
  conditions: Condition[];
};


export const ConditionDropdown = ({ combatant, conditions, active }: Props) => {
  const [isShowing, setIsShowing] = React.useState(false);
  const { mutation } = useCombatant(combatant);

  const clear = () => {
    mutation.mutate({
      ...combatant,
      conditions: [],
    });
  };

  return (
    <div className="relative">
      <JetTransparentButton
        onClick={() => setIsShowing((isShowing) => !isShowing)}
        className={clsx(active ? "text-gray-700" : "text-gray-500")}
      >
        <FontAwesomeIcon icon="plus" />
        <span className="ml-2">Condition</span>
      </JetTransparentButton>
      <Fade showing={isShowing}>
        <div className="flex mt-1">
        <div
          className={clsx("bg-gray-100 rounded-md", {
            "bg-purple-400": active,
          })}
        >
          <div className="flex flex-wrap p-2 text-sm">
            {conditions.map((condition) => (
              <div className="w-28 mb-1" key={condition.id}>
                <ConditionCheckbox
                  condition={condition}
                  combatant={combatant}
                />
              </div>
            ))}
          </div>
        </div>
        <JetTransparentButton
          className={clsx(
            "mt-2 sm:ml-1 sm:mt-0",
            active ? "text-gray-700" : "text-gray-500"
          )}
          onClick={clear}
        >
          Clear
        </JetTransparentButton>
        </div>
      </Fade>
    </div>
  );
};
