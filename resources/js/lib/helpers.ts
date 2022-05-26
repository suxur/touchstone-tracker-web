import { Combatant, StatBlockType } from "@/types";
import {
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop: any = () => {};

export const reorder = <T>(list: T[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const hasType = (combatants: Combatant[], type: StatBlockType) =>
  combatants ? combatants.filter((c) => c.type === type).length > 0 : false;

export const isDraggingStyle = (
  style: DraggingStyle | NotDraggingStyle | undefined
): style is DraggingStyle => (style as DraggingStyle).left !== undefined;

