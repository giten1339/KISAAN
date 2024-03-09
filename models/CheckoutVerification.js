import { Schema, model, models } from "mongoose";

const CheckoutVerification = new Schema(
   {
      user: { type: Schema.Types.ObjectId, ref: "users", unique: true },
      DV: { type: String, default: "" },
      blockNumber: { type: Number, default: "" },
   },
   {
      timestamps: true,
   }
);

export default models.checkoutVerification ||
   model("checkoutVerification", CheckoutVerification);
