const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const checkUserExists = require("./utils/checkUserExists");

router.post(
  "/",
  [
    check("nama_belakang", "Please include nama belakang").not().isEmpty(),
    check("paspor", "Please include paspor").not().isEmpty(),
  ],
  async (req, res) => {
    const { nama_belakang, paspor } = req.body;
    try {
      let user = await checkUserExists("paspor", paspor);
      if (user) {
        if (
          user.nama_belakang.toUpperCase() === nama_belakang &&
          user.paspor.toUpperCase() === paspor
        ) {
          res.status(200).json({ msg: "Registered", status: user.status });
        }
      }

      res.status(404).json({ msg: "not found" });
    } catch (e) {
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
