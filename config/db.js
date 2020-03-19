const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  if (process.env.NODE_ENV !== "test") {
    try {
      await mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      });
      console.log("mongodb connected");
    } catch (e) {
      console.log(err.message), process.exit(1);
    }
  }
};

module.exports = connectDB;
