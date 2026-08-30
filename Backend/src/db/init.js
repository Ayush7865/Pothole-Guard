require("dotenv").config({ path: "../../.env" });
const mongoose = require("mongoose");
const initData = require("./seed.js");
const PotholeEvent = require("../models/potholeEvent.model.js");

const MONGO_URL = process.env.MONGO_URL;
async function main() {
  try {
    await mongoose.connect(
      MONGO_URL
    );
    console.log("Connected to DB");

    await PotholeEvent.deleteMany({});
    await PotholeEvent.insertMany(initData.data);

    console.log(`${initData.data.length} sample events inserted`);

    await mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
}

main();
