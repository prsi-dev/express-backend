import mongoose from "mongoose";
import { config } from "./src/config";

const listCollections = async () => {
  try {
    await mongoose.connect(config.mongodb.uri);
    console.log("Connected to MongoDB Atlas");

    // Get all collections
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log("\nAvailable collections:");
    console.log("--------------------");

    for (const collection of collections) {
      console.log(`\nCollection: ${collection.name}`);
      console.log("Sample documents:");

      // Get sample documents from each collection
      const documents = await mongoose.connection.db
        .collection(collection.name)
        .find({})
        .limit(5)
        .toArray();

      console.log(JSON.stringify(documents, null, 2));
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error);
  } finally {
    process.exit(0);
  }
};

listCollections();
