const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

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
      return res.status(200).json({ errors: errors.array() });
    }

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
        kantor_pengeluaran: kantor_pengeluaran,
        ponsel: ponsel,
        alamat: alamat,
        kota_kodepos: kota_kodepos,
        email: email,
        password: password,
        melde_pic: "",
        paspor_pic: "",
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
    let user = await User.findById(req.params.id);
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
router.put("/change-password/:id", auth, async (req, res) => {
  const { password } = req.body;

  const salt = await bcrypt.genSalt(10);

  const userField = {};
  userField.password = await bcrypt.hash(password, salt);

  try {
    let user = await User.findById(req.params.id);
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
    res.status(500).send("Server error");
  }
});

//@route    PUT api/user/upload-melde/:id
//@desc     Edit a user's password with id
//@access   Private

router.post("/upload-melde/:id", auth, async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file was uploaded." }); // bad req
  }

  const file = req.files.file;

  const fileExt = path.extname(file.name);
  let newFileName =
    file.name.substr(0, file.name.lastIndexOf(".")).replace(/ /g, "") +
    Date.now() +
    fileExt;

  file.mv(`${__dirname}/../client/public/img-melde/${newFileName}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: `Server error ${err}` }); //server err
    }

    res.json({ fileName: file.name, filePath: `/img-melde/${newFileName}` });
  });
});
