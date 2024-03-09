import Verification from "@/models/CheckoutVerification";
import connectDB from "@/utils/database";
import { NextResponse } from "next/server";

// desc   add payment verification details
// route  POST /api/verification

export async function POST(request) {
   try {
      await connectDB();
      const data = await request.json();
      const res = await Verification.create(data);
      return NextResponse.json(res, { status: 201 });
   } catch (e) {
      console.log(e);
   }
}
