import { useEffect } from "react";
import { DragItems } from "@/Components/Form/DynamicInput";
import { SkillDragItems } from "@/Components/Form/Skills";
import { ActionDragItems } from "@/Components/Form/Actions";
import { Action, StatBlock, StatBlockType } from "@/types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


interface Props {
  type: StatBlockType;
  statBlock?: StatBlock;
}

export interface FormProps {
  name: string;
  type: string;
  subtype: string;
  armor_class: number;
  armor_description: string;
  stat_block_type: "monster" | "character";
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

const schema = yup.object({
  name: yup.string().required().max(255),
  armor_class: yup.number().required(),
  hit_points: yup.number().required(),
  type: yup.string(),
  subtype: yup.string(),
});

const parseDragItems = (text: string): DragItems[] =>
  text.split(",").map((item) => ({
    key: Math.random().toString(16).slice(2),
    value: item.trim(),
  }));

const parseActionDragItems = (actions: Action[]): ActionDragItems[] =>
  actions.map((action) => ({
    key: action.id.toString(),
    name: action.name,
    description: action.description,
  }));

export const useStatBlockForm = ({ statBlock, type }: Props) => {
  const form = useForm<FormProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      type: "",
      subtype: "",
      armor_class: 0,
      armor_description: "",
      stat_block_type: type,
      hit_points: 0,
      hit_dice: "",
      cr: "",
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
      size: "",
      alignment: "",
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
      legendary_description: "",
      collection: "",
    },
  });

  useEffect(() => {
    form.setValue("name", statBlock?.name || "");
    form.setValue("type", statBlock?.type || "");
    form.setValue("subtype", statBlock?.subtype || "");
    form.setValue("armor_class", statBlock?.armor_class || 0);
    form.setValue("armor_description", statBlock?.armor_description || "");
    form.setValue("stat_block_type", statBlock?.stat_block_type || type);
    form.setValue("hit_points", statBlock?.hit_points || 0);
    form.setValue("hit_dice", statBlock?.hit_dice || "");
    form.setValue("cr", statBlock?.challenge_rating || "");
    form.setValue("strength", statBlock?.strength || 10);
    form.setValue("dexterity", statBlock?.dexterity || 10);
    form.setValue("constitution", statBlock?.constitution || 10);
    form.setValue("intelligence", statBlock?.intelligence || 10);
    form.setValue("wisdom", statBlock?.wisdom || 10);
    form.setValue("charisma", statBlock?.charisma || 10);
    form.setValue("size", statBlock?.size || "");
    form.setValue("alignment", statBlock?.alignment || "");
    form.setValue(
      "speed",
      statBlock?.speed ? parseDragItems(statBlock?.speed) : []
    );
    form.setValue(
      "senses",
      statBlock?.senses ? parseDragItems(statBlock?.senses) : []
    );
    form.setValue(
      "damage_vulnerabilities",
      statBlock?.damage_vulnerabilities
        ? parseDragItems(statBlock?.damage_vulnerabilities)
        : []
    );
    form.setValue(
      "damage_resistances",
      statBlock?.damage_resistances
        ? parseDragItems(statBlock?.damage_resistances)
        : []
    );
    form.setValue(
      "damage_immunities",
      statBlock?.damage_immunities
        ? parseDragItems(statBlock?.damage_immunities)
        : []
    );
    form.setValue(
      "condition_immunities",
      statBlock?.condition_immunities
        ? parseDragItems(statBlock?.condition_immunities)
        : []
    );
    form.setValue(
      "languages",
      statBlock?.languages ? parseDragItems(statBlock?.languages) : []
    );
    form.setValue("saves", []);
    form.setValue("skills", []);
    form.setValue("traits", []);
    form.setValue(
      "actions",
      statBlock?.actions ? parseActionDragItems(statBlock?.actions) : []
    );
    form.setValue(
      "reactions",
      statBlock?.reactions ? parseActionDragItems(statBlock?.reactions) : []
    );
    form.setValue(
      "legendary_actions",
      statBlock?.legendary_actions
        ? parseActionDragItems(statBlock?.legendary_actions)
        : []
    );
    form.setValue(
      "legendary_description",
      statBlock?.legendary_description || ""
    );
    form.setValue("collection", statBlock?.collection || "");
  }, [statBlock]);

  return form;
};
