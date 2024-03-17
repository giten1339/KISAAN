import { Schema, model, models } from "mongoose";

// Define the schema for the shipping data
const shippingSchema = new Schema(
   {
      // Address for shipping
      address: { type: String, required: true },
      // City for shipping
      city: { type: String, required: true },
      // Postal code for shipping
      postalCode: { type: String, required: true },
      // Province for shipping
      province: { type: String, required: true },
   },
   {
      timestamps: true, // Adds createdAt and updatedAt fields
   }
);

// Define the Shipping model based on the schema
export default models.shippings || model("shippings", shippingSchema);



