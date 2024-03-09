import connectDB from "@/utils/database";
import User from "@/models/User";
import { NextResponse } from "next/server";
import "@/models/Category";

export async function GET(request) {
   try {
      await connectDB();

      const { searchParams } = new URL(request.url);
      const type = searchParams.get("userType");
      let response;
      if (type == null) {
         response = await User.find({});
      } else if (type == "farmer") {
         response = await User.find({ userType: "farmer" });
      } else if (type == "consumer") {
         response = await User.find({ userType: "consumer" });
      }
      return NextResponse.json(response, { status: 200 });
   } catch (e) {
      console.log(e);
   }
}

export async function POST(request) {
   try {
      await connectDB();
      const req = await request.json();
      const data = await User.create(req);
      return NextResponse.json(data, { status: 201 });
   } catch (e) {
      console.log(e.message);
   }
}
