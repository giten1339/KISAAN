import { models, Schema, model } from "mongoose";

/**
 * Defines the schema for the category data.
 */
const CategorySchema = new Schema(
   {
      // Name of the category
      name: {
         type: String,
         required: true, // Requires the name field
      },
   },
   {
      timestamps: true, // Adds createdAt and updatedAt fields
   }
);

/**
 * Defines the Category model based on the schema.
 */
const Category = models.categories || model("categories", CategorySchema);

export default Category;


/**
 * CategorySchema: Defines the schema for the category data using new Schema({}). It includes one field:

name: Represents the name of the category. It's defined as a string and is required.
Options: The schema is defined with options:

timestamps: This option automatically adds createdAt and updatedAt fields to the document, indicating when it was created and last updated respectively.
Category Model: The Category model is defined using model("categories", CategorySchema). If the model already exists, it uses the existing model; otherwise, it creates a new one.
 */