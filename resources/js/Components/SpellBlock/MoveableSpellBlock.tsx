import * as React from 'react';
import { useRef, useState } from 'react';
import * as ReactDOM from 'react-dom';
import Moveable from 'react-moveable';
import clsx from 'clsx';
import { useWindowSize } from '@react-hook/window-size';
import { Transition } from '@headlessui/react';

import { VoidFn } from '@/types';
import { SpellBlockQuery } from '@/Components/SpellBlock/SpellBlockQuery';

interface Props {
  id: number;
  isOpen: boolean;
  close: VoidFn;
}

export const MoveableSpellBlock = ({ id, close, isOpen }: Props) => {
  const [width, height] = useWindowSize();

  const target = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  const [collapsed, setCollapsed] = useState(false);
  const [prevHeight, setPrevHeight] = useState('');
  const [prevWidth, setPrevWidth] = useState('');

  if (typeof document !== 'undefined') {
    return ReactDOM.createPortal(
      <Transition.Root show={isOpen}>
        <div
          ref={target}
          className={clsx('stat-block cursor-move border-none absolute top-1/4 ml-auto mr-auto left-0 right-0 min-w-64 min-h-24', {
            'opacity-75 h-24 w-64': collapsed, 'w-96 h-1/2': !collapsed,
          })}
        >
          <SpellBlockQuery ref={button} id={id} />
        </div>
        <Moveable
          bounds={{
            top: 10,
            right: width - 10,
            bottom: height - 10,
            left: 10,
          }}
          draggable
          throttleDrag={0}
          resizable={!collapsed}
          keepRatio={false}
          scalable={false}
          throttleScale={0}
          rotatable={false}
          throttleRotate={0}
          pinchable={false}
          origin={false}
          snappable
          edge
          target={target}
          onClick={e => {
            if (e.isDouble) {
              setCollapsed(!collapsed);
              const box = e.target;
              if (collapsed) {
                setPrevHeight(box.style.height);
                setPrevWidth(box.style.width);
                box.style.height = '';
                box.style.width = '';
              } else {
                box.style.height = prevHeight;
                box.style.width = prevWidth;
                setPrevHeight('');
                setPrevWidth('');
              }
              e.moveable.updateRect();
            }
            const parent = button.current;
            if (parent === e.inputTarget || parent?.contains(e.inputTarget)) {
              close(id);
            }
          }}
          onDragStart={({ target, moveable }) => {
            const statBlocks = document.getElementsByClassName('stat-block') as HTMLCollectionOf<HTMLElement>;
            for (let i = 0, max = statBlocks.length; i < max; i += 1) {
              statBlocks[i].style.zIndex = '3000';
            }
            const moveableControlBoxes = document.getElementsByClassName('moveable-control-box') as HTMLCollectionOf<HTMLElement>;
            for (let i = 0, max = moveableControlBoxes.length; i < max; i += 1) {
              moveableControlBoxes[i].style.zIndex = '3001';
            }

            target.style.zIndex = '3002';
            const moveableElement = moveable.controlBox.getElement() as HTMLElement;
            moveableElement.style.zIndex = '3003';
          }}
          onDrag={({ target, transform }) => {
            target.style.transform = transform;
          }}
          onResize={({ drag, target, width, height }) => {
            target.style.width = `${width}px`;
            target.style.height = `${height}px`;
            target.style.transform = drag.transform;
          }}
        />
      </Transition.Root>,
      document.body,
    );
  }

  return null;
};
