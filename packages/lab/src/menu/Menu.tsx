import { useFloatingParentNodeId, FloatingTree } from "@floating-ui/react";
import { forwardRef, HTMLProps, ReactNode } from "react";
import { MenuComponent } from "./MenuComponent";
import clsx from "clsx";
import { makePrefixer } from "@salt-ds/core";
import { useWindow } from "@salt-ds/window";
import { useComponentCssInjection } from "@salt-ds/styles";

import menuCss from "./Menu.css";
const withBaseName = makePrefixer("saltMenu");
export interface MenuProps {
  label: ReactNode;
  nested?: boolean;
  children?: ReactNode;
}

export const Menu = forwardRef<
  HTMLDivElement,
  MenuProps & HTMLProps<HTMLDivElement>
>(function Menu({ className, ...restProps }, ref) {
  const targetWindow = useWindow();
  useComponentCssInjection({
    testId: "salt-menu",
    css: menuCss,
    window: targetWindow,
  });

  const parentId = useFloatingParentNodeId();

  if (parentId === null) {
    return (
      <FloatingTree>
        <MenuComponent
          className={clsx(withBaseName(), withBaseName("item"), className)}
          {...restProps}
          ref={ref}
        />
      </FloatingTree>
    );
  }

  return (
    <MenuComponent
      className={clsx(withBaseName(), withBaseName("item"), className)}
      {...restProps}
      ref={ref}
    />
  );
});
