import Order from "@/models/Order";
import "@/models/User";
import connectDB from "@/utils/database";
import { NextResponse } from "next/server";
import "@/models/Shipping";

//this get request will fetch all the orders of either user or admin
export async function GET(request, { params }) {
   try {
      await connectDB();

      const { searchParams } = new URL(request.url);
      const type = searchParams.get("type");
      const count = searchParams.get("count");
      const { id } = params;
      let res = {};
      if (type === "farmer" || type === "admin") {
         if (count) {
            res =
               type === "farmer"
                  ? await Order.countDocuments({
                       farmer: id,
                       "seen.farmer": false,
                    })
                  : await Order.countDocuments({
                       "seen.admin": false,
                    });
         } else {
            res =
               type === "farmer"
                  ? await Order.find({ farmer: id })
                       .sort({
                          createdAt: "desc",
                       })
                       .populate("shipping")
                  : await Order.find({})
                       .sort({
                          createdAt: "desc",
                       })
                       .populate("shipping");
         }
      } else if (type === "user") {
         res = await Order.find({ user: id }).sort({ createdAt: "desc" });
      }
      return NextResponse.json(res, { status: 200 });
   } catch (e) {
      console.log(e);
   }
}

//update the seen status
export async function PUT(request, { params }) {
   try {
      await connectDB();
      const { searchParams } = new URL(request.url);
      const type = searchParams.get("type");
      const count = searchParams.get("count");
      const { id } = params;
      let res = {};
      if (count) {
         res =
            type === "farmer"
               ? await Order.updateMany(
                    {
                       farmer: id,
                       "seen.farmer": false,
                    },
                    { $set: { "seen.farmer": true } }
                 )
               : await Order.updateMany(
                    {
                       "seen.admin": false,
                    },
                    { $set: { "seen.admin": true } }
                 );
      }

      return NextResponse.json(res, { status: 200 });
   } catch (e) {
      console.log(e);
   }
}
