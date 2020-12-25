const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbKetnoiviecName = "ketnoiviec_new";

// Use connect method to connect to the server

const activeCrawlCommunityPost = async () => {
  const connect = await MongoClient.connect(url);

  const dbKetnoiviec = await connect.db(dbKetnoiviecName);
  const communityposts = await dbKetnoiviec.collection("communityposts").find({}).toArray();

  await Promise.all(
    communityposts.map((communitypost) => {
      return dbKetnoiviec.collection("communityposts").updateMany(
        { _id: communitypost._id },
        {
          $set: {
            "status": "active",
          },
        },
      );
    })
  );

  connect.close();
};

activeCrawlCommunityPost();
