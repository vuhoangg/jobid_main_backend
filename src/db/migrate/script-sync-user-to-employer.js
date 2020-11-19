const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbKetnoiviecName = "ketnoiviec_new";

// Use connect method to connect to the server

const syncUserEmployer = async () => {
    const connect = await MongoClient.connect(url);

    const dbKetnoiviec = await connect.db(dbKetnoiviecName);
    const users = await dbKetnoiviec.collection("users").find({}).toArray();
    const jobPosts = await dbKetnoiviec.collection("jobposts").find({}).toArray();
    await Promise.all(
        jobPosts.map((jobPost) => {
            return dbKetnoiviec.collection("jobposts").updateMany(
                { _id: jobPost._id },
                {
                    $set: {
                        "employer": jobPost.user,
                    },
                },
            );
        })
    );

    // for (let i = 0; i < users.length; i++) {
    //     await dbKetnoiviec.collection("employers").insertOne({
    //         _id: users[i]._id,
    //         email: users[i].email,
    //         psid: users[i].psid,
    //         password: users[i].password,
    //         first_name: users[i].first_name,
    //         last_name: users[i].last_name,
    //         full_name: users[i].full_name,
    //         birth_day: users[i].birth_day,
    //         avatar: users[i].avatar,
    //         gender: users[i].gender,
    //         spam: users[i].spam,
    //         accessToken: users[i].accessToken,
    //         refreshToken: users[i].refreshToken,
    //     })
    // }

    connect.close();
};

syncUserEmployer();
