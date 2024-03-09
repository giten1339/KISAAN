import connectDB from "@/utils/database";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
   try {
      await connectDB();
      const { id } = params;
      const response = await User.findById(id);
      return  NextResponse.json(response, { status: 200 });
   } catch (e) {
      console.log(e);
   }
}

export async function PUT(request, { params }) {
   try {
      await connectDB();
      const { id } = params;
      const data = await request.json();
      const response = await User.findByIdAndUpdate(id, data, {
         new: true, // return the updated document
         runValidators: true, // validate the update operation against the model's schema
      });
      return  NextResponse.json(response, { status: 200 });
   } catch (e) {
      console.log(e);
      // return  NextResponse.json({ message: e.message }, { status: 422 });
   }
}

export async function DELETE(request, { params }) {
   try {
      await connectDB();
      const { id } = params;
      await User.findByIdAndDelete(id);
      const response = "User deleted successfully";
      return  NextResponse.json(response, { status: 200 });
   } catch (e) {
      console.log(e.message);
   }
}
