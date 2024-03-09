import connectDB from "@/utils/database";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import "@/models/Category";
import "@/models/User";

export async function GET(request) {
   const { searchParams } = new URL(request.url);
   // id is the id of the product
   const id = searchParams.get("id");
   let response;

   try {
      await connectDB();
      if (id) {
         response = await Product.findById(id).populate("category farmer");
      } else {
         response = await Product.find().populate("category farmer");
      }
      return NextResponse.json(response);
   } catch (e) {
      console.log(e);
   }
}

export async function POST(request) {
   try {
      await connectDB();
      const req = await request.json();
      const data = await Product.create(req);
      return NextResponse.json(data, { status: 201 });
   } catch (e) {
      console.log(e.message);
   }
}
