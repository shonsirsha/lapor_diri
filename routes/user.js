const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const checkUserExists = require("./utils/checkUserExists");
const generateAccessToken = require("./utils/generateAccessToken");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

//@route    POST api/user
//@desc     Register a user
//@access   Public
router.post(
  "/",
  [
    check("nama_depan", "Please include nama depan").not().isEmpty(),
    check("nama_belakang", "Please include nama belakang").not().isEmpty(),
    check("paspor", "Please include paspor").not().isEmpty(),
    check("kantor_pengeluaran", "Please include kantor_pengeluaran")
      .not()
      .isEmpty(),
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
      return res.status(400).json({ msg: errors.array() });
    } // checking if any required field is incomplete (from user)

    const {
      nama_depan,
      nama_belakang,
      paspor,
      kantor_pengeluaran,
      ponsel,
      alamat,
      kota_kodepos,
      email,
      password,
    } = req.body; // destructuring request body

    try {
      let user = await checkUserExists("email", email);
      if (user) {
        return res.status(409).json({ msg: "Email has been used" }); //checks if email alr exist in db
      }
      user = await checkUserExists("paspor", paspor);
      if (user) {
        return res.status(409).json({ msg: "Passport number has been used" }); // checks if passport alr exist in db
      }

      user = new User({
        nama_depan: nama_depan,
        nama_belakang: nama_belakang,
        paspor: paspor,
        kantor_pengeluaran: kantor_pengeluaran,
        ponsel: ponsel,
        alamat: alamat,
        kota_kodepos: kota_kodepos,
        email: email,
        password: password,
        melde_pic: "",
        paspor_pic: "",
      }); // creating a new user based on User model

      const salt = await bcrypt.genSalt(10); //generating salt for password hashing
      user.password = await bcrypt.hash(password, salt); // hashing the password
      await user.save(); // saves a new user to db

      const payload = {
        user: {
          id: user.id,
        },
      }; // payload taken from _id generated in the db

      const token = generateAccessToken(payload); // new access token

      const refresh_token = jwt.sign(payload, config.get("jwtSecret")); // new refresh token

      user.refresh_tokens.push(refresh_token); // creating an array of refresh tokens and pushed a the new refresh token value into it

      await user.save(); // saving the refresh token to an array field of that user in db

      res.json({
        token: token,
        refresh_token: refresh_token,
        userId: user._id,
      });
    } catch (e) {
      res.status(500).send("server error " + e.message);
    }
  }
);

//@route    PUT api/user/:id
//@desc     Edit a user with id
//@access   Private
router.put("/:id", auth, async (req, res) => {
  const {
    nama_depan,
    nama_belakang,
    paspor,
    kantor_pengeluaran,
    ponsel,
    alamat,
    kota_kodepos,
    email,
  } = req.body;

  //build user object
  const userField = {};
  if (nama_depan) {
    userField.nama_depan = nama_depan;
  }
  if (nama_belakang) {
    userField.nama_belakang = nama_belakang;
  }
  if (paspor) {
    userField.paspor = paspor;
  }
  if (kantor_pengeluaran) {
    userField.kantor_pengeluaran = kantor_pengeluaran;
  }
  if (ponsel) {
    userField.ponsel = ponsel;
  }
  if (kota_kodepos) {
    userField.kota_kodepos = kota_kodepos;
  }
  if (alamat) {
    userField.alamat = alamat;
  }
  if (email) {
    userField.email = email;
  }

  try {
    let user = await checkUserExists("_id", req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: userField,
      },
      { new: true }
    );
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server error");
  }
});

//@route    PUT api/user/change-password/:id
//@desc     Edit a user's password with id
//@access   Private
router.put(
  "/change-password/:id",
  auth,
  [
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { password } = req.body;

    const salt = await bcrypt.genSalt(10);

    const userField = {};
    userField.password = await bcrypt.hash(password, salt);

    try {
      let user = await checkUserExists("_id", req.params.id);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: userField,
        },
        { new: true }
      );
      res.status(200).json(user);
    } catch (e) {
      res.status(500).send("Server error");
    }
  }
);

//@route    POST api/user/upload-document/:id
//@desc     Upload a document by userid
//@access   Private

router.post("/upload-document/:id", auth, async (req, res) => {
  const { docUrl, docName } = req.body;
  const userField = {};
  let status = 0;
  if (docName === "paspor") {
    userField.paspor_pic = docUrl;
  }

  if (docName === "melde") {
    userField.melde_pic = docUrl;
  }

  try {
    let user = await checkUserExists("_id", req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: userField,
      },
      { new: true }
    );

    if (user.melde_pic !== "" && user.paspor_pic !== "") {
      status = 1;
    } else {
      status = 0;
    }
    user = await User.findByIdAndUpdate(
      req.params.id,
      {
        status: status,
      },
      { new: true }
    );

    res.status(200).json(user);
  } catch (e) {
    res.status(500).send("Server error");
  }
});

//@route    POST api/user/reset-password
//@desc     Resets user password by Id
//@access   Private
router.post("/reset-password/:id", auth, async (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "",
      pass: "",
    },
  });

  let mailOptions = {
    from: "",
    to: "",
    subject: "",
    html: "",
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.status(400).json({ msg: "error: " + err });
    } else {
      res.status(200).json({ msg: "success: " + info.response });
    }
  });
});

module.exports = router;
