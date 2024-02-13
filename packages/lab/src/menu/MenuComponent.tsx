import {
  useFloatingTree,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useListItem,
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  useHover,
  safePolygon,
  useClick,
  useRole,
  useDismiss,
  useListNavigation,
  useTypeahead,
  useInteractions,
  FloatingNode,
  useMergeRefs,
  FloatingList,
  FloatingPortal,
  FloatingFocusManager,
} from "@floating-ui/react";
import {
  FocusEvent,
  forwardRef,
  HTMLProps,
  useState,
  useRef,
  useEffect,
} from "react";
import { MenuContext, useMenuContext } from "./MenuContext";
import { MenuProps } from "./Menu";
import { makePrefixer } from "@salt-ds/core";
import { useWindow } from "@salt-ds/window";
import { useComponentCssInjection } from "@salt-ds/styles";

import menuComponentCss from "./MenuComponent.css";
import { clsx } from "clsx";
import { ChevronRightIcon } from "@salt-ds/icons";
const withBaseName = makePrefixer("saltMenuComponent");

export const MenuComponent = forwardRef<
  HTMLDivElement,
  MenuProps & HTMLProps<HTMLDivElement>
>(function MenuComponent({ children, label, ...props }, forwardedRef) {
  const targetWindow = useWindow();
  useComponentCssInjection({
    testId: "salt-menu-compnent",
    css: menuComponentCss,
    window: targetWindow,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [hasFocusInside, setHasFocusInside] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const labelsRef = useRef<(string | null)[]>([]);
  const parent = useMenuContext();

  const tree = useFloatingTree();
  const nodeId = useFloatingNodeId();
  const parentId = useFloatingParentNodeId();
  const item = useListItem();

  const isNested = parentId != null;

  const { floatingStyles, refs, context } = useFloating<HTMLDivElement>({
    nodeId,
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: isNested ? "right-start" : "bottom-start",
    middleware: [
      offset({ mainAxis: isNested ? 0 : 4, alignmentAxis: isNested ? -4 : 0 }),
      flip(),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, {
    enabled: isNested,
    delay: { open: 75 },
    handleClose: safePolygon({ blockPointerEvents: true }),
  });
  const click = useClick(context, {
    event: "mousedown",
    toggle: !isNested,
    ignoreMouse: isNested,
  });
  const role = useRole(context, { role: "menu" });
  const dismiss = useDismiss(context, { bubbles: true });
  const listNavigation = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    nested: isNested,
    onNavigate: setActiveIndex,
  });
  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    onMatch: isOpen ? setActiveIndex : undefined,
    activeIndex,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [hover, click, role, dismiss, listNavigation, typeahead]
  );

  // Event emitter allows you to communicate across tree components.
  // This effect closes all menus when an item gets clicked anywhere
  // in the tree.
  useEffect(() => {
    if (!tree) return;

    function handleTreeClick() {
      setIsOpen(false);
    }

    function onSubMenuOpen(event: { nodeId: string; parentId: string }) {
      if (event.nodeId !== nodeId && event.parentId === parentId) {
        setIsOpen(false);
      }
    }

    tree.events.on("click", handleTreeClick);
    tree.events.on("menuopen", onSubMenuOpen);

    return () => {
      tree.events.off("click", handleTreeClick);
      tree.events.off("menuopen", onSubMenuOpen);
    };
  }, [tree, nodeId, parentId]);

  useEffect(() => {
    if (isOpen && tree) {
      tree.events.emit("menuopen", { parentId, nodeId });
    }
  }, [tree, isOpen, nodeId, parentId]);

  const nodeRef = useMergeRefs([refs.setReference, item.ref, forwardedRef]);

  return (
    <FloatingNode id={nodeId}>
      {isNested ? (
        <div
          ref={nodeRef}
          tabIndex={
            !isNested ? undefined : parent.activeIndex === item.index ? 0 : -1
          }
          role={isNested ? "menuitem" : undefined}
          data-open={isOpen ? "" : undefined}
          data-nested={isNested ? "" : undefined}
          data-focus-inside={hasFocusInside ? "" : undefined}
          className={isNested ? withBaseName("item") : withBaseName("root")}
          {...getReferenceProps(
            parent.getItemProps({
              ...props,
              onFocus(event: FocusEvent<HTMLDivElement>) {
                props.onFocus?.(event);
                setHasFocusInside(false);
                parent.setHasFocusInside(true);
              },
            })
          )}
        >
          {label}
          {isNested && (
            <span aria-hidden style={{ marginLeft: 10, fontSize: 10 }}>
              <ChevronRightIcon />
            </span>
          )}
        </div>
      ) : (
        <div
          ref={nodeRef}
          tabIndex={
            !isNested ? undefined : parent.activeIndex === item.index ? 0 : -1
          }
          role={isNested ? "menuitem" : undefined}
          data-open={isOpen ? "" : undefined}
          data-nested={isNested ? "" : undefined}
          data-focus-inside={hasFocusInside ? "" : undefined}
          className={isNested ? withBaseName("item") : withBaseName("root")}
          {...getReferenceProps(
            parent.getItemProps({
              ...props,
              onFocus(event: FocusEvent<HTMLDivElement>) {
                props.onFocus?.(event);
                setHasFocusInside(false);
                parent.setHasFocusInside(true);
              },
            })
          )}
        >
          {label}
          {isNested && (
            <span aria-hidden style={{ marginLeft: 10, fontSize: 10 }}>
              <ChevronRightIcon />
            </span>
          )}
        </div>
      )}
      <MenuContext.Provider
        value={{
          activeIndex,
          setActiveIndex,
          getItemProps,
          setHasFocusInside,
          isOpen,
        }}
      >
        <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
          {isOpen && (
            <FloatingPortal>
              <FloatingFocusManager
                context={context}
                modal={false}
                initialFocus={isNested ? -1 : 0}
                returnFocus={!isNested}
              >
                <div
                  ref={refs.setFloating}
                  className={clsx(withBaseName())}
                  style={floatingStyles}
                  {...getFloatingProps()}
                >
                  {children}
                </div>
              </FloatingFocusManager>
            </FloatingPortal>
          )}
        </FloatingList>
      </MenuContext.Provider>
    </FloatingNode>
  );
});
