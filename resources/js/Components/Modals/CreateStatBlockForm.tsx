import clsx from "clsx";
import { startCase } from "lodash";
import * as React from "react";
import { useReducer } from "react";

import { Actions } from "@/Components/Form/Actions";
import { Autocomplete } from "@/Components/Form/Autocomplete";
import { Dropdown } from "@/Components/Form/Dropdown";
import { DynamicInput } from "@/Components/Form/DynamicInput";
import { Skills } from "@/Components/Form/Skills";
import {
    JetButton,
    JetDialogModal,
    JetInput,
    JetLabel,
    ModalProps
} from "@/Components/Jetstream";
import { JetTransparentButton } from "@/Components/Jetstream/TransparentButton";
import { Divider } from "@/Components/StatBlock/Divider";
import {
    ABILITIES,
    ALIGNMENTS,
    CLASSES,
    RACES,
    SIZES,
    SKILLS,
} from "@/constants";
import { useCreateStatBlock } from "@/Hooks/StatBlocks/useCreateStatBlock";
import { useUpdateStatBlock } from "@/Hooks/StatBlocks/useUpdateStatBlock";
import { FormProps, useStatBlockForm } from "@/Hooks/useStatBlockForm";
import useTypedPage from "@/Hooks/useTypedPage";
import { StatBlock, StatBlockType } from "@/types";
import { PageProps } from "@inertiajs/inertia";
import { Controller, FormProvider } from "react-hook-form";
import { JetInputError } from "../Jetstream/InputError";

interface Props extends ModalProps {
  statBlock?: StatBlock;
  type: StatBlockType;
}

interface TypedPageProps extends PageProps {
  collections: string[];
}

