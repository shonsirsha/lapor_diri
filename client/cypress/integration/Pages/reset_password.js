describe("reset password page (request)", () => {
  it("Should return reset password link has been sent", () => {
    cy.visit("http://localhost:3000/reset-kata-sandi");
    cy.get('input[name="email"]').should("exist").type("seangeekpro@gmail.com");

    cy.get("form").submit();
    cy.wait(3000);
    cy.contains(
      "Link untuk me-reset kata sandi telah terkirim. Mohon cek kembali kotak masuk Email Anda."
    );
  });

  it("Should return email can't be found (RED)", () => {
    cy.visit("http://localhost:3000/reset-kata-sandi");
    cy.get('input[name="email"]').should("exist").type("doesntexist@mail.com");
    cy.get("form").submit();
    cy.contains("Email tidak dapat ditemukan");
  });
});
