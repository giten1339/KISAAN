import mongoose from "mongoose";

let connected = false;

export default async function connectDB() {
   if (connected) {
   //    console.log("Database already connected");
      return;
    }
   try {
      const mongodbUri = "mongodb://localhost:27017/kisan"; 
      const conn = await mongoose.connect(mongodbUri, {
         useNewUrlParser: true,
         useUnifiedTopology: true
      });     
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      connected = true;
   } catch (e) {
      console.error(`Error connecting to MongoDB: ${e.message}`);
   }
}
