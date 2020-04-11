const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

//@route    POST api/users
//@desc     Register a user
//@access   Public
router.post(
  "/",
  [
    check("nama_depan", "Please include nama depan").not().isEmpty(),
    check("nama_belakang", "Please include nama belakang").not().isEmpty(),
    check("paspor", "Please include paspor").not().isEmpty(),
    check("ponsel", "Please include ponsel").not().isEmpty(),
    check("alamat", "Please include alamat").not().isEmpty(),
    check("kota_kodepos", "Please include kota_kodepos").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({ errors: errors.array() });
    }

    const {
      nama_depan,
      nama_belakang,
      paspor,
      ponsel,
      alamat,
      kota_kodepos,
      email,
      password,
    } = req.body;
    try {
      let user = await User.findOne({ email: email });

      if (user) {
        return res.status(409).json({ msg: "User already exists" });
      }

      user = new User({
        nama_depan: nama_depan,
        nama_belakang: nama_belakang,
        paspor: paspor,
        ponsel: ponsel,
        alamat: alamat,
        kota_kodepos: kota_kodepos,
        email: email,
        password: password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) {
            throw err;
          }

          res.json({ token: token });
        }
      );
    } catch (e) {
      console.log(e.message);
      res.status(500).send("server error" + e.message);
    }
  }
);

module.exports = router;

//@route    PUT api/users/:id
//@desc     Edit a user with id
//@access   Private
router.put("/:id", auth, async (req, res) => {
  const {
    nama_depan,
    nama_belakang,
    paspor,
    ponsel,
    alamat,
    kota_kodepos,
    email,
  } = req.body;

  //build user object
  const userFields = {};
  if (nama_depan) {
    userFields.nama_depan = nama_depan;
  }
  if (nama_belakang) {
    userFields.nama_belakang = nama_belakang;
  }
  if (paspor) {
    userFields.paspor = paspor;
  }
  if (ponsel) {
    userFields.ponsel = ponsel;
  }
  if (kota_kodepos) {
    userFields.kota_kodepos = kota_kodepos;
  }
  if (alamat) {
    userFields.alamat = alamat;
  }
  if (email) {
    userFields.email = email;
  }

  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: userFields,
      },
      { new: true }
    );
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server error");
  }
});
