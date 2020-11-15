const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbKetnoiviecName = "ketnoiviec_new";

// Use connect method to connect to the server

const syncNameAvatar = async () => {
    const connect = await MongoClient.connect(url);

    const dbKetnoiviec = await connect.db(dbKetnoiviecName);
    const users = await dbKetnoiviec.collection("users").find({}).toArray();

    await Promise.all(
        users.map((user) => {
            return dbKetnoiviec.collection("users").updateMany(
                { _id: user._id },
                {
                    $set: {
                        "info.avatar": user.avatar,
                        "info.name": `${user.first_name} ${user.last_name}`.trim(),
                    },
                },
            );
        })
    );

    connect.close();
};

syncNameAvatar();
