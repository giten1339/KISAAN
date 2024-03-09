import connectDB from "@/utils/database";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function GET() {
   try {
      await connectDB();
      const response = await Category.find();
      return  NextResponse.json(response, { status: 200 });
   } catch (e) {
      console.log(e);
   }
}

export async function POST(request) {
   try {
      await connectDB();
      const req = await request.json();
      const data = await Category.create(req);
      return  NextResponse.json(data, { status: 201 });
   } catch (e) {
      console.log(e.message);
   }
}
