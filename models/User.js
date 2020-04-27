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
  status: {
    type: Number,
    required: true,
    default: 0,
  },
  melde_pic: {
    type: String,
    required: false,
  },
  paspor_pic: {
    type: String,
    required: false,
  },

  refresh_tokens: {
    type: [],
    required: false,
  },
  password_reset_expr: {
    type: Number,
    default: -1,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", UserSchema);
