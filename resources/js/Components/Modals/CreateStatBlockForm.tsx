import * as React from 'react';
import { JetButton, JetDialogModal, JetInput, JetLabel, ModalProps } from '@/Components/Jetstream';
import { StatBlock } from '@/types';
import { useForm } from '@inertiajs/inertia-react';
import useRoute from '@/Hooks/useRoute';
import { ABILITIES, ALIGNMENTS, CLASSES, RACES, SIZES, SKILLS } from '@/constants';
import { JetTransparentButton } from '@/Components/Jetstream/TransparentButton';
import clsx from 'clsx';
import { Dropdown } from '@/Components/Form/Dropdown';
import { Divider } from '@/Components/StatBlock/Divider';
import { DragItems, DynamicInput } from '@/Components/Form/DynamicInput';
import { SkillDragItems, Skills } from '@/Components/Form/Skills';
import { ActionDragItems, Actions } from '@/Components/Form/Actions';
import { startCase } from 'lodash';

interface Props extends ModalProps {
  statBlock?: StatBlock;
  type: 'monster' | 'character';
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
}

export const CreateStatBlockForm = ({ statBlock, type, isOpen, onClose }: Props) => {
  const route = useRoute();

  const [advancedForm, toggleAdvancedForm] = React.useReducer(previous => !previous, true);

  const form = useForm<FormProps>({
    name: '',
    race: '',
    class: '',
    armor_class: 0,
    armor_description: '',
    stat_block_type: type,
    hit_points: 0,
    hit_dice: '',
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
  });

  const onSubmit = () => {
    form.post(route('stat_block.store'), {
      preserveScroll: true,
      onSuccess: () => {
        onClose();
        form.reset();
      },
    });
  };

  return (
    <JetDialogModal isOpen={isOpen} onClose={onClose}>
      <JetDialogModal.Content title={`Create ${startCase(type)}`}>
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <JetLabel htmlFor="name" value="Name" required />
            <JetInput
              id="name"
              type="text"
              className="mt-1 w-full"
              value={form.data.name}
              onChange={e => form.setData('name', e.target.value)}
              autoFocus
              required
            />
          </div>

          <div className="col-span-6 grid grid-cols-6 gap-6">
            <div className="col-span-3">
              <Dropdown
                value={form.data.race}
                label="Race"
                onChange={(value => form.setData('race', value))}
                data={RACES}
                required
              />
            </div>
            <div className="col-span-3">
              <Dropdown
                value={form.data.class}
                label="Class"
                onChange={(value => form.setData('class', value))}
                data={CLASSES}
                required
              />
            </div>
          </div>

          <div className="col-span-6 grid grid-cols-6 gap-6">
            <div className="col-span-1">
              <JetLabel htmlFor="armor_class" value="Armor Class" />
              <JetInput
                id="armor_class"
                type="number"
                className="mt-1 block w-full text-center"
                value={form.data.armor_class}
                onChange={e => form.setData('armor_class', Number(e.target.value))}
              />
            </div>
            <div className="col-span-2">
              <JetLabel htmlFor="armor_description" value="Armor Description" help="natural armor" />
              <JetInput
                id="armor_description"
                type="text"
                className="mt-1 block w-full"
                value={form.data.armor_description}
                onChange={e => form.setData('armor_description', e.target.value)}
              />
            </div>
            <div className="col-span-1">
              <JetLabel htmlFor="hit_points" value="Hit Points" />
              <JetInput
                id="hit_points"
                type="number"
                className="mt-1 block w-full text-center"
                value={form.data.hit_points}
                onChange={e => form.setData('hit_points', Number(e.target.value))}
              />
            </div>
            <div className="col-span-2">
              <JetLabel htmlFor="hit_dice" value="Hit Dice" help="6d8+6" />
              <JetInput
                id="hit_dice"
                type="text"
                className="mt-1 block w-full"
                value={form.data.hit_dice}
                onChange={e => form.setData('hit_dice', e.target.value)}
              />
            </div>
          </div>

          <div className="col-span-6 grid grid-cols-6 gap-6">
            <div className="col-span-1">
              <JetLabel htmlFor="strength">
                Str<span className="hidden sm:inline-block">ength</span>
              </JetLabel>
              <JetInput
                id="strength"
                type="number"
                className="mt-1 block w-full text-center"
                value={form.data.strength}
                onChange={e => form.setData('strength', Number(e.target.value))}
              />
            </div>
            <div className="col-span-1">
              <JetLabel htmlFor="dexterity">
                Dex<span className="hidden sm:inline-block">terity</span>
              </JetLabel>
              <JetInput
                id="dexterity"
                type="number"
                className="mt-1 block w-full text-center"
                value={form.data.dexterity}
                onChange={e => form.setData('dexterity', Number(e.target.value))}
              />
            </div>
            <div className="col-span-1">
              <JetLabel htmlFor="constitution">
                Con<span className="hidden sm:inline-block">stitution</span>
              </JetLabel>
              <JetInput
                id="constitution"
                type="number"
                className="mt-1 block w-full text-center"
                value={form.data.constitution}
                onChange={e => form.setData('constitution', Number(e.target.value))}
              />
            </div>
            <div className="col-span-1">
              <JetLabel htmlFor="intelligence">
                Int<span className="hidden sm:inline-block">elligence</span>
              </JetLabel>
              <JetInput
                id="intelligence"
                type="number"
                className="mt-1 block w-full text-center"
                value={form.data.intelligence}
                onChange={e => form.setData('intelligence', Number(e.target.value))}
              />
            </div>
            <div className="col-span-1">
              <JetLabel htmlFor="wisdom">
                Wis<span className="hidden sm:inline-block">dom</span>
              </JetLabel>
              <JetInput
                id="wisdom"
                type="number"
                className="mt-1 block w-full text-center"
                value={form.data.wisdom}
                onChange={e => form.setData('wisdom', Number(e.target.value))}
              />
            </div>
            <div className="col-span-1">
              <JetLabel htmlFor="charisma">
                Cha<span className="hidden sm:inline-block">risma</span>
              </JetLabel>
              <JetInput
                id="charisma"
                type="number"
                className="mt-1 block w-full text-center"
                value={form.data.charisma}
                onChange={e => form.setData('charisma', Number(e.target.value))}
              />
            </div>
          </div>
          <div className={clsx('col-span-6 grid grid-cols-6 gap-6', { hidden: advancedForm })}>
            <div className="col-span-6">
              <Divider />
            </div>
            <div className="col-span-6 grid grid-cols-6 gap-6">
              <div className="col-span-3">
                <Dropdown
                  value={form.data.size}
                  label="Size"
                  onChange={(value) => form.setData('size', value)}
                  data={SIZES}
                />
              </div>
              <div className="col-span-3">
                <Dropdown
                  value={form.data.alignment}
                  label="Alignment"
                  onChange={(value => form.setData('alignment', value))}
                  data={ALIGNMENTS}
                />
              </div>
            </div>
            <div className="col-span-6">
              <Divider />
              <DynamicInput title="Speed" items={form.data.speed} setItems={items => form.setData('speed', items)} />
              <Divider />
              <DynamicInput
                title="Senses"
                items={form.data.senses}
                setItems={items => form.setData('senses', items)}
              />
              <Divider />
              <DynamicInput
                title="Damage Vulnerabilities"
                items={form.data.damage_vulnerabilities}
                setItems={items => form.setData('damage_vulnerabilities', items)}
              />
              <Divider />
              <DynamicInput
                title="Damage Resistances"
                items={form.data.damage_resistances}
                setItems={items => form.setData('damage_resistances', items)}
              />
              <Divider />
              <DynamicInput
                title="Damage Immunities"
                items={form.data.damage_immunities}
                setItems={items => form.setData('damage_immunities', items)}
              />
              <Divider />
              <DynamicInput
                title="Condition Immunities"
                items={form.data.condition_immunities}
                setItems={items => form.setData('condition_immunities', items)}
              />
              <Divider />
              <DynamicInput
                title="Languages"
                items={form.data.languages}
                setItems={items => form.setData('languages', items)}
              />
              <Divider />
              <Skills
                title="Saves"
                items={form.data.saves}
                setItems={items => form.setData('saves', items)}
                values={ABILITIES}
              />
              <Divider />
              <Skills
                title="Skills"
                items={form.data.skills}
                setItems={items => form.setData('skills', items)}
                values={SKILLS}
              />
              <Divider />
              <Actions title="Traits" items={form.data.traits} setItems={items => form.setData('traits', items)} />
              <Divider />
              <Actions title="Actions" items={form.data.actions} setItems={items => form.setData('actions', items)} />
              <Divider />
              <Actions
                title="Reactions"
                items={form.data.reactions}
                setItems={items => form.setData('reactions', items)}
              />
            </div>
          </div>
          <button
            className="underline text-sm text-gray-600 hover:text-gray-800 col-span-6"
            type="button"
            onClick={toggleAdvancedForm}
          >
            Toggle Advanced Form
          </button>
        </div>
      </JetDialogModal.Content>
      <JetDialogModal.Footer>
        <JetTransparentButton onClick={onClose} className="mr-1">
          Cancel
        </JetTransparentButton>
        <JetButton type="submit" processing={form.processing} onClick={onSubmit}>
          Create
        </JetButton>
      </JetDialogModal.Footer>
    </JetDialogModal>
  );
};
