const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const axios = require("axios");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbKetnoiviecName = "ketnoiviec_new";

// Use connect method to connect to the server

const changeTopcvImage = async () => {
    const connect = await MongoClient.connect(url);

    const dbKetnoiviec = await connect.db(dbKetnoiviecName);


    let page = 1;

    while (true) {
        const urlGetIds = `https://crawl.ketnoiviec.net/topcv-default-image?page=${page}`;
        let resIds = await axios.get(urlGetIds);
        let ids = resIds.data;

        await Promise.all(
            ids.map((id, index) => {
                console.log(`${index} - ${id}`);
                try {
                    return dbKetnoiviec.collection("jobposts").updateMany(
                        { _id: mongoose.Types.ObjectId(id) },
                        {
                            $set: {
                                "image": "https://ketnoiviec.s3-ap-southeast-1.amazonaws.com/job_post_featured/ketnoiviec_default_image.jpg",
                            },
                        },
                    );
                } catch (e) {
                    console.log(e.message);
                    return null
                }

            })
        );
        if (ids.length < 100) {
            return true;
        } else {
            page = page + 1;
        }
    }

    connect.close();
};

changeTopcvImage();
