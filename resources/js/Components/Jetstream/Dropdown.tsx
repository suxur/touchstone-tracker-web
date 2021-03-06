import * as React from "react";
import { PropsWithChildren, useState } from "react";
import { Transition } from "@headlessui/react";
import clsx from "clsx";

interface Props {
  align?: string;
  width?: string | number;
  contentClasses?: string;

  renderTrigger(): JSX.Element;
}

export const JetDropdown = ({
  align = "right",
  width = "48",
  contentClasses = "py-1 bg-white",
  renderTrigger,
  children,
}: PropsWithChildren<Props>) => {
  const [open, setOpen] = useState(false);

  const widthClass = {
    48: "w-48",
  }[width.toString()];

  const alignmentClasses = (() => {
    if (align === "left") {
      return "origin-top-left left-0";
    }

    if (align === "right") {
      return "origin-top-right right-0";
    }

    return "origin-top";
  })();

  return (
    <div className="relative">
      <div onClick={() => setOpen(!open)}>{renderTrigger()}</div>
      <Transition
        show={open}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div
          className={clsx(
            "absolute mt-2 rounded-md shadow-lg",
            widthClass,
            alignmentClasses
          )}
          onClick={() => setOpen(false)}
        >
          <div
            className={clsx(
              "z-50 rounded-md ring-1 ring-black ring-opacity-5",
              contentClasses
            )}
          >
            {children}
          </div>
        </div>
      </Transition>
    </div>
  );
};
