import { forwardRef } from "react";

import styles from "./styles.module.css";

type DefaultInputProps = {
  id: string;
  labelText?: string;
} & React.ComponentProps<"input">;

export const DefaultInput = forwardRef<
  HTMLInputElement,
  DefaultInputProps
>(function DefaultInput(
  { id, type, labelText, ...rest },
  ref,
) {
  return (
    <div>
      {labelText && (
        <label htmlFor={id}>
          {labelText}
        </label>
      )}

      <input
        ref={ref}
        id={id}
        type={type}
        className={styles.input}
        {...rest}
      />
    </div>
  );
});