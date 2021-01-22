const mongoose = require("mongoose");
export class Connection {
  static connect() {
    mongoose.connect(
      `${process.env.DB_CONNECTION}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
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
