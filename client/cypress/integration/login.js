describe("login", () => {
  it("Logs in successfully", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("#email").should("exist").type("test@testing.com");
    cy.get("#password").should("exist").type("test123456");
    cy.get("[data-cy-login-btn]").should("exist").click();
  });
  it("Failed login", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("#email").should("exist").type("email@doesntexist.com"); // this user doesnt exist
    cy.get("#password").should("exist").type("0000000000");
    cy.get("[data-cy-login-btn]").should("exist").click();
    cy.contains("Akun tidak dapat ditemukan");
  });
});
