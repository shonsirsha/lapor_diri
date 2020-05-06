describe("navbar component", () => {
  it("Should go to login page by clicking login link", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-cy-login-link]").should("exist").click();
    cy.get(".card-title").contains("Masuk");
  });

  it("Should go to login page by clicking login link", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-cy-register-link]").should("exist").click();
    cy.get("[data-cy-title]").contains("Formulir Layanan Mandiri");
  });
});
