import { model, models, Schema } from "mongoose";

/**
 * Defines the schema for the cart data.
 */
const CartSchema = new Schema(
   {
      // User associated with the cart
      user: {
         type: Schema.Types.ObjectId,
         ref: "users",
      },
      // Items in the cart
      items: {
         type: [Object],
      },
   },
   {
      timestamps: true, // Adds createdAt and updatedAt fields
   }
);

/**
 * Defines the Cart model based on the schema.
 */
const Cart = models.carts || model("carts", CartSchema);

export default Cart;


/**
 * CartSchema: Defines the schema for the cart data using new Schema({}). It includes two fields:

user: Represents the user associated with the cart. It references the "users" collection using ref.
items: Represents the items in the cart. It's defined as an array of objects.
Options: The schema is defined with options:

timestamps: This option automatically adds createdAt and updatedAt fields to the document, indicating when it was created and last updated respectively.
Cart Model: The Cart model is defined using model("carts", CartSchema). If the model already exists, it uses the existing model; otherwise, it creates a new one.

This code helps to define and export a Mongoose model for working with shopping cart data in a MongoDB database.
 */