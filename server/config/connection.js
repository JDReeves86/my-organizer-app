const mongoose = require("mongoose");
require("dotenv").config();
const CONNECTION = process.env.MONGODB_URI || "mongodb://localhost/organizerDB";

mongoose
  .connect(CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose.connection;
