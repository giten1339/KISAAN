import connectDB from "@/utils/database";
import Cart from "@/models/Cart";
import { NextResponse } from "next/server";

//    @desc:   Get all carts
//    @route:  GET /api/carts
//    @access: Public
export async function GET(request, { params }) {
   try {
      await connectDB();
      const { id } = params;
      const response = await Cart.findById(id).populate("user items");
      return NextResponse.json(response, { status: 200 });
   } catch (e) {
      console.log(e);
   }
}

//    @desc:   update a cart by id
//    @route:  POST /api/carts/:id
//    @access: Public
export async function PUT(request, { params }) {
   try {
      await connectDB();
      const { id } = params;
      const data = await request.json();
      const response = await Cart.findByIdAndUpdate(id, data, {
         new: true, // return the updated document
         runValidators: true, // validate the update operation against the model's schema
      });
      return NextResponse.json(response, { status: 200 });
   } catch (e) {
      console.log(e);
      // return  NextResponse.json({ message: e.message }, { status: 422 });
   }
}

export async function DELETE(request, { params }) {
   try {
      await connectDB();
      const { id } = params;
      await Cart.findByIdAndDelete(id);
      const response = "Cart deleted successfully";
      return NextResponse.json(response, { status: 200 });
   } catch (e) {
      console.log(e.message);
   }
}
