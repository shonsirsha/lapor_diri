const expect = require("chai").expect;
const request = require("supertest");
const server = require("../../../server");
const connectDB = require("../../../config/db");

describe("POST /users", async () => {
  before(async () => {
    try {
      await connectDB();
    } catch (err) {
      console.log(err);
    }
  });

  it("OK, Creating a new user works!", done => {
    request(server)
      .post("/api/users")
      .send({
        nama_depan: "sean",
        nama_belakang: "test",
        paspor: "BTEST",
        ponsel: "1111",
        alamat: "Heilmannring 69A",
        kota_kodepos: "Berlin, 13627",
        email: "test@code.berlin",
        password: "1234567"
      })
      .end((e, res) => {
        try {
          expect(res.body).to.contain.property("token");
          done();
        } catch (e) {
          done(e);
        }
      });
  });
});
