import { Schema, model, models } from "mongoose";
// * Defines the schema for the checkout verification data.

const CheckoutVerification = new Schema(
   {
            // User associated with the checkout verification

      user: { type: Schema.Types.ObjectId, ref: "users", unique: true },
            // DV (Digital Verification) for checkout verification
      DV: { type: String, default: "" },
            // Block number for checkout verification
      blockNumber: { type: Number, default: "" },
   },
   {
      timestamps: true, // Adds createdAt and updatedAt fields
   }
);
// * Defines the CheckoutVerification model based on the schema.
export default models.checkoutVerification ||
   model("checkoutVerification", CheckoutVerification);


   /**
    * CheckoutVerificationSchema: Defines the schema for the checkout verification data using new Schema({}). It includes three fields:

user: Represents the user associated with the checkout verification. It references the "users" collection using ref and is marked as unique.
DV: Represents the Digital Verification (DV) for checkout verification. It's defined as a string with a default value of an empty string.
blockNumber: Represents the block number for checkout verification. It's defined as a number with a default value of an empty string.
Options: The schema is defined with options:

timestamps: This option automatically adds createdAt and updatedAt fields to the document, indicating when it was created and last updated respectively.
CheckoutVerification Model: The CheckoutVerification model is defined using model("checkoutVerification", CheckoutVerificationSchema). If the model already exists, it uses the existing model; otherwise, it creates a new one.

This code helps to define and export a Mongoose model for working with checkout verification data in a MongoDB database.







    */