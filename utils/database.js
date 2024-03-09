import mongoose from "mongoose";

let connected = false;

export default async function connectDB() {
   if (connected) {
      // console.log("db already connected");
      return;
   }
   try {
      // const conn = await mongoose.connect(
      //    "mongodb+srv://rejensraya:theFarm@cluster0.wyxgvxw.mongodb.net/farm"
      // );
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      connected = true;
   } catch (e) {
      console.error(`Error: ${e.message}`);
   }
}