export const CreateStatBlockForm = ({
  statBlock,
  type,
  isOpen,
  onClose,
}: Props) => {
  const methods = useStatBlockForm({
    statBlock,
    type,
  });

  const create = useCreateStatBlock(type);
  const update = useUpdateStatBlock(type);

  const {
    formState: { errors },
    register,
  } = methods;

  React.useEffect(() => {
    register("collection");
  });

  const { collections } = useTypedPage<TypedPageProps>().props;
  const [advancedForm, toggleAdvancedForm] = useReducer(
    (previous) => !previous,
    true
  );

  const onSubmit = (data: FormProps) => {
    if (statBlock?.id) {
      update.mutate({ statBlock, data }, {
        onSuccess: () => onClose(),
      });
    } else {
      create.mutate(data, {
        onSuccess: () => onClose(),
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <JetDialogModal isOpen={isOpen} onClose={onClose}>
        <JetDialogModal.Content title={`Create ${startCase(type)}`}>
          <div className="grid grid-cols-6 gap-6">
            <div className={type === "monster" ? "col-span-4" : "col-span-6"}>
              <JetLabel htmlFor="name" value="Name" required />
              <JetInput
                type="text"
                className="mt-1 w-full"
                autoFocus
                {...register("name", { required: true })}
              />
              <JetInputError message={errors.name?.message} className="mt-2" />
            </div>
            {type === "monster" && (
              <div className="col-span-2">
                <Controller
                  name="collection"
                  control={methods.control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      label="Collection"
                      items={collections || []}
                    />
                  )}
                />
              </div>
            )}
            <div className="col-span-6 grid grid-cols-6 gap-6">
              {type === "monster" ? (
                <>
                  <div className="col-span-3">
                    <JetLabel htmlFor="type" value="Type" />
                    <JetInput
                      id="type"
                      type="text"
                      className="mt-1 w-full"
                      required
                      {...register("type")}
                    />
                    <JetInputError
                      message={errors.type?.message}
                      className="mt-2"
                    />
                  </div>
                  <div className="col-span-3">
                    <JetLabel htmlFor="sub-type" value="Sub Type" />
                    <JetInput
                      id="sub-type"
                      type="text"
                      className="mt-1 w-full"
                      {...register("subtype")}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="col-span-3">
                    <Controller
                      name="type"
                      render={({ field }) => (
                        <Dropdown
                          {...field}
                          label="Race"
                          data={RACES}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="col-span-3">
                    <Controller
                      name="subtype"
                      render={({ field }) => (
                        <Dropdown
                          {...field}
                          label="Class"
                          data={CLASSES}
                          required
                        />
                      )}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="col-span-6 grid grid-cols-6 gap-6">
              <div className="col-span-1">
                <JetLabel htmlFor="armor_class" value="Armor Class" required />
                <JetInput
                  id="armor_class"
                  type="number"
                  className="mt-1 block w-full text-center"
                  {...methods.register("armor_class")}
                />
              </div>
              <div className="col-span-2">
                <JetLabel
                  htmlFor="armor_description"
                  value="Armor Description"
                  help="natural armor"
                />
                <JetInput
                  id="armor_description"
                  type="text"
                  className="mt-1 block w-full"
                  {...methods.register("armor_description")}
                />
              </div>
              <div className="col-span-1">
                <JetLabel htmlFor="hit_points" value="Hit Points" required />
                <JetInput
                  id="hit_points"
                  type="number"
                  className="mt-1 block w-full text-center"
                  {...methods.register("hit_points")}
                />
              </div>
              <div className="col-span-2">
                <JetLabel htmlFor="hit_dice" value="Hit Dice" help="6d8+6" />
                <JetInput
                  id="hit_dice"
                  type="text"
                  className="mt-1 block w-full"
                  {...methods.register("hit_dice")}
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
                  {...methods.register("strength")}
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
                  {...methods.register("dexterity")}
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
                  {...methods.register("constitution")}
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
                  {...methods.register("intelligence")}
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
                  {...methods.register("wisdom")}
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
                  {...methods.register("charisma")}
                />
              </div>
            </div>
            <div
              className={clsx("col-span-6 grid grid-cols-6 gap-6", {
                hidden: advancedForm,
              })}
            >
              <div className="col-span-6">
                <Divider />
              </div>
              <div className="col-span-6 grid grid-cols-6 gap-6">
                <div className="col-span-3">
                  <Controller
                    name="size"
                    render={({ field }) => (
                      <Dropdown {...field} label="Size" data={SIZES} />
                    )}
                  />
                </div>
                <div className="col-span-3">
                  <Controller
                    name="alignment"
                    render={({ field }) => (
                      <Dropdown
                        {...field}
                        label="Alignment"
                        data={ALIGNMENTS}
                      />
                    )}
                  />
                </div>
              </div>
              {type === "monster" && (
                <div className="col-span-6">
                  <JetLabel htmlFor="cr">Challenge Rating</JetLabel>
                  <JetInput
                    id="cr"
                    type="text"
                    className="mt-1 block w-full"
                    {...methods.register("cr")}
                  />
                </div>
              )}
              <div className="col-span-6">
                <Divider />
                <DynamicInput title="Speed" name="speed" />
                <Divider />
                <DynamicInput title="Senses" name="senses" />
                <Divider />
                <DynamicInput
                  title="Damage Vulnerabilities"
                  name="damage_vulnerabilities"
                />
                <Divider />
                <DynamicInput
                  title="Damage Resistances"
                  name="damage_resistances"
                />
                <Divider />
                <DynamicInput
                  title="Damage Immunities"
                  name="damage_immunities"
                />
                <Divider />
                <DynamicInput
                  title="Condition Immunities"
                  name="condition_immunities"
                />
                <Divider />
                <DynamicInput title="Languages" name="languages" />
                <Divider />
                <Skills title="Saves" name="saves" values={ABILITIES} />
                <Divider />
                <Skills title="Skills" name="skills" values={SKILLS} />
                <Divider />
                <Actions title="Traits" name="traits" />
                <Divider />
                <Actions title="Actions" name="actions" />
                <Divider />
                <Actions title="Reactions" name="reactions" />
                {type === "monster" && (
                  <>
                    <Divider />
                    <Actions
                      title="Legendary Actions"
                      name="legendary_actions"
                    />
                    <Divider />
                    <div className="col-span-6">
                      <JetLabel
                        htmlFor="legendary_description"
                        value="Legendary Description"
                      />
                      <textarea
                        className="mt-1 block w-full border-gray-300 focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 rounded-md"
                        {...methods.register("legendary_description")}
                      />
                    </div>
                  </>
                )}
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
          <JetButton
            type="submit"
            processing={false}
            onClick={methods.handleSubmit(onSubmit)}
          >
            {statBlock?.id ? 'Update' : 'Create'}
          </JetButton>
        </JetDialogModal.Footer>
      </JetDialogModal>
    </FormProvider>
  );
};
