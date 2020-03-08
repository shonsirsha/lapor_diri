const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectMockDB = () => {
  const Mockgoose = require("mockgoose").Mockgoose;
  const mockgoose = new Mockgoose(mongoose);
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
};

const connectRealDB = async () => {
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
};

const connectDB = () => {
  if (process.env.NODE_ENV === "test") {
    connectMockDB();
  } else {
    connectRealDB();
  }
};

module.exports = connectDB;
