const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const axios = require("axios");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbKetnoiviecName = "ketnoiviec_new";

// Use connect method to connect to the server

const changeTopcvLogo = async () => {
    const connect = await MongoClient.connect(url);

    const dbKetnoiviec = await connect.db(dbKetnoiviecName);

    const urlGetIds = "https://crawl.ketnoiviec.net/topcv-default-logo";

    let resIds = await axios.get(urlGetIds);
    let ids = resIds.data;


    await Promise.all(
        ids.map((id, index) => {
            console.log(index);
            return dbKetnoiviec.collection("companies").updateMany(
                { _id: id },
                {
                    $set: {
                        "logo": "https://ketnoiviec.s3-ap-southeast-1.amazonaws.com/company_logo/ketnoiviec_default_logo.jpg",
                    },
                },
            );
        })
    );

    connect.close();
};

changeTopcvLogo();
