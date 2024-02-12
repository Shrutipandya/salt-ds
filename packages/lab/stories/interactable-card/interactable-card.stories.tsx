import { ChangeEvent, useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import {
  Card,
  H3,
  Text,
  StackLayout,
  RadioButton,
  RadioButtonGroup,
  Label,
} from "@salt-ds/core";

import { InteractableCard, InteractableCardProps } from "@salt-ds/lab";

import "./interactable-card.stories.css";

export default {
  title: "Lab/Interactable Card",
  component: InteractableCard,
} as Meta<typeof InteractableCard>;

const exampleData = {
  title: "Sustainable investing products",
  content:
    "We have a commitment to provide a wide range of investment solutions to enable you to align your financial goals to your values.",
};

export const Default: StoryFn<typeof Card> = () => (
  <InteractableCard style={{ width: "256px" }}>
    <StackLayout gap={1}>
      <H3>{exampleData.title}</H3>
      <Text>{exampleData.content}</Text>
    </StackLayout>
  </InteractableCard>
);

export const Disabled: StoryFn<typeof Card> = () => (
  <InteractableCard style={{ width: "256px" }} className="withImage" disabled>
    <StackLayout gap={1} style={{ padding: "var(--salt-spacing-300)" }}>
      <H3 disabled>{exampleData.title}</H3>
      <Text disabled>{exampleData.content}</Text>
    </StackLayout>
  </InteractableCard>
);

export const Selected: StoryFn<typeof Card> = () => (
  <InteractableCard style={{ width: "256px" }} selected>
    <StackLayout gap={1}>
      <H3>{exampleData.title}</H3>
      <Text>{exampleData.content}</Text>
    </StackLayout>
  </InteractableCard>
);

export const SelectedDisabled: StoryFn<typeof Card> = () => (
  <InteractableCard style={{ width: "256px" }} selected disabled>
    <StackLayout gap={1}>
      <H3 disabled>{exampleData.title}</H3>
      <Text disabled>{exampleData.content}</Text>
    </StackLayout>
  </InteractableCard>
);

export const AccentPlacement: StoryFn<typeof Card> = () => {
  const [placement, setPlacement] =
    useState<InteractableCardProps["accentPlacement"]>("bottom");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlacement(
      event.target.value as InteractableCardProps["accentPlacement"]
    );
  };
  return (
    <StackLayout style={{ width: "266px" }}>
      <InteractableCard accentPlacement={placement}>
        <StackLayout gap={1}>
          <H3>{exampleData.title}</H3>
          <Text>{exampleData.content}</Text>
        </StackLayout>
      </InteractableCard>
      <RadioButtonGroup direction={"horizontal"} defaultValue="bottom">
        <RadioButton
          key="bottom"
          label="bottom"
          value="bottom"
          onChange={handleChange}
          checked
        />
        <RadioButton
          key="top"
          label="top"
          value="top"
          onChange={handleChange}
        />
        <RadioButton
          key="left"
          label="left"
          value="left"
          onChange={handleChange}
        />
        <RadioButton
          key="right"
          label="right"
          value="right"
          onChange={handleChange}
        />
      </RadioButtonGroup>
    </StackLayout>
  );
};

export const Size: StoryFn<typeof Card> = () => {
  const sizes = ["small", "medium", "large"] as const;
  return (
    <StackLayout style={{ width: "266px" }}>
      {sizes.map((size) => {
        return (
          <StackLayout key={size} align="end">
            <StackLayout direction="row">
              <InteractableCard size={size}>
                <StackLayout gap={1}>
                  <H3>{exampleData.title}</H3>
                  <Text>{exampleData.content}</Text>
                </StackLayout>
              </InteractableCard>
            </StackLayout>
            <Label>Size: {size}</Label>
          </StackLayout>
        );
      })}
    </StackLayout>
  );
};

export const Variant: StoryFn<typeof Card> = () => {
  const variants = ["primary", "secondary"] as const;
  return (
    <StackLayout style={{ width: "266px" }}>
      {variants.map((variant) => {
        return (
          <StackLayout align="end">
            <StackLayout direction="row" key={variant}>
              <InteractableCard variant={variant}>
                <StackLayout gap={1}>
                  <H3>{exampleData.title}</H3>
                  <Text>{exampleData.content}</Text>
                </StackLayout>
              </InteractableCard>
            </StackLayout>
            <Label>Variant: {variant}</Label>
          </StackLayout>
        );
      })}
    </StackLayout>
  );
};
