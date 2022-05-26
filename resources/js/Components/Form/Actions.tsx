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
import { JetButton, JetInput, JetLabel } from "@/Components/Jetstream";
import { DeleteButton } from "@/Components/Button/DeleteButton";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormProps } from "@/Hooks/useStatBlockForm";
import { DraggablePortalHandler } from "../DraggablePortalHandler";

export type ActionDragItems = {
  name: string;
  description: string;
};

type Props = {
  title: string;
  name: "traits" | "actions" | "reactions" | "legendary_actions";
};

export const Actions = ({ title, name }: Props) => {
  const { control, register, watch } = useFormContext<FormProps>();
  const { fields, append, remove, replace } = useFieldArray<
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
    append({ name: "", description: "" });
  };

  const removeItem = (index: number) => {
    remove(index);
  };

  const canAdd = useMemo(() => {
    const lastAdded = last(controlledFields);
    return controlledFields.length === 0 || !lastAdded || lastAdded.name !== "";
  }, [controlledFields]);

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
      reorder<ActionDragItems>(
        controlledFields,
        source.index,
        destination.index
      )
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
                          <JetLabel value="Name" />
                          <JetInput
                            type="text"
                            className="w-full"
                            autoFocus
                            {...register(`${name}.${index}.name` as const)}
                          />
                          <div className="mt-2">
                            <JetLabel value="Description" />
                            <textarea
                              className="mt-1 block w-full border-gray-300 focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 rounded-md"
                              onKeyUp={onKeyUp}
                              {...register(
                                `${name}.${index}.description` as const
                              )}
                            />
                          </div>
                        </div>
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
          <JetButton
            type="button"
            className="ml-10 mt-2"
            disabled={!canAdd}
            onClick={addItem}
          >
            Add
          </JetButton>
        </div>
      )}
    </div>
  );
};
