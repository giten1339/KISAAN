import { models, model, Schema } from "mongoose";

const OrderSchema = new Schema(
   {
      user: { type: Schema.Types.ObjectId, ref: "users" },
      farmer: { type: Schema.Types.ObjectId, ref: "users" },
      item: { type: Object },
      seen: {
         farmer: { type: Boolean, default: false },
         admin: { type: Boolean, default: false },
      },
      status: {
         type: String,
         default: "Confirmed",
         enum: ["Confirmed", "Dispatched", "Recieved"],
      },
      shipping: {
         type: Schema.Types.ObjectId,
         ref: "shippings",
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

const Order = models.orders || model("orders", OrderSchema);
export default Order;
