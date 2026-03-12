const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT);

    console.log("Úspěšné připojení k databázi");
  } catch (error) {
    console.error("K databázi se nepodařilo připojit:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
