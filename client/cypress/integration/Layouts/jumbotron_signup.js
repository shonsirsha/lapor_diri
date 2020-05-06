describe("jumbotron signup component", () => {
  it("Should go to register page by clicking on button", () => {
    cy.visit("http://localhost:3000/login");
    cy.get(".btn-success").should("exist").click();
    cy.url().should("include", "/register"); // => true
  });
});
