import { models, Schema, model } from "mongoose";

const CategorySchema = new Schema(
   {
      name: {
         type: String,
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

const Category = models.categories || model("categories", CategorySchema);

export default Category;
