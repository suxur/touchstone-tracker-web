import * as React from "react";
import ReactDOM from "react-dom";
import { DraggableStateSnapshot } from "react-beautiful-dnd";

interface Props {
  children: React.ReactElement;
  snapshot: DraggableStateSnapshot;
}

export const DraggablePortalHandler = ({
  children,
  snapshot,
}: Props) => {
  if (snapshot.isDragging)
    return ReactDOM.createPortal(children, document.body);
  return children;
};
