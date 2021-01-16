const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbKetnoiviecName = "ketnoiviec_new";

// Use connect method to connect to the server

const resetRateAllCompany = async () => {
    const connect = await MongoClient.connect(url);

    const dbKetnoiviec = await connect.db(dbKetnoiviecName);
    const companies = await dbKetnoiviec.collection("companies").find({}).toArray();

    await Promise.all(
        companies.map((company) => {
            return dbKetnoiviec.collection("companies").updateMany(
                { _id: company._id },
                {
                    $set: {
                        "one_star_count": 0,
                        "two_star_count": 0,
                        "three_star_count": 0,
                        "four_star_count": 0,
                        "five_star_count": 0,
                    },
                },
            );
        })
    );

    connect.close();
};

resetRateAllCompany();
