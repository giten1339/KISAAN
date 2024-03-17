import { models, model, Schema } from "mongoose";

/**
 * Defines the schema for the order data.
 */
const OrderSchema = new Schema(
   {
      // User who placed the order
      user: { type: Schema.Types.ObjectId, ref: "users" },
      // Farmer associated with the order
      farmer: { type: Schema.Types.ObjectId, ref: "users" },
      // Item details for the order
      item: { type: Object },
      // Seen status for farmer and admin
      seen: {
         farmer: { type: Boolean, default: false },
         admin: { type: Boolean, default: false },
      },
      // Status of the order
      status: {
         type: String,
         default: "Confirmed",
         enum: ["Confirmed", "Dispatched", "Received"], // Allowed status values
      },
      // Shipping information associated with the order
      shipping: {
         type: Schema.Types.ObjectId,
         ref: "shippings",
         required: true,
      },
   },
   {
      timestamps: true, // Adds createdAt and updatedAt fields
   }
);

/**
 * Defines the Order model based on the schema.
 */
const Order = models.orders || model("orders", OrderSchema);
export default Order;



/**
 * OrderSchema: Defines the schema for the order data using new Schema({}). It includes several fields:

user: Represents the user who placed the order. It references the "users" collection.
farmer: Represents the farmer associated with the order. It references the "users" collection.
item: Represents the details of the item in the order.
seen: Represents the seen status for the farmer and admin. Both are initially set to false.
status: Represents the status of the order, which has a default value of "Confirmed" and is limited to three possible values: "Confirmed", "Dispatched", and "Received".
shipping: Represents the shipping information associated with the order. It's required and references the "shippings" collection.
Options: The schema is defined with options:

timestamps: This option automatically adds createdAt and updatedAt fields to the document, indicating when it was created and last updated respectively.
Order Model: The Order model is defined using model("orders", OrderSchema). If the model already exists, it uses the existing model; otherwise, it creates a new one.

This code helps to define and export a Mongoose model for working with order data in a MongoDB database.
 */ 