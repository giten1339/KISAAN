import { model, models, Schema } from "mongoose";

const WishlistSchema = new Schema(
   {
      user: {
         type: Schema.Types.ObjectId,
         ref: "users",
      },
      items: {
         type: [Object],
         ref: "products",
      },
   },
   {
      timestamps: true,
   }
);

const Wishlist = models.wishlists || model("wishlists", WishlistSchema);
export default Wishlist;
