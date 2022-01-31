import * as React from 'react';
import { KeyboardEventHandler, useMemo } from 'react';
import { kebabCase, last } from 'lodash';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { reorder } from '@/lib/helpers';
import { JetButton, JetInput } from '@/Components/Jetstream';
import { DeleteButton } from '@/Components/Button/DeleteButton';

export type DragItems = {
  key: string,
  value: string
}

type Props = {
  title: string
  items: DragItems[];
  setItems: (items: DragItems[]) => void;
};

export const DynamicInput = ({ title, items, setItems }: Props) => {
  const addItem = () => {
    const key = Math.random().toString(16).slice(2);
    setItems([...items, { key, value: '' }]);
  };

  const editItem = (value: string, index: number) => {
    setItems(items.map((i, id) => (id === index ? { ...i, value } : i)));
  };

  const removeItem = (index: number) => {
    setItems(items.filter((i, idx) => idx !== index));
  };

  const canAdd = useMemo(() => {
    const lastAdded = last(items);
    return items.length === 0 || !lastAdded || lastAdded.value !== '';
  }, [items]);

  const onKeyUp: KeyboardEventHandler = (e) => {
    if (canAdd && e.nativeEvent.code === 'Enter') {
      addItem();
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    setItems(reorder<DragItems>(items, source.index, destination.index));
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between h-8">
        <h2>{title}</h2>
        {items.length === 0 && (
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
          {dropProvided => (
            <div
              ref={dropProvided.innerRef}
              className="flex flex-col w-full"
              {...dropProvided.droppableProps}
            >
              {items.map((item, index) => (
                <Draggable draggableId={item.key} index={index} key={item.key}>
                  {dragProvided => (
                    <div
                      ref={dragProvided.innerRef}
                      className="mt-2 w-full bg-white py-2 rounded-md flex items-center"
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                    >
                      <div className="flex justify-center items-center cursor-move handle w-10">
                        <FontAwesomeIcon icon="grip-lines" />
                      </div>
                      <JetInput
                        type="text"
                        value={item.value}
                        className="flex flex-grow mr-2"
                        onChange={e => editItem(e.target.value, index)}
                        onKeyUp={onKeyUp}
                        autoFocus
                      />
                      <DeleteButton onClick={() => removeItem(index)} />
                    </div>
                  )}
                </Draggable>
              ))}
              {dropProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {items.length > 0 && (
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
