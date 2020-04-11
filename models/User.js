const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  nama_depan: {
    type: String,
    required: true,
  },
  nama_belakang: {
    type: String,
    required: true,
  },
  paspor: {
    type: String,
    required: true,
  },
  kantor_pengeluaran: {
    type: String,
    required: true,
  },
  ponsel: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
  kota_kodepos: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", UserSchema);
