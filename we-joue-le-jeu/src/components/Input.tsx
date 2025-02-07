import { FC, InputHTMLAttributes } from "react";

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className = "",
  ...attr
}) => {
  return (
    <input
      {...attr}
      className={`border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
};
