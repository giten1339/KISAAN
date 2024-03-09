import connectDB from "@/utils/database";
import Shipping from "@/models/Shipping";
import { NextResponse } from "next/server";

// desc   get payment verification details based on verification id
// route  GET /api/verification/:id

export async function GET(request, { params }) {
   try {
      await connectDB();
      const { id } = params;
      console.log("this is runnin");
      const res = await Shipping.findById(id);
      return NextResponse.json(res, { status: 200 });
   } catch (e) {
      console.log(e);
   }
}
