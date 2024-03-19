import {
  forwardRef,
  MouseEvent,
  KeyboardEvent,
  ComponentPropsWithoutRef,
  SyntheticEvent,
  ChangeEvent,
} from "react";
import { clsx } from "clsx";
import { useWindow } from "@salt-ds/window";
import { useComponentCssInjection } from "@salt-ds/styles";
import { capitalize, makePrefixer, useControlled } from "@salt-ds/core";
import { useInteractableCard } from "./useInteractableCard";
import interactableCardCss from "./InteractableCard.css";
import {
  InteractableCardValue,
  useInteractableCardGroup,
} from "./InteractableCardGroupContext";

const withBaseName = makePrefixer("saltInteractableCard");

export interface InteractableCardProps
  extends ComponentPropsWithoutRef<"input"> {
  /**
   * Accent border position: defaults to "bottom"
   */
  accent?: "bottom" | "top" | "left" | "right";
  /**
   * If `true`, the card will be disabled.
   */
  disabled?: boolean;
  /**
   * If `true`, the card will have selected styling.
   */
  selected?: boolean;
  /**
   * Callback fired when the selection changes.
   * @param event
   */
  onChange?: (event: SyntheticEvent<HTMLInputElement>) => void;
  /**
   * Styling variant; defaults to "primary".
   */
  variant?: "primary" | "secondary";
  /**
   * Value of card (for selectable use case).
   */
  value?: InteractableCardValue;
}

export const InteractableCard = forwardRef<
  HTMLInputElement,
  InteractableCardProps
>(function InteractableCard(props, ref) {
  const {
    accent,
    children,
    className,
    disabled: disabledProp,
    selected: selectedProp,
    variant = "primary",
    value,
    onBlur,
    onChange,
    onClick,
    onKeyUp,
    onKeyDown,
    ...rest
  } = props;

  const targetWindow = useWindow();
  useComponentCssInjection({
    testId: "salt-interactable-card",
    css: interactableCardCss,
    window: targetWindow,
  });

  const interactableCardGroup = useInteractableCardGroup();

  const interactableCardGroupSelected = interactableCardGroup
    ? interactableCardGroup.isSelected(value)
    : selectedProp;

  const disabled = interactableCardGroup?.disabled || disabledProp;

  const [selected, setSelected] = useControlled({
    controlled: interactableCardGroupSelected,
    default: Boolean(selectedProp),
    name: "InteractableCard",
    state: "selected",
  });

  const role = interactableCardGroup
    ? interactableCardGroup.selectionVariant === "multiselect"
      ? "checkbox"
      : "radio"
    : "button";

  const ariaChecked =
    role === "radio" || role === "checkbox" ? selected : undefined;

  const handleClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (interactableCardGroup) {
      interactableCardGroup.select(event);
      setSelected(!selected);
    }
    onChange?.(event);
    // onClick?.(event);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (interactableCardGroup) {
        interactableCardGroup.select(event);
        setSelected(!selected);
      }
      onChange?.(event);
      onKeyDown?.(event);
    }
  };

  // const { active, cardProps } = useInteractableCard({
  //   disabled,
  //   onKeyUp,
  //   onKeyDown: handleKeyDown,
  //   onBlur,
  //   onClick,
  // });

  return (
    <div
      // {...cardProps}
      data-id={value}
      aria-disabled={disabled}
      data-value={value}
      className={clsx(
        withBaseName(),
        withBaseName(variant),
        {
          [withBaseName("accent")]: accent,
          [withBaseName(`accent${capitalize(accent || "")}`)]: accent,
          // [withBaseName("active")]: active,
          [withBaseName("disabled")]: disabled,
          [withBaseName("selected")]: selected,
        },
        className
      )}
      {...rest}
    >
      <input
        type={role}
        checked={ariaChecked}
        onChange={interactableCardGroup ? handleClick : onClick}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        value={value}
        aria-checked={selected}
        style={{ display: "none" }} // Hide the input visually but keep it in the DOM for accessibility
        ref={ref}
      />
      {children}
    </div>
  );
});
