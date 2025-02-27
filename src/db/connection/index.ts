const mongoose = require("mongoose");
export class Connection {
  static connect() {
    mongoose.connect(
      `${process.env.MONGODB_URI}`,
      { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
      function (error) {
        if (error) {
          console.log("Error " + error);
        } else {
          console.log("Connected successfully to server");
        }
      }
    );
  }
}
