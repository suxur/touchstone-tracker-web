import * as React from "react";
import { useMemo, useState } from "react";
import { startCase } from "lodash";

import { StatBlock, StatBlockPermissions, StatBlockRouteType, StatBlockType } from "@/types";
import { ActionSection } from "@/Components/Jetstream";
import { DeleteButton } from "@/Components/Button/DeleteButton";
import { CloneButton } from "@/Components/Button/CloneButton";
import { CreateStatBlockForm } from "@/Components/Modals/CreateStatBlockForm";
import { DeleteStatBlockModal } from "@/Components/Modals/DeleteStatBlockModal";
import { EditButton } from "@/Components/Button/EditButton";
import { useCloneStatBlock } from "@/Hooks/StatBlocks/useCloneStatBlock";
import { ImportStatBlocksForm } from "@/Components/Modals/ImportStatBlocksForm";
import { Pagination } from "@/Components/Pagination";
import { useStatBlockPagination } from "@/Hooks/StatBlocks/useStatBlockPagination";
import { Button } from '@/Components/Button';

interface Props {
  permissions: StatBlockPermissions;
  route: StatBlockRouteType;
  type: StatBlockType;
}

type ModalProps = {
  isOpen: boolean;
  statBlock?: StatBlock;
};

export const ManageStatBlocks = ({ type, route, permissions }: Props) => {
  const [page, setPage] = useState(1);
  const cloneStatBlock = useCloneStatBlock();
  const { isSuccess, data } = useStatBlockPagination({ type: route, page });

  const [importModal, setImportModal] = useState<ModalProps>({
    isOpen: false,
  });

  const [createModal, setCreateModal] = useState<ModalProps>({
    isOpen: false,
  });

  const [deleteModal, setDeleteModal] = useState<ModalProps>({
    isOpen: false,
  });

  const edit = (statBlock: StatBlock) => {
    setCreateModal({
      statBlock,
      isOpen: true,
    });
  };

  const clone = (statBlock: StatBlock) => {
    cloneStatBlock.mutate({ statBlock, type });
  };

  const confirmDelete = (statBlock: StatBlock) => {
    setDeleteModal({ statBlock, isOpen: true });
  };

  const displayTitle = useMemo(() => `${startCase(type)}s`, [type]);

  return (
    <ActionSection
      title={displayTitle}
      description={`All of the ${displayTitle.toLowerCase()} that are part of this team.`}
      actions={
        <div>
          <Button
            className="mr-2"
            onClick={() => setImportModal({ isOpen: true })}
          >
            Import {displayTitle}
          </Button>
          <Button
            onClick={() =>
              setCreateModal({ statBlock: undefined, isOpen: true })
            }
          >
            Add {displayTitle}
          </Button>
        </div>
      }
    >
      {isSuccess && data && data.data.length > 0 ? (
        <>
          <div className="space-y-4 divide-y divide-gray-200">
            {data.data.map((statBlock) => (
              <div key={statBlock.id} className="pt-2 first:pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <div>{statBlock.name}</div>
                  </div>
                  <div className="flex items-center">
                    {permissions.canManageStatBlocks && (
                      <>
                        <EditButton onClick={() => edit(statBlock)} />
                        <CloneButton onClick={() => clone(statBlock)} />
                        <DeleteButton
                          onClick={() => confirmDelete(statBlock)}
                        />
                      </>
                    )}
                  </div>
                </div>
                {statBlock.collection && (
                  <span className="mt-2 text-xs py-1 px-2 bg-gray-200 rounded-md">
                    {statBlock.collection}
                  </span>
                )}
              </div>
            ))}
          </div>
          <Pagination
            pagination={data}
            prev={() => setPage(page - 1)}
            next={() => setPage(page + 1)}
          />
        </>
      ) : (
        <p>No {type}s found...</p>
      )}
      <ImportStatBlocksForm
        isOpen={importModal.isOpen}
        onClose={() => setImportModal({ isOpen: false })}
        type={type}
      />
      <CreateStatBlockForm
        isOpen={createModal.isOpen}
        onClose={() => {
          setPage(1);
          setCreateModal({ isOpen: false });
        }}
        statBlock={createModal.statBlock}
        type={type}
      />
      <DeleteStatBlockModal
        isOpen={deleteModal.isOpen}
        statBlock={deleteModal.statBlock}
        type={type}
        onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
      />
    </ActionSection>
  );
};
