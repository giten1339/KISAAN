import { models, Schema, model } from "mongoose";

const ProductSchema = new Schema(
   {
      name: {
         type: String,
         required: true,
      },
      tags: {
         type: [String],
         required: true,
      },
      price: {
         type: Number,
         required: true,
      },
      quantity: {
         type: Number,
         required: true,
      },
      image: [
         {
            thumb: {
               type: String,
            },
            image: {
               type: String,
            },
            medium: {
               type: String,
               default: false,
            },
            delete_url: {
               type: String,
            },
         },
      ],
      category: {
         type: Schema.Types.ObjectId,
         ref: "categories",
         required: true,
      },
      farmer: {
         type: Schema.Types.ObjectId,
         ref: "users",
         required: true,
      },
      description: {
         type: String,
         required: true,
         maxlength: 1000,
      },
   },
   {
      timestamps: true,
   }
);

const Product = models.products || model("products", ProductSchema);
export default Product;
