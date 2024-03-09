import connectDB from "@/utils/database";
import Product from "@/models/Product";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
   try {
      await connectDB();
      const { id } = params;
      const response = await Product.find({ farmer: id }).populate(
         "category"
      );

      return NextResponse.json(response, { status: 200 });
   } catch (e) {
      console.log(e);
   }
}

export async function PUT(request, { params }) {
   try {
      await connectDB();

      const { searchParams } = new URL(request.url);
      const type = searchParams.get("updateType");

      const { id } = params;
      const data = await request.json();

      let response = {};
      if (type === "checkout") {
         response = await Product.findByIdAndUpdate(
            id,
            { $inc: { quantity: -data.quantity } },
            { new: true, runValidators: true }
         );
         console.log(response);
      } else if(type === "update") {
         response = await Product.findByIdAndUpdate(id, data, {
            new: true, // return the updated document
            runValidators: true, // validate the update operation against the model's schema
         });
      }
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
      const { image } = await Product.findById(id);
      image.map(async (img) => {
         const deleteUrl = img.delete_url;
         await fetch(deleteUrl, {
            method: "DELETE",
         });
      });

      await Product.findByIdAndDelete(id);
      const response = "Product deleted successfully";
      return NextResponse.json(response, { status: 200 });
   } catch (e) {
      console.log(e.message);
   }
}
