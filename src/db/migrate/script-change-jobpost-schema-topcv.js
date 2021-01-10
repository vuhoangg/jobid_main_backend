const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbKetnoiviecName = "ketnoiviec_new";

// Use connect method to connect to the server

const changeJobPostSchema = async () => {
    const connect = await MongoClient.connect(url);

    const dbKetnoiviec = await connect.db(dbKetnoiviecName);
    const jobPosts = await dbKetnoiviec.collection("jobposts").find({}).toArray();

    await Promise.all(
        jobPosts.map((jobPost) => {

            let job_category = jobPost.job_category;
            if (!Array.isArray(job_category)) {
                job_category = [job_category];
            }

            let address = jobPost.address;
            if (!Array.isArray(address)) {
                address = [address];
            }

            return dbKetnoiviec.collection("jobposts").updateMany(
                { _id: jobPost._id },
                {
                    $set: {
                        "job_category": job_category,
                        "address": address,
                    },
                },
            );
        })
    );

    connect.close();
};

changeJobPostSchema();
