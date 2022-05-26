import * as React from "react";
import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";

export const JetInput = forwardRef<
  HTMLInputElement,
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>((props, ref) => (
  <input
    {...props}
    ref={ref}
    className={clsx(
      "h-10 border-gray-300 focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 rounded-md",
      props.className
    )}
  />
));
