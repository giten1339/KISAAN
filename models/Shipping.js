import { Schema, model, models } from "mongoose";

const shippingSchema = new Schema(
   {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      province: { type: String, required: true },
   },
   {
      timestamps: true,
   }
);

export default models.shippings || model("shippings", shippingSchema);
