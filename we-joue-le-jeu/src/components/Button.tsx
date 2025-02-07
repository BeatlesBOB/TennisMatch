import { FC, HTMLAttributes } from "react";

export const Button: FC<HTMLAttributes<HTMLButtonElement>> = ({
  children,
  className = "",
  ...attr
}) => {
  return (
    <button
      {...attr}
      className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${className}`}
    >
      {children}
    </button>
  );
};
