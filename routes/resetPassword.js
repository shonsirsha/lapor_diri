const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const checkUserExists = require("./utils/checkUserExists");
const nodemailer = require("nodemailer");
const encryptor = require("simple-encryptor")(process.env.ENCRYPT_SECRET_KEY);
require("dotenv").config();

//@route    POST api/reset-password/send
//@desc     Sends an email to reset user's password
//@access  Public
router.post("/send", async (req, res) => {
  const { email } = req.body;

  let user = await checkUserExists("email", email);

  if (user) {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    let uidEncrypted = encryptor.encrypt(user._id);

    let mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: "seangeekpro@gmail.com",
      subject: "Reset Kata Sandi - Layanan Mandiri | Lapor Diri ",
      html:
        "Halo! <br> Untuk me-reset kata sandi Anda, mohon kunjungi link berikut: <br> <a href='" +
        process.env.FRONTEND_HOST +
        "/reset-kata-sandi/" +
        uidEncrypted +
        "'>reset kata sandi</a>. <br> <br>Link ini akan kedaluwarsa setelah 5 menit.<br><br>Hormat kami,<br><b>Team Lapor Diri</b>",
    };

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
});


module.exports = router;
