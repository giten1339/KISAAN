import { model, models, Schema } from "mongoose";

const CartSchema = new Schema(
   {
      user: {
         type: Schema.Types.ObjectId,
         ref: "users",
      },
      items: {
         type: [Object],
      },
   },
   {
      timestamps: true,
   }
);

const Cart = models.carts || model("carts", CartSchema);
export default Cart;
