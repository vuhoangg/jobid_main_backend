"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = void 0;
const mongoose = require("mongoose");
class Connection {
    static connect() {
        mongoose.connect(`${process.env.MONGODB_URI}`, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, function (error) {
            if (error) {
                console.log("Error " + error);
            }
            else {
                console.log("Connected successfully to server");
            }
        });
    }
}
exports.Connection = Connection;
//# sourceMappingURL=index.js.map
