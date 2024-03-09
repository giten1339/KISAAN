import { models, Schema, model } from "mongoose";

const UserSchema = new Schema(
   {
      name: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
      },
      image: {
         type: String,
         required: true,
      },
      userType: {
         type: String,
         enum: ["consumer", "farmer", "admin"],
         default: "consumer",
      },
      phone: {
         type: String,
         default: false,
      },
   },
   {
      timestamps: true,
   }
);

const User = models.users || model("users", UserSchema);
export default User;
