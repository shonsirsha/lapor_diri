const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/user", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/check-register", require("./routes/checkRegister"));
app.use("/api/reset-password", require("./routes/resetPassword"));

// Serve static assets (react) in production
if (process.env.NODE_ENV === "production") {
  // Load static folder - the static assets that react built for us
  app.use(express.static("client/build"));

  //if we hit the homepage, it's going to load this file
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
