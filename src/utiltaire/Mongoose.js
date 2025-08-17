import mongoose from "mongoose";

const connectMongoose = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log("Connection sur MongoDB");
  } catch (e) {
    console.error(e, "Erreur de connection sur la base de donnée");
  }
};

export { connectMongoose };
