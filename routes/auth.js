const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const generateAccessToken = require("./utils/generateAccessToken");
//@route    GET api/auth
//@desc     Get logged in user
//@access   Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -refresh_tokens"
    );
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server error");
  }
});

//@route    POST api/auth
//@desc     Auths (login) user & get token
//@access   Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };

      const token = generateAccessToken(payload);
      const refreshToken = jwt.sign(payload, config.get("jwtSecret"));
      res.json({ token: token, refreshToken: refreshToken });
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
