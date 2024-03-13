/// <reference types="cypress" />

describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Log to home page", () => {
    cy.visit("http://localhost:5173/home");
  });
});
