const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const checkUserExists = require("./utils/checkUserExists");
const nodemailer = require("nodemailer");
const encryptor = require("simple-encryptor")(config.get("nodemailerEmail"));
require("dotenv").config();

//@route    POST api/reset-password/send-email
//@desc     Sends an email to reset user's password
//@access  Public
router.post("/send-email", async (req, res) => {
  const { email } = req.body;

  try {
    let user = await checkUserExists("email", email);

    if (user) {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: config.get("nodemailerEmail"),
          pass: config.get("nodemailerPassword"),
        },
      });

      let uidEncryptedWithoutSlashes = encryptor.encrypt(user._id);
      uidEncryptedWithoutSlashes = uidEncryptedWithoutSlashes
        .toString()
        .replace(/\//g, "ipusXpd");

      let mailOptions = {
        from: config.get("nodemailerEmail"),
        to: email,
        subject: "Reset Kata Sandi - Layanan Mandiri | Lapor Diri ",
        html:
          "Halo! <br> Untuk me-reset kata sandi Anda, mohon kunjungi link berikut: <br> <a href='" +
          config.get("frontendHost") +
          "/reset-kata-sandi?user=" +
          uidEncryptedWithoutSlashes +
          "'>reset kata sandi</a>. <br> <br>Link ini akan kedaluwarsa setelah 5 menit.<br><br>Hormat kami,<br><b>Team Lapor Diri</b>",
      };
      user.password_reset_expr = Date.now() + 5 * 60 * 1000; // expiration time; 5 minutes from now
      user.save(); //saves password expiration time on db
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          res.status(400).json({
            msg: "error: " + err,
          });
        } else {
          res.status(200).json({
            msg: "success: " + info.response,
          });
        }
      });
    } else {
      res.status(404).json({ msg: "user not found" });
    }
  } catch (e) {
    res.status(500).json({ msg: "server error" });
  }
});

//@route    POST api/reset-password/check
//@desc     Checks if id legit & check if user has requested a password reset in the last 5 minutes / user has actually reset the password
//@access  Public
router.post("/check/:id", async (req, res) => {
  let uidEncryptedWithSlashes = req.params.id
    .toString()
    .replace(/\ipusXpd/g, "/");
  uidEncryptedWithSlashes = encryptor.decrypt(uidEncryptedWithSlashes);
  try {
    let user = await checkUserExists("_id", uidEncryptedWithSlashes);

    if (user) {
      // id is legit
      let time = user.password_reset_expr - Date.now();
      //password_reset_expr default value is -1

      if (time <= 300000 && time >= 0) {
        res.status(200).json({ msg: "valid" });
        // less than or eq to 300k ms (5 minutes) and not minus - then request is valid
      } else {
        // link has expired
        res.status(401).json({ msg: "password link expired" });
      }
    } else {
      res.status(404).json({ msg: "user not found" });
    }
  } catch (e) {
    res.status(500).json({ msg: "server error" });
  }
});

//@route    PUT api/reset-password/
//@desc     resets user password
//@access  Public
router.put("/", async (req, res) => {
  const { password, uidEncrypted } = req.body;
  let uidEncryptedWithSlashes = uidEncrypted
    .toString()
    .replace(/\ipusXpd/g, "/");
  uidEncryptedWithSlashes = encryptor.decrypt(uidEncryptedWithSlashes);

  try {
    let user = await checkUserExists("_id", uidEncryptedWithSlashes);
    if (user) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      user.password_reset_expr = -1;
      // resets to its default value

      await user.save();
      res.status(200).json(user);
    } else {
      return res.status(404).json({ msg: "user not found" });
    }
  } catch (e) {
    res.status(500).json({ msg: "Server error" });
  }
});
module.exports = router;
