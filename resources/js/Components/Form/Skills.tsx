import * as React from "react";
import { KeyboardEventHandler, useMemo } from "react";
import { kebabCase, last } from "lodash";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { reorder } from "@/lib/helpers";
import { JetInput } from "@/Components/Jetstream";
import { DeleteButton } from "@/Components/Button/DeleteButton";
import { Dropdown } from "@/Components/Form/Dropdown";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { FormProps } from "@/Hooks/useStatBlockForm";
import { DraggablePortalHandler } from "../DraggablePortalHandler";
import { Button } from '@/Components/Button';

export type SkillDragItems = {
  name: string;
  value: number;
};

type Props = {
  title: string;
  name: "skills" | "saves";
  values: string[];
};

const remaining = (list: SkillDragItems[], values: string[]) => {
  const result = list.map((l) => l.name).filter((name) => name !== "");
  return values
    .filter((v) => !result.includes(v))
    .concat(result.filter((r) => !values.includes(r)));
};

export const Skills = ({ title, name, values }: Props) => {
  const { control, register, watch } = useFormContext<FormProps>();
  const { fields, append, replace, remove } = useFieldArray<
    FormProps,
    typeof name
  >({
    control,
    name,
  });

  const watchFieldArray = watch(name);
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  const addItem = () => {
    append({ name: "", value: 0 });
  };

  const removeItem = (index: number) => {
    remove(index);
  };

  const canAdd = useMemo(() => {
    const lastAdded = last(controlledFields);
    return (
      (controlledFields.length === 0 || !lastAdded || lastAdded.name !== "") &&
      remaining(controlledFields, values).length > 0
    );
  }, [controlledFields, values]);

  const onKeyUp: KeyboardEventHandler = (e) => {
    if (canAdd && e.nativeEvent.code === "Enter") {
      addItem();
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    replace(
      reorder<SkillDragItems>(controlledFields, source.index, destination.index)
    );
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between h-8">
        <h2>{title}</h2>
        {controlledFields.length === 0 && (
          <button
            type="button"
            className="ml-4 text-purple-600 bg-purple-200 h-8 w-8 rounded-md flex justify-center items-center px-4"
            onClick={addItem}
          >
            <FontAwesomeIcon icon="plus" />
          </button>
        )}
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={kebabCase(title)}>
          {(dropProvided) => (
            <div
              ref={dropProvided.innerRef}
              className="flex flex-col w-full"
              {...dropProvided.droppableProps}
            >
              {controlledFields.map((item, index) => (
                <Draggable draggableId={item.id} index={index} key={item.id}>
                  {(dragProvided, snapshot) => (
                    <DraggablePortalHandler snapshot={snapshot}>
                      <div
                        ref={dragProvided.innerRef}
                        className="mt-2 w-full bg-white py-2 rounded-md flex items-center"
                        {...dragProvided.draggableProps}
                        {...dragProvided.dragHandleProps}
                      >
                        <div className="flex justify-center items-center cursor-move handle w-10">
                          <FontAwesomeIcon icon="grip-lines" />
                        </div>
                        <div className="flex flex-grow mr-2 flex-col">
                          <Controller
                            name={`${name}.${index}.name` as const}
                            render={({ field }) => (
                              <Dropdown
                                {...field}
                                data={remaining(controlledFields, values)}
                                placeholder={`Select a ${title}`}
                              />
                            )}
                          />
                        </div>
                        <JetInput
                          type="number"
                          className="w-20 mx-2 text-center"
                          {...register(`${name}.${index}.value` as const)}
                          onKeyUp={onKeyUp}
                        />
                        <DeleteButton onClick={() => removeItem(index)} />
                      </div>
                    </DraggablePortalHandler>
                  )}
                </Draggable>
              ))}
              {dropProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {controlledFields.length > 0 && (
        <div className="w-full">
          <Button
            type="button"
            className="ml-10 mt-2"
            disabled={!canAdd}
            onClick={addItem}
          >
            Add
          </Button>
        </div>
      )}
    </div>
  );
};
