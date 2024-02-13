import { Meta, StoryFn } from "@storybook/react";
import { QAContainer, QAContainerProps } from "docs/components";
import { Menu, MenuItem } from "@salt-ds/lab";

export default {
  title: "Lab/Menu/Menu QA",
  component: Menu,
} as Meta;

export const AllExamples: StoryFn<QAContainerProps> = () => (
  <QAContainer transposeDensity itemPadding={24}>
    <Menu label="Click">
      <MenuItem label="Copy" />
      <MenuItem label="Paste" />
      <MenuItem label="Export" />
      <MenuItem label="Settings" />
    </Menu>
  </QAContainer>
);

AllExamples.parameters = {
  chromatic: { disableSnapshot: false },
};
