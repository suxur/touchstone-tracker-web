import * as React from "react";
import { FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { StatBlockType } from "@/types";
import { useEncounter } from "@/Hooks/useEncounter";
import { JetButton } from "@/Components/Jetstream";

interface Props {
  type: StatBlockType;
}

export const QuickAdd = ({ type }: Props) => {
  const { add, encounter } = useEncounter();

  const [name, setName] = React.useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (encounter) {
      add.mutate(
        { name, type },
        {
          onSuccess: () => {
            setName("");
          },
        }
      );
    }
  };

  return (
    <form className="flex" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Quick Add"
        className="border-gray-300 focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 flex-grow rounded-l-md border-r-0"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <JetButton
        type="submit"
        className="rounded-l-none"
        processing={add.isLoading}
      >
        <FontAwesomeIcon icon="plus" />
      </JetButton>
    </form>
  );
};
