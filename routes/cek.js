const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { check, validationResult } = require("express-validator");

router.get(
  "/",
  [
    check("nama_belakang", "Please include nama belakang").not().isEmpty(),
    check("paspor", "Please include paspor").not().isEmpty(),
  ],
  async (req, res) => {
    res.json({ msg: "hello world" });
  }
);
