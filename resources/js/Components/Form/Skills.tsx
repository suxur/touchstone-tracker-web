import * as React from 'react';
import { KeyboardEventHandler, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import { JetButton, JetInput } from '@/Components/Jetstream';
import { kebabCase, last } from 'lodash';
import { DeleteButton } from '@/Components/Button/DeleteButton';
import { Dropdown } from '@/Components/Form/Dropdown';
import { reorder } from '@/lib/helpers';

export type SkillDragItems = {
  key: string;
  name: string;
  value: number;
}

type Props = {
  title: string
  items: SkillDragItems[];
  setItems: (items: SkillDragItems[]) => void;
  values: string[]
};

const remaining = (list: SkillDragItems[], values: string[]) => {
  const result = list.map(l => l.name).filter(name => name !== '');
  return values.filter(v => !result.includes(v)).concat(result.filter(r => !values.includes(r)));
}

export const Skills = ({ title, items, setItems, values }: Props) => {
  const addItem = () => {
    const key = Math.random().toString(16).slice(2);
    setItems([...items, { key, name: '', value: 0 }]);
  };

  const editItemName = (value: string, index: number) => {
    setItems(items.map((i, id) => id === index ? { ...i, name: value } : i));
  };

  const editItemValue = (value: number, index: number) => {
    setItems(items.map((i, id) => id === index ? { ...i, value } : i));
  };

  const removeItem = (index: number) => {
    setItems(items.filter((i, idx) => idx !== index));
  };

  const canAdd = useMemo(() => {
    const lastAdded = last(items);
    return items.length === 0 || !lastAdded || lastAdded.name !== '' && remaining(items, values).length > 0;
  }, [items]);

  const onKeyUp: KeyboardEventHandler = (e) => {
    if (canAdd && e.nativeEvent.code === 'Enter') {
      addItem();
    }
  }

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    setItems(reorder<SkillDragItems>(items, source.index, destination.index));
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
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <Droppable droppableId={kebabCase(title)}>{provided => (
          <div
            ref={provided.innerRef}
            className="flex flex-col w-full"
            {...provided.droppableProps}
          >
            {items.map((item, index) => (
              <Draggable draggableId={item.key} index={index} key={item.key}>
                {provided => (
                  <div
                    ref={provided.innerRef}
                    className="mt-2 w-full bg-white py-2 rounded-md flex items-center"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div className="flex justify-center items-center cursor-move handle w-10">
                      <FontAwesomeIcon icon="grip-lines" />
                    </div>
                    <Dropdown
                      value={item.name}
                      onChange={value => editItemName(value, index)}
                      data={remaining(items, values)}
                      placeholder={`Select a ${title}`}
                    />
                    <JetInput
                      type="number"
                      value={item.value}
                      className="w-20 mx-2 text-center"
                      onChange={e => editItemValue(Number(e.target.value), index)}
                      onKeyUp={onKeyUp}
                    />
                    <DeleteButton onClick={() => removeItem(index)} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
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
