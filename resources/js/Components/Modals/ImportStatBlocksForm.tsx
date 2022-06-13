import * as React from "react";

import {
  JetButton,
  JetDialogModal,
  JetInput,
  JetLabel,
  ModalProps,
} from "@/Components/Jetstream";
import { JetTransparentButton } from "@/Components/Jetstream/TransparentButton";
import { useImportStatBlocks } from "@/Hooks/StatBlocks/useImportStatBlocks";
import useTypedPage from "@/Hooks/useTypedPage";
import { StatBlockType } from "@/types";
import { PageProps } from "@inertiajs/inertia";
import { Controller, useForm } from "react-hook-form";
import { startCase } from "lodash";
import { Autocomplete } from "../Form/Autocomplete";

interface Props extends ModalProps {
  type: StatBlockType;
}

interface FormProps {
  file: FileList;
  collection: string;
}

interface TypedPageProps extends PageProps {
  collections: string[];
}

export const ImportStatBlocksForm = ({ type, isOpen, onClose }: Props) => {
  const { collections } = useTypedPage<TypedPageProps>().props;

  const { register, handleSubmit, control } = useForm<FormProps>({
    defaultValues: {
      collection: "",
    },
  });

  const mutation = useImportStatBlocks(type);

  const onSubmit = (data: FormProps) => {
    console.log(data);
    mutation.mutate({ data });
  };

  React.useEffect(() => {
    register("collection");
  });

  return (
    <JetDialogModal isOpen={isOpen} onClose={onClose}>
      <JetDialogModal.Content title={`Import ${startCase(type)}`}>
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-4">
            <JetLabel
              htmlFor="file"
              value="Import File"
              required
              className="mb-1"
            />
            <JetInput
              type="file"
              className="w-full"
              {...register("file", { required: true })}
            />
          </div>
          {type === "monster" && (
            <div className="col-span-2">
              <Controller
                name="collection"
                control={control}
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
        </div>
      </JetDialogModal.Content>
      <JetDialogModal.Footer>
        <JetTransparentButton onClick={onClose} className="mr-1">
          Cancel
        </JetTransparentButton>
        <JetButton
          type="submit"
          processing={false}
          onClick={handleSubmit(onSubmit)}
        >
          Import
        </JetButton>
      </JetDialogModal.Footer>
    </JetDialogModal>
  );
};
