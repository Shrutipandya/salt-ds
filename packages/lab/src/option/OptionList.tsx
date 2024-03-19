import { forwardRef } from "react";
import { clsx } from "clsx";
import {
  makePrefixer,
  useFloatingComponent,
  FloatingComponentProps,
} from "@salt-ds/core";
import { OptionListBase } from "./OptionListBase";

export interface OptionListProps extends FloatingComponentProps {
  collapsed?: boolean;
}

const withBaseName = makePrefixer("saltOptionList");

export const OptionList = forwardRef<HTMLDivElement, OptionListProps>(
  function OptionList(props, ref) {
    const { children, className, collapsed, open, ...rest } = props;

    const { Component: FloatingComponent } = useFloatingComponent();

    return (
      <FloatingComponent
        className={clsx(
          withBaseName(),
          {
            [withBaseName("collapsed")]: collapsed,
          },
          className
        )}
        role="listbox"
        open={open}
        {...rest}
        ref={ref}
      >
        <OptionListBase>{children}</OptionListBase>
      </FloatingComponent>
    );
  }
);
