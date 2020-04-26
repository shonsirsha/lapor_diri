const express = require("express");
const User = require("../models/User");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const checkUserExists = require("./utils/checkUserExists");
const nodemailer = require("nodemailer");
require("dotenv").config();

//@route    POST api/user/send-reset-password
//@desc     Sends an email to reset user's password
//@access  Public
router.post("/send", async (req, res) => {
  // let user = checkUserExists("_id", req.params.id);

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: "seangeekpro@gmail.com",
    subject: "Reset Kata Sandi - Layanan Mandiri | Lapor Diri ",
    html:
      "Halo! <br> Untuk me-reset kata sandi Anda, mohon kunjungi link berikut: <br> <a href='#'>reset kata sandi</a>. <br> <br>Link ini akan kedaluwarsa setelah 5 menit.<br><br>Hormat kami,<br><b>Team Lapor Diri</b>",
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.status(400).json({ msg: "error: " + err });
    } else {
      res.status(200).json({ msg: "success: " + info.response });
    }
  });
});
