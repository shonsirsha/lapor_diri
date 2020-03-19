const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
const Mockgoose = require("mockgoose").Mockgoose;
const mockgoose = new Mockgoose(mongoose);

const connectDB = () => {
  if (process.env.NODE_ENV === "test") {
    mockgoose
      .prepareStorage()
      .then(() => {
        try {
          mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
          });
        } catch (err) {
          console.log(err);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};

module.exports = connectDB;
