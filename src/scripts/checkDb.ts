import mongoose from "mongoose";
import { config } from "../config";

const checkSampleMflix = async () => {
  try {
    // Modify the connection string to use sample_mflix database
    const uri = config.mongodb.uri.replace(/\/[^/]*$/, "/sample_mflix");
    await mongoose.connect(uri);
    console.log(
      "Successfully connected to MongoDB Atlas - sample_mflix database"
    );

    if (!mongoose.connection.db) {
      throw new Error("Database connection not established");
    }

    // List all collections
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    console.log("\nAvailable collections in sample_mflix:");
    console.log("----------------------------------");
    for (const collection of collections) {
      console.log(`\nCollection: ${collection.name}`);

      // Get sample documents
      const documents = await mongoose.connection.db
        .collection(collection.name)
        .find({})
        .limit(2)
        .toArray();

      console.log("Sample documents:");
      console.log(JSON.stringify(documents, null, 2));
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

checkSampleMflix();
