import connectDB from "@/utils/database";
import Verification from "@/models/CheckoutVerification";
import { NextResponse } from "next/server";

// desc   get payment verification details based on user id
// route  GET /api/verification/:id

export async function GET(request, { params }) {
   try {
      await connectDB();
      const { id } = params;
      const res = await Verification.findOne({ user: id });
      return NextResponse.json(res, { status: 200 });
   } catch (e) {
      console.log(e);
   }
}

// desc   delete payment verification details based on user id
// route  DELETE /api/verification/:id

export async function DELETE(request, { params }) {
   try {
      await connectDB();
      const { id } = params;
      const res = await Verification.findOneAndDelete({ user: id });
      return NextResponse.json(res, { status: 200 });
   } catch (e) {
      console.log(e);
   }
}
