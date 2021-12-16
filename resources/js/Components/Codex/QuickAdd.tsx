import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";

type Props = {};

const QuickAdd: FC<Props> = (props) => {
  return (
    <div className="flex">
      <input
        type="text"
        placeholder="Quick Add"
        className="form-input w-full h-10 text-sm border-gray-200 rounded-l-md"
      />
      <button
        type="button"
        className="text-purple-600 bg-purple-200 h-10 rounded-r-md w-10 flex justify-center items-center px-4"
      >
        <FontAwesomeIcon icon="plus" />
      </button>
    </div>
  );
};

export default QuickAdd;
