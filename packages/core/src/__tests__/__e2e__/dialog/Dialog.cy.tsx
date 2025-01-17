import { composeStories } from "@storybook/react";
import * as dialogStories from "@stories/dialog/dialog.stories";

const composedStories = composeStories(dialogStories);

const { Default, Preheader } = composedStories;

describe("GIVEN a Dialog", () => {
  describe("WHEN only header is provided", () => {
    it("THEN it should display a dialog by default", () => {
      cy.mount(<Default />);

      cy.findByRole("button").click();

      cy.findByRole("dialog").should("be.visible");
      cy.get(".saltDialogHeader").should("be.visible");
      cy.get(".saltDialogContent").should("be.visible");
      cy.get(".saltDialogActions").should("be.visible");
    });

    it("THEN it should display the header", () => {
      cy.mount(<Default />);

      cy.findByRole("button").click();

      cy.findByRole("dialog").should("be.visible");
      cy.get(".saltDialogHeader-header").should("be.visible");
    });

    it("THEN it should add the accent class to the title component", () => {
      cy.mount(<Default />);
      cy.findByRole("button").click();
      cy.findByRole("dialog").should("be.visible");
      cy.get(".saltDialogHeader-withAccent").should("exist");
    });

    it("THEN it should display animations by default", () => {
      cy.mount(<Default />);

      cy.findByRole("button").click();

      cy.findByRole("dialog").should("have.class", "saltDialog-enterAnimation");
    });

    it(
      "THEN it should display medium size by default",
      {
        viewportHeight: 900,
        viewportWidth: 1921,
      },
      () => {
        cy.mount(<Default />);

        cy.findByRole("button").click();

        cy.findByRole("dialog").should("have.class", "saltDialog-medium-xl");
      }
    );
  });

  describe("WHEN preheader is provided", () => {
    it("THEN it should display the preheader", () => {
      cy.mount(<Preheader />);

      cy.findByRole("button").click();

      cy.get(".saltDialogHeader-preheader").should("be.visible");
    });
  });

  describe("WHEN disableScrim is provided", () => {
    it("THEN it should not display the scrim", () => {
      cy.mount(<Default disableScrim />);
      cy.findByRole("button").click();
      cy.findByRole("dialog").should("be.visible");
      cy.get(".saltScrim").should("not.exist");
    });
  });

  describe("WHEN disableDismiss is provided", () => {
    it("THEN it should not close when clicking outside the dialog", () => {
      cy.mount(<Default disableDismiss />);
      cy.findByRole("button").click();
      cy.findByRole("dialog").should("be.visible");
      cy.get(".saltScrim").click("left", { force: true });
      cy.findByRole("dialog").should("exist");
    });
  });

  describe("WHEN a size is provided", () => {
    it(
      "THEN it should display the correct size for the respective breakpoint",
      {
        viewportHeight: 900,
        viewportWidth: 1921,
      },
      () => {
        cy.mount(<Default size={"large"} />);

        cy.findByRole("button").click();

        cy.findByRole("dialog").should("have.class", "saltDialog-large-xl");
      }
    );

    it(
      "THEN it should display the correct size for the respective breakpoint",
      {
        viewportHeight: 900,
        viewportWidth: 600,
      },
      () => {
        cy.mount(<Default size={"small"} />);

        cy.findByRole("button").click();

        cy.findByRole("dialog").should("have.class", "saltDialog-small-xs");
      }
    );
  });

  describe("WHEN a Dialog is open", () => {
    it("THEN it should close when the close button is clicked", () => {
      cy.mount(<Default />);

      cy.findByRole("button").click();

      cy.findByRole("dialog").should("be.visible");

      cy.findByLabelText("Close dialog").click();

      cy.findByRole("dialog").should("not.exist");
    });

    it("THEN it should close when the ESC key is pressed", () => {
      cy.mount(<Default />);

      cy.findByRole("button").click();

      cy.findByRole("dialog").should("be.visible");

      cy.realPress("Escape");

      cy.findByRole("dialog").should("not.exist");
    });

    it("THEN it should close when clicking outside the dialog", () => {
      cy.mount(<Default />);
      cy.findByRole("button").click();
      cy.findByRole("dialog").should("be.visible");
      cy.get(".saltScrim").click("left", { force: true });
      cy.findByRole("dialog").should("not.exist");
    });

    it("THEN it should trap focus inside the Dialog", () => {
      cy.mount(<Default />);
      cy.findByRole("button").click();
      cy.findByRole("dialog").should("be.visible");
      cy.findAllByRole("button").eq(0).should("be.focused");
      cy.realPress("Tab");
      cy.findAllByRole("button").eq(1).should("be.focused");
      cy.realPress("Tab");
      cy.findAllByRole("button").eq(2).should("be.focused");
      cy.realPress("Tab");
      cy.findAllByRole("button")
        .eq(3)
        .should("be.focused")
        .should("have.attr", "aria-label", "Close dialog");
      cy.realPress("Tab");
      //back to the first button
      cy.findAllByRole("button").eq(0).should("be.focused");
    });
  });
});
