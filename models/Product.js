import { models, Schema, model } from "mongoose";

// Define the schema for the product data
const ProductSchema = new Schema(
   {
      // Name of the product
      name: {
         type: String,
         required: true,
      },
      // Tags associated with the product
      tags: {
         type: [String],
         required: true,
      },
      // Price of the product
      price: {
         type: Number,
         required: true,
      },
      // Quantity of the product available
      quantity: {
         type: Number,
         required: true,
      },
      // Images of the product
      image: [
         {
            // Thumbnail image URL
            thumb: {
               type: String,
            },
            // Full-size image URL
            image: {
               type: String,
            },
            // Medium-sized image URL (optional)
            medium: {
               type: String,
               default: false,
            },
            // URL to delete the image
            delete_url: {
               type: String,
            },
         },
      ],
      // Category of the product
      category: {
         type: Schema.Types.ObjectId,
         ref: "categories",
         required: true,
      },
      // Farmer associated with the product
      farmer: {
         type: Schema.Types.ObjectId,
         ref: "users",
         required: true,
      },
      // Description of the product
      description: {
         type: String,
         required: true,
         maxlength: 1000,
      },
   },
   {
      timestamps: true, // Adds createdAt and updatedAt fields
   }
);

// Define the Product model based on the schema
const Product = models.products || model("products", ProductSchema);
export default Product;


/**
 * ProductSchema: Defines the schema for the product data using new Schema({}). It includes several fields:

name: Represents the name of the product. It's required.
tags: Represents the tags associated with the product. It's an array of strings and is required.
price: Represents the price of the product. It's required.
quantity: Represents the quantity of the product available. It's required.
image: Represents the images of the product. It's an array of objects containing image URLs and other details.
category: Represents the category of the product. It references the "categories" collection and is required.
farmer: Represents the farmer associated with the product. It references the "users" collection and is required.
description: Represents the description of the product. It's required and has a maximum length of 1000 characters.
Options: The schema is defined with options:

timestamps: This option automatically adds createdAt and updatedAt fields to the document, indicating when it was created and last updated respectively.
Product Model: The Product model is defined using model("products", ProductSchema). If the model already exists, it uses the existing model; otherwise, it creates a new one.

This code provides a structured way to define and export a Mongoose model for working with product data in a MongoDB database.







 */
