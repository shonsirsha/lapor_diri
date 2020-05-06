describe("check registration status page", () => {
  it("Should return user has been registered completely (GREEN)", () => {
    cy.visit("http://localhost:3000/cek-registrasi");
    cy.get('input[name="nama_belakang"]').should("exist").type("Liesanggoro");
    cy.get('input[name="paspor"]').should("exist").type("B19382");
    cy.get("form").submit();
    cy.contains("Anda sudah lapor diri");
  });

  it("Should return user has registered, but not has not completed it yet (YELLOW)", () => {
    cy.visit("http://localhost:3000/cek-registrasi");
    cy.get('input[name="nama_belakang"]').should("exist").type("Tester");
    cy.get('input[name="paspor"]').should("exist").type("TESTPASPOR");
    cy.get("form").submit();
    cy.contains("Anda telah terdaftar namun data Anda belum lengkap");
  });

  it("Should return user has not registered yet (RED)", () => {
    cy.visit("http://localhost:3000/cek-registrasi");
    cy.get('input[name="nama_belakang"]').should("exist").type("nouser");
    cy.get('input[name="paspor"]').should("exist").type("00000000");
    cy.get("form").submit();
    cy.contains("Anda belum terdaftar");
  });
});
