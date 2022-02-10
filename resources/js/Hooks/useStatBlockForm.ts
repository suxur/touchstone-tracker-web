import { useEffect } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { DragItems } from '@/Components/Form/DynamicInput';
import { SkillDragItems } from '@/Components/Form/Skills';
import { ActionDragItems } from '@/Components/Form/Actions';
import { Action, StatBlock, StatBlockType } from '@/types';

interface Props {
  type: StatBlockType;
  statBlock?: StatBlock;
}

interface FormProps {
  name: string;
  race: string;
  class: string;
  armor_class: number;
  armor_description: string;
  stat_block_type: 'monster' | 'character';
  hit_points: number;
  hit_dice: string;
  cr: string;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  size: string;
  alignment: string;
  speed: DragItems[];
  senses: DragItems[];
  damage_vulnerabilities: DragItems[];
  damage_resistances: DragItems[];
  damage_immunities: DragItems[];
  condition_immunities: DragItems[];
  languages: DragItems[];
  saves: SkillDragItems[];
  skills: SkillDragItems[];
  traits: ActionDragItems[];
  actions: ActionDragItems[];
  reactions: ActionDragItems[];
  legendary_actions: ActionDragItems[];
  legendary_description: string;
  collection: string;
}

const parseDragItems = (text: string): DragItems[] => text.split(',').map(item => ({
  key: Math.random().toString(16).slice(2),
  value: item.trim(),
}));

const parseActionDragItems = (actions: Action[]): ActionDragItems[] => actions.map(action => ({
  key: action.id.toString(),
  name: action.name,
  description: action.description,
}));

export const useStatBlockForm = ({ statBlock, type }: Props) => {
  const form = useForm<FormProps>({
    name: '',
    race: '',
    class: '',
    armor_class: 0,
    armor_description: '',
    stat_block_type: type,
    hit_points: 0,
    hit_dice: '',
    cr: '',
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
    size: '',
    alignment: '',
    speed: [],
    senses: [],
    damage_vulnerabilities: [],
    damage_resistances: [],
    damage_immunities: [],
    condition_immunities: [],
    languages: [],
    saves: [],
    skills: [],
    traits: [],
    actions: [],
    reactions: [],
    legendary_actions: [],
    legendary_description: '',
    collection: '',
  });

  useEffect(() => {
    form.setData({
      name: statBlock?.name || '',
      race: statBlock?.type || '',
      class: statBlock?.subtype || '',
      armor_class: statBlock?.armor_class || 0,
      armor_description: statBlock?.armor_description || '',
      stat_block_type: statBlock?.stat_block_type || type,
      hit_points: statBlock?.hit_points || 0,
      hit_dice: statBlock?.hit_dice || '',
      cr: statBlock?.challenge_rating || '',
      strength: statBlock?.strength || 10,
      dexterity: statBlock?.dexterity || 10,
      constitution: statBlock?.constitution || 10,
      intelligence: statBlock?.intelligence || 10,
      wisdom: statBlock?.wisdom || 10,
      charisma: statBlock?.charisma || 10,
      size: statBlock?.size || '',
      alignment: statBlock?.alignment || '',
      speed: statBlock?.speed ? parseDragItems(statBlock?.speed) : [],
      senses: statBlock?.senses ? parseDragItems(statBlock?.senses) : [],
      damage_vulnerabilities: statBlock?.damage_vulnerabilities ? parseDragItems(statBlock?.damage_vulnerabilities) : [],
      damage_resistances: statBlock?.damage_resistances ? parseDragItems(statBlock?.damage_resistances) : [],
      damage_immunities: statBlock?.damage_immunities ? parseDragItems(statBlock?.damage_immunities) : [],
      condition_immunities: statBlock?.condition_immunities ? parseDragItems(statBlock?.condition_immunities) : [],
      languages: statBlock?.languages ? parseDragItems(statBlock?.languages) : [],
      saves: [],
      skills: [],
      traits: [],
      actions: statBlock?.actions ? parseActionDragItems(statBlock?.actions) : [],
      reactions: statBlock?.reactions ? parseActionDragItems(statBlock?.reactions) : [],
      legendary_actions: statBlock?.legendary_actions ? parseActionDragItems(statBlock?.legendary_actions) : [],
      legendary_description: statBlock?.legendary_description || '',
      collection: statBlock?.collection || '',
    });
  }, [statBlock]);

  return form;
};
