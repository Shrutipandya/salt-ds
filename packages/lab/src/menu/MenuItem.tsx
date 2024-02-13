import { useListItem, useFloatingTree, useMergeRefs } from "@floating-ui/react";
import {
  forwardRef,
  ButtonHTMLAttributes,
  MouseEvent,
  FocusEvent,
  ReactNode,
} from "react";
import { useMenuContext } from "./MenuContext";
import { clsx } from "clsx";
import { makePrefixer } from "@salt-ds/core";
import { useWindow } from "@salt-ds/window";
import { useComponentCssInjection } from "@salt-ds/styles";

import menuItemCss from "./MenuItem.css";
const withBaseName = makePrefixer("saltMenuItem");

interface MenuItemProps {
  label: ReactNode;
  disabled?: boolean;
}

export const MenuItem = forwardRef<
  HTMLDivElement,
  MenuItemProps & ButtonHTMLAttributes<HTMLDivElement>
>(function MenuItem({ label, disabled, className, ...props }, forwardedRef) {
  const menu = useMenuContext();
  const item = useListItem({ label: disabled ? null : label?.toString() });
  const tree = useFloatingTree();
  const isActive = item.index === menu.activeIndex;

  const targetWindow = useWindow();
  useComponentCssInjection({
    testId: "salt-menu-item",
    css: menuItemCss,
    window: targetWindow,
  });

  const itemProps = !disabled && {
    ...menu.getItemProps({
      onClick(event: MouseEvent<HTMLDivElement>) {
        props.onClick?.(event);
        tree?.events.emit("click");
      },
      onFocus(event: FocusEvent<HTMLDivElement>) {
        props.onFocus?.(event);
        menu.setHasFocusInside(true);
      },
    }),
  };

  console.log("itemProps", label, { ...itemProps });

  return (
    <div
      {...props}
      ref={useMergeRefs([item.ref, forwardedRef])}
      role="menuitem"
      className={clsx(
        withBaseName(),
        { [withBaseName("disabled")]: disabled },
        className
      )}
      tabIndex={isActive ? 0 : -1}
      {...itemProps}
    >
      {label}
    </div>
  );
});
