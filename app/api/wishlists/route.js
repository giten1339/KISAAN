import connectDB from "@/utils/database";
import Wishlist from "@/models/Wishlist";
import { NextResponse } from "next/server";
import "@/models/Product";
import "@/models/User";

export async function GET() {
   try {
      await connectDB();
      const response = await Wishlist.find({}).populate("user");
      return NextResponse.json(response, { status: 200 });
   } catch (e) {
      console.log(e);
   }
}

export async function POST(request) {
   try {
      await connectDB();
      const req = await request.json();
      const data = await Wishlist.create(req);
      return NextResponse.json(data, { status: 201 });
   } catch (e) {
      console.log(e.message);
   }
}
