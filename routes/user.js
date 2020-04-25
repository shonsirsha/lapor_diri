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
      return res.status(400).json({ errors: errors.array() });
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
      let user = await checkUserExists("email", email);
      if (user) {
        return res.status(409).json({ msg: "Email has been used" });
      }
      user = await checkUserExists("paspor", paspor);
      if (user) {
        return res.status(409).json({ msg: "Passport number has been used" });
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

      const token = generateAccessToken(payload);
      const refreshToken = jwt.sign(payload, config.get("jwtSecret"));
      user.refresh_tokens.push(refreshToken);
      await user.save();

      res.json({ token: token, refreshToken: refreshToken });
    } catch (e) {
      console.log(e.message);
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
  // if (req.files === null) {
  //   return res.status(400).json({ msg: "No file was uploaded." }); // bad req
  // }
  // const file = req.files.file;
  // const fileExt = path.extname(file.name);
  // let newFileName =
  //   file.name.substr(0, file.name.lastIndexOf(".")).replace(/ /g, "") +
  //   Date.now() +
  //   fileExt;
  // file.mv(`${__dirname}/../client/public/img-melde/${newFileName}`, (err) => {
  //   if (err) {
  //     console.error(err);
  //     return res.status(500).json({ msg: `Server error ${err}` }); //server err
  //   }
  //   res.json({ fileName: file.name, filePath: `/img-melde/${newFileName}` });
  // });
});

//@route    PUT api/user/delete-document/:id
//@desc     Edit user document field on db into empty string ""
//@access   Private
router.put("/delete-document/:id", auth, async (req, res) => {
  const { docName } = req.body;

  //build user object
  const userField = {};

  if (docName === "melde") {
    userField.melde_pic = "";
  }

  if (docName === "paspor") {
    userField.paspor_pic = "";
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

module.exports = router;
