const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const checkUserExists = require("./checkUserExists");

router.get(
  "/",
  [
    check("nama_belakang", "Please include nama belakang").not().isEmpty(),
    check("paspor", "Please include paspor").not().isEmpty(),
  ],
  async (req, res) => {
    const { nama_belakang, paspor } = req.body;
    let user = await checkUserExists("paspor", paspor);
    if (user) {
      if (user.nama_belakang === nama_belakang) {
        res.json({ msg: "Registered", status: user.status });
      }
      res.status(404).json({ msg: "not found" });
    }

    res.status(404).json({ msg: "not found" });
  }
);

module.exports = router;
