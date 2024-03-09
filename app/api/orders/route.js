import Order from "@/models/Order";
import User from "@/models/User";
import connectDB from "@/utils/database";
import "@/models/Shipping";

import { NextResponse } from "next/server";

export async function POST(request) {
   try {
      const { items, user, shipping } = await request.json();
      await connectDB();
      const { phone } = await User.findById(user);
      if (phone) {
         items.forEach(async (item) => {
            const farmer = item.farmer._id;
            await Order.create({ item, user, farmer, shipping });
         });
         return NextResponse.json("successful", { status: 201 });
      } else {
         return NextResponse.json("unsuccessful", { status: 401 });
      }
   } catch (e) {
      console.log(e);
   }
}

//this get request will fetch order based of the status, it will fetch all the products and specific product based on the id
export async function GET(request) {
   try {
      await connectDB();

      const { searchParams } = new URL(request.url);
      const id = searchParams.get("id");
      const status = searchParams.get("status");
      let response;
      if (status) {
         response = await Order.find({ status }).populate("user shipping");
      } else if (id) {
         response = await Order.findById(id).populate("user shipping");
      } else {
         response = await Order.find().populate("user shipping");
      }
      return NextResponse.json(response, { status: 200 });
   } catch (e) {
      console.log(e);
   }
}

// to update the status of the order
export async function PUT(request) {
   try {
      await connectDB();

      const { searchParams } = new URL(request.url);
      const orderId = searchParams.get("orderId");
      const req = await request.json();

      const res = await Order.updateOne({ _id: orderId }, { status: req });
      console.log("response from the database", res);
      return NextResponse.json(res, { status: 200 });
   } catch (e) {
      console.log(e);
   }
}
