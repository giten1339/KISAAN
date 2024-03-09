import connectDB from "@/utils/database";
import Cart from "@/models/Cart";
import { NextResponse } from "next/server";
import "@/models/Product";
import "@/models/User";

//    @desc:   Get all carts
//    @route:  GET /api/carts
//    @access: Public
export async function GET() {
   try {
      await connectDB();
      const response = await Cart.find({}).populate("user");
      return NextResponse.json(response, { status: 200 });
   } catch (e) {
      console.log(e);
   }
}

//    @desc:   add item to cart
//    @route:  POST /api/carts/:id
//    @access: Public
export async function POST(request) {
   try {
      await connectDB();
      const req = await request.json();
      const data = await Cart.create(req);
      return NextResponse.json(data, { status: 201 });
   } catch (e) {
      console.log(e.message);
   }
}
