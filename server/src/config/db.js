const mongoose = require("mongoose");
const { mongodbUrl } = require("../secret");
const connectDatabase = async (options={}) => {
  try {
    await mongoose.connect(mongodbUrl,options);
    console.log("Connection to DB is Successfully established");
    mongoose.connection.on("error", (error) => {
      console.error("Db connection error", error);
    });
  } catch (error) {
    console.error("Could not connect to db", error.toString());
  }
};
module.exports=connectDatabase;
