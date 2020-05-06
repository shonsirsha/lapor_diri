describe("navbar component", () => {
  it("Should go to login page by clicking login link", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-cy-login-link]").should("exist").click();
    cy.url().should("include", "/login"); // => true
  });

  it("Should go to login page by clicking login link", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-cy-register-link]").should("exist").click();
    cy.url().should("include", "/register"); // => true
  });

  it("Should go to homepage (/)", () => {
    cy.visit("http://localhost:3000");
    cy.get(".navbar-brand").should("exist").click();
    cy.url().should("eq", "http://localhost:3000/"); // => true
  });
});
