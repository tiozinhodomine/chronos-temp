import React from "react";
import style from "./container.module.css";

type ContainerProps = {
  children: React.ReactNode;
};

export function Container({ children }: ContainerProps) {
  return (
    <div className={style.containerFluid}>
      <div className={style.container}>
        <div className={style.content}>{children}</div>
      </div>
    </div>
  );
}