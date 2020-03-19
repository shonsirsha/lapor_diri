process.env.NODE_ENV = "test";

const expect = require("chai").expect;
const request = require("supertest");
const server = require("../../../server");
const connectDB = require("../../../config/db.test");

describe("POST /users", async () => {
  before(() => {
    try {
      connectDB();
    } catch (err) {
      console.log(err);
    }
  });

  it("Creating a new user works!", done => {
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
      .then(res => {
        expect(res.body).to.contain.property("token");
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it("nama_depan is required!", done => {
    // no nama_depan
    request(server)
      .post("/api/users")
      .send({
        nama_belakang: "test",
        paspor: "BTEST",
        ponsel: "1111",
        alamat: "Heilmannring 69A",
        kota_kodepos: "Berlin, 13627",
        email: "test@code.berlin",
        password: "1234567"
      })
      .then(res => {
        expect(res.body.errors[0]).to.contain.property("param");
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it("nama_depan is required!", done => {
    // no nama_depan
    request(server)
      .post("/api/users")
      .send({
        // nama_depan: "xa",
        nama_belakang: "sass",
        paspor: "B2183",
        ponsel: "015733592119",
        alamat: "Heilmannring 71sB",
        kota_kodepos: "Berlin, 13627",
        email: "test@code.berlin",
        password: "12345678"
      })
      .then(res => {
        expect(res.body.errors[0]).to.contain.property("param");
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it("nama_belakang is required!", done => {
    // no nama_belakang
    request(server)
      .post("/api/users")
      .send({
        nama_depan: "xa",
        // nama_belakang: "sass",
        paspor: "B2183",
        ponsel: "015733592119",
        alamat: "Heilmannring 71sB",
        kota_kodepos: "Berlin, 13627",
        email: "test@code.berlin",
        password: "12345678"
      })
      .then(res => {
        expect(res.body.errors[0]).to.contain.property("param");
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it("paspor is required!", done => {
    // no paspor
    request(server)
      .post("/api/users")
      .send({
        nama_depan: "xa",
        nama_belakang: "sass",
        // paspor: "B2183",
        ponsel: "015733592119",
        alamat: "Heilmannring 71sB",
        kota_kodepos: "Berlin, 13627",
        email: "test@code.berlin",
        password: "12345678"
      })
      .then(res => {
        expect(res.body.errors[0]).to.contain.property("param");
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it("ponsel is required!", done => {
    // no ponsel
    request(server)
      .post("/api/users")
      .send({
        nama_depan: "xa",
        nama_belakang: "sass",
        paspor: "B2183",
        // ponsel: "015733592119",
        alamat: "Heilmannring 71sB",
        kota_kodepos: "Berlin, 13627",
        email: "test@code.berlin",
        password: "12345678"
      })
      .then(res => {
        expect(res.body.errors[0]).to.contain.property("param");
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it("alamat is required!", done => {
    // no alamat
    request(server)
      .post("/api/users")
      .send({
        nama_depan: "xa",
        nama_belakang: "sass",
        paspor: "B2183",
        ponsel: "015733592119",
        // alamat: "Heilmannring 71sB",
        kota_kodepos: "Berlin, 13627",
        email: "test@code.berlin",
        password: "12345678"
      })
      .then(res => {
        expect(res.body.errors[0]).to.contain.property("param");
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it("kota_kodepos is required!", done => {
    // no kota_kodepos
    request(server)
      .post("/api/users")
      .send({
        nama_depan: "xa",
        nama_belakang: "sass",
        paspor: "B2183",
        ponsel: "015733592119",
        alamat: "Heilmannring 71sB",
        // kota_kodepos: "Berlin, 13627",
        email: "test@code.berlin",
        password: "12345678"
      })
      .then(res => {
        expect(res.body.errors[0]).to.contain.property("param");
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it("email is required!", done => {
    // no kota_kodepos
    request(server)
      .post("/api/users")
      .send({
        nama_depan: "xa",
        nama_belakang: "sass",
        paspor: "B2183",
        ponsel: "015733592119",
        alamat: "Heilmannring 71sB",
        kota_kodepos: "Berlin, 13627",
        // email: "test@code.berlin",
        password: "12345678"
      })
      .then(res => {
        expect(res.body.errors[0]).to.contain.property("param");
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it("password is required!", done => {
    // no password
    request(server)
      .post("/api/users")
      .send({
        nama_depan: "xa",
        nama_belakang: "sass",
        paspor: "B2183",
        ponsel: "015733592119",
        alamat: "Heilmannring 71sB",
        kota_kodepos: "Berlin, 13627",
        email: "test@code.berlin"
        // password: "12345678"
      })
      .then(res => {
        expect(res.body.errors[0]).to.contain.property("param");
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});
