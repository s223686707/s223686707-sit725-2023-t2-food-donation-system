const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const db = "mongodb+srv://Domain:Domain@cluster0.h6nrkl7.mongodb.net/?retryWrites=true&w=majority";
    await mongoose.connect(db);
    console.log("MongoDB connected...");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
