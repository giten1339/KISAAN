import { models, Schema, model } from "mongoose";

// Define the schema for the user data
const UserSchema = new Schema(
   {
      // Name of the user
      name: {
         type: String,
         required: true,
      },
      // Email of the user
      email: {
         type: String,
         required: true,
      },
      // Image URL of the user
      image: {
         type: String,
         required: true,
      },
      // Type of the user
      userType: {
         type: String,
         enum: ["consumer", "farmer", "admin"], // Allowed user types
         default: "consumer", // Default user type
      },
      // Phone number of the user
      phone: {
         type: String,
         default: false, // Default value set to false
      },
   },
   {
      timestamps: true, // Adds createdAt and updatedAt fields
   }
);

// Define the User model based on the schema
const User = models.users || model("users", UserSchema);
export default User;


/**
 * UserSchema: Defines the schema for the user data using new Schema({}). It includes several fields:

name: Represents the name of the user. It's required.
email: Represents the email of the user. It's required.
image: Represents the image URL of the user. It's required.
userType: Represents the type of the user, which can be "consumer", "farmer", or "admin". It has a default value of "consumer".
phone: Represents the phone number of the user. It has a default value of false.
Options: The schema is defined with options:

timestamps: This option automatically adds createdAt and updatedAt fields to the document, indicating when it was created and last updated respectively.
User Model: The User model is defined using model("users", UserSchema). If the model already exists, it uses the existing model; otherwise, it creates a new one.

This code provides a structured way to define and export a Mongoose model for working with user data in a MongoDB database.







 */