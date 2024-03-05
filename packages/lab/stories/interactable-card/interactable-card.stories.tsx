import { ChangeEvent, useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import {
  H3,
  Text,
  StackLayout,
  RadioButton,
  RadioButtonGroup,
  Label,
} from "@salt-ds/core";

import {
  InteractableCard,
  InteractableCardGroup,
  InteractableCardProps,
} from "@salt-ds/lab";

import "./interactable-card.stories.css";

export default {
  title: "Lab/Interactable Card",
  component: InteractableCard,
} as Meta<typeof InteractableCard>;

export const Default: StoryFn<typeof InteractableCard> = (args) => (
  <InteractableCard {...args} {...args} style={{ width: "256px" }}>
    <StackLayout gap={1}>
      <H3>Sustainable investing products</H3>
      <Text>
        We have a commitment to provide a wide range of investment solutions to
        enable you to align your financial goals to your values.
      </Text>
    </StackLayout>
  </InteractableCard>
);

export const Disabled: StoryFn<typeof InteractableCard> = (args) => (
  <InteractableCard {...args} style={{ width: "256px" }} disabled accent="top">
    <StackLayout gap={1}>
      <H3 disabled>Sustainable investing products</H3>
      <Text disabled>
        We have a commitment to provide a wide range of investment solutions to
        enable you to align your financial goals to your values.
      </Text>
    </StackLayout>
  </InteractableCard>
);

export const Selected: StoryFn<typeof InteractableCard> = (args) => (
  <InteractableCard {...args} style={{ width: "256px" }} selected accent="top">
    <StackLayout gap={1}>
      <H3>Sustainable investing products</H3>
      <Text>
        We have a commitment to provide a wide range of investment solutions to
        enable you to align your financial goals to your values.
      </Text>
    </StackLayout>
  </InteractableCard>
);

export const SelectedDisabled: StoryFn<typeof InteractableCard> = (args) => (
  <InteractableCard
    {...args}
    style={{ width: "256px" }}
    selected
    disabled
    accent="top"
  >
    <StackLayout gap={1}>
      <H3 disabled>Sustainable investing products</H3>
      <Text disabled>
        We have a commitment to provide a wide range of investment solutions to
        enable you to align your financial goals to your values.
      </Text>
    </StackLayout>
  </InteractableCard>
);

export const AccentPlacement: StoryFn<typeof InteractableCard> = (args) => {
  const [placement, setPlacement] =
    useState<InteractableCardProps["accent"]>("bottom");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlacement(event.target.value as InteractableCardProps["accent"]);
  };
  return (
    <StackLayout style={{ width: "266px" }}>
      <InteractableCard {...args} accent={placement}>
        <StackLayout gap={1}>
          <H3>Sustainable investing products</H3>
          <Text>
            We have a commitment to provide a wide range of investment solutions
            to enable you to align your financial goals to your values.
          </Text>
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

export const Variant: StoryFn<typeof InteractableCard> = (args) => {
  const variants = ["primary", "secondary"] as const;
  return (
    <StackLayout style={{ width: "266px" }}>
      {variants.map((variant) => {
        return (
          <StackLayout align="end">
            <StackLayout direction="row" key={variant}>
              <InteractableCard {...args} variant={variant}>
                <StackLayout gap={1}>
                  <H3>Sustainable investing products</H3>
                  <Text>
                    We have a commitment to provide a wide range of investment
                    solutions to enable you to align your financial goals to
                    your values.
                  </Text>
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

export const InteractableCardGroupSingleSelect: StoryFn<
  typeof InteractableCard
> = (args) => (
  <InteractableCardGroup>
    <InteractableCard {...args} style={{ width: "256px" }}>
      <StackLayout gap={1}>
        <H3>Sustainable investing products</H3>
        <Text>
          We have a commitment to provide a wide range of investment solutions
          to enable you to align your financial goals to your values.
        </Text>
      </StackLayout>
    </InteractableCard>
    <InteractableCard {...args} style={{ width: "256px" }}>
      <StackLayout gap={1}>
        <H3>Sustainable investing products</H3>
        <Text>
          We have a commitment to provide a wide range of investment solutions
          to enable you to align your financial goals to your values.
        </Text>
      </StackLayout>
    </InteractableCard>
  </InteractableCardGroup>
);

export const InteractableCardGroupMultiSelect: StoryFn<
  typeof InteractableCard
> = (args) => (
  <InteractableCardGroup selectionVariant="multiselect">
    <InteractableCard {...args} style={{ width: "256px" }}>
      <StackLayout gap={1}>
        <H3>Sustainable investing products</H3>
        <Text>
          We have a commitment to provide a wide range of investment solutions
          to enable you to align your financial goals to your values.
        </Text>
      </StackLayout>
    </InteractableCard>
    <InteractableCard {...args} style={{ width: "256px" }}>
      <StackLayout gap={1}>
        <H3>Sustainable investing products</H3>
        <Text>
          We have a commitment to provide a wide range of investment solutions
          to enable you to align your financial goals to your values.
        </Text>
      </StackLayout>
    </InteractableCard>
  </InteractableCardGroup>
);

export const InteractableCardGroupWithRadio: StoryFn<
  typeof InteractableCard
> = (args) => (
  <InteractableCardGroup>
    <InteractableCard {...args} style={{ width: "256px" }}>
      <StackLayout gap={1}>
        <H3>Sustainable investing products</H3>
        <Text>
          We have a commitment to provide a wide range of investment solutions
          to enable you to align your financial goals to your values.
        </Text>
      </StackLayout>
    </InteractableCard>
    <InteractableCard {...args} style={{ width: "256px" }}>
      <StackLayout gap={1}>
        <H3>Sustainable investing products</H3>
        <Text>
          We have a commitment to provide a wide range of investment solutions
          to enable you to align your financial goals to your values.
        </Text>
      </StackLayout>
    </InteractableCard>
  </InteractableCardGroup>
);
