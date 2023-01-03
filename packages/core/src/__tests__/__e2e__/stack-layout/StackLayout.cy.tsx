import { composeStories } from "@storybook/testing-react";
import * as stackStories from "@stories/stack-layout.stories";
import { checkAccessibility } from "../../../../../../cypress/tests/checkAccessibility";

const composedStories = composeStories(stackStories);
const { DefaultStackLayout } = composedStories;

describe("GIVEN a Stack", () => {
  checkAccessibility(composedStories);

  describe("WHEN no props are provided", () => {
    it("THEN it should not wrap by default", () => {
      cy.mount(<DefaultStackLayout />);

      cy.get(".saltFlexLayout").should("have.css", "flex-wrap", "nowrap");
    });

    it("THEN it should render with a default gap", () => {
      cy.mount(<DefaultStackLayout />);

      cy.get(".saltFlexLayout").should("have.css", "column-gap", "24px");

      cy.get(".saltFlexLayout").should("have.css", "row-gap", "24px");
    });
  });

  describe("WHEN a separator value is provided", () => {
    it("THEN it should render a separator", () => {
      cy.mount(<DefaultStackLayout separators />);

      cy.get(".saltFlexLayout").should(
        "have.class",
        "saltFlexLayout-separator"
      );
    });
  });
});