const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const generateAccessToken = require("./utils/generateAccessToken");
const checkUserExists = require("./utils/checkUserExists");

//@route    GET api/auth
//@desc     Get logged in user
//@access   Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (e) {
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
      let user = await checkUserExists("email", email);
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
      const refresh_token = jwt.sign(payload, config.get("jwtSecret"));

      user.token = token; // save current access token to db
      user.refresh_token = refresh_token; // creating an array of refresh tokens and pushed a the new refresh token value into it
      await user.save();

      res.json({ token: token, refresh_token: refresh_token });
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

router.post("/refresh_token", async (req, res) => {
  const { old_token } = req.body;

  try {
    if (old_token === null) res.status(401).json({ msg: "no token found" });

    let user = await checkUserExists("token", old_token);

    //refresh token isnt sent by user

    const payload = {
      user: {
        id: user.id,
      },
    }; // payload taken from _id that's generated in the db

    jwt.verify(user.refresh_token, config.get("jwtSecret"), (err) => {
      if (err) res.status(401).json({ msg: "token isn't valid" }); //token is not valid

      const token = generateAccessToken(payload); // a new access token (refreshed)
      user.token = token;
      user.save();
      res.json({ token: token });
    });
  } catch (e) {
    res.status(500).send("Server error " + e);
  }
});

router.post("/x/:id", async (req, res) => {
  const { fafa } = req.body;

  res.json({ msg: fafa });
});

module.exports = router;
