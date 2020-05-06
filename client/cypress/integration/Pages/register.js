describe("register page", () => {
  it("Should register successfully", () => {
    cy.visit("http://localhost:3000/register");
    cy.get('input[name="nama_depan"]').should("exist").type("Test");
    cy.get('input[name="nama_belakang"]').should("exist").type("Cypress");
    cy.get('input[name="email"]').should("exist").type("cypress@mail.com");
    cy.get('input[name="password"]').should("exist").type("cypress123456");
    cy.get('input[name="paspor"]').should("exist").type("C0412000");
    cy.get('input[name="kantor_pengeluaran"]').should("exist").type("Jakarta");
    cy.get('input[name="ponsel"]').should("exist").type("018393775135");
    cy.get('input[name="alamat"]').should("exist").type("Edisonstraße 18");
    cy.get('input[name="kota_kodepos"]').should("exist").type("Berlin, 18724");
    cy.get(".btn-success").should("exist").click();
    cy.url().should("eq", "http://localhost:3000/");
  });
  it("should fail to register - email already exist", () => {
    cy.visit("http://localhost:3000/register");
    cy.get('input[name="nama_depan"]').should("exist").type("Test");
    cy.get('input[name="nama_belakang"]').should("exist").type("Cypress");
    cy.get('input[name="email"]').should("exist").type("seangeekpro@gmail.com");
    cy.get('input[name="password"]').should("exist").type("cypress123456");
    cy.get('input[name="paspor"]').should("exist").type("C0412000");
    cy.get('input[name="kantor_pengeluaran"]').should("exist").type("Jakarta");
    cy.get('input[name="ponsel"]').should("exist").type("018393775135");
    cy.get('input[name="alamat"]').should("exist").type("Edisonstraße 18");
    cy.get('input[name="kota_kodepos"]').should("exist").type("Berlin, 18724");
    cy.get(".btn-success").should("exist").click();
    cy.contains("Email telah digunakan");
  });

  it("should fail to register - passport number already exist", () => {
    cy.visit("http://localhost:3000/register");
    cy.get('input[name="nama_depan"]').should("exist").type("Test");
    cy.get('input[name="nama_belakang"]').should("exist").type("Cypress");
    cy.get('input[name="email"]').should("exist").type("test@testest.com");
    cy.get('input[name="password"]').should("exist").type("cypress123456");
    cy.get('input[name="paspor"]').should("exist").type("B19382");
    cy.get('input[name="kantor_pengeluaran"]').should("exist").type("Jakarta");
    cy.get('input[name="ponsel"]').should("exist").type("018393775135");
    cy.get('input[name="alamat"]').should("exist").type("Edisonstraße 18");
    cy.get('input[name="kota_kodepos"]').should("exist").type("Berlin, 18724");
    cy.get(".btn-success").should("exist").click();
    cy.contains("Nomor paspor telah digunakan");
  });
});
