import React from "react";
import Image from "next/image";
import Carousel from "@/components/products/ProductCarousel";
import Button from "@/components/shared/Button";
import Link from "next/link";
import "@/assets/css/hero.css"; // Importing CSS file
import img1 from "@/assets/images/image1.jpg";
import img2 from "@/assets/images/image2.jpeg";
import img3 from "@/assets/images/image3.jpg";

export default function Home() {
   return (
      <main>
         <br />
         <div className="w-4/5 mx-auto">
            <div className="flex gap-10">
               {/* Categories section */}
               <div className="">
                  <ul className="w-fit">
                     <li className="cat-title ">CATEGORIES</li>
                     {/* Using Link from Next.js for category links */}
                     <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/shop?category=dairy`}>
                        <li className="cat-item">Dairy</li>
                     </Link>

                     <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/shop?category=vegetables`}>
                        <li className="cat-item">Vegetables</li>
                     </Link>

                     <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/shop?category=fruits`}>
                        <li className="cat-item">Fruits</li>
                     </Link>

                     <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/shop?category=grains`}>
                        <li className="cat-item">Grains</li>
                     </Link>

                     <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/shop?category=spices`}>
                        <li className="cat-item">Spices</li>
                     </Link>

                     <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/shop?category=oil`}>
                        <li className="cat-item">Oil</li>
                     </Link>
                  </ul>
               </div>
               {/* Image section */}
               <div className="flex-auto honey px-5">
                  <div className="w-1/3 flex h-full flex-col justify-center gap-3 ">
                     <h3 className="text-xl font-semibold text-main ">
                        Welcome
                     </h3>
                     <h1 className="text-4xl font-bold">
                        Tasty & Healthy Organic food
                     </h1>
                     <br />
                     {/* Using Button component with proper props */}
                     <Button text={"SHOP NOW"} hover={true} link="/shop" />
                  </div>
               </div>
            </div>
         </div>

         <div className="flex h-[70vh] my-10">
            <div className="h-auto w-3/4 relative">
               {/* Using Image component from Next.js */}
               <Image
                  src={img1}
                  alt="image 1"
                  className="h-full w-full object-cover "
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCA"
               />
               <div className="absolute top-14 bg-[rgba(0,0,0,0.5)] w-5/6 h-4/5 ">
                  <div className="text-white flex justify-center items-center h-full flex-col gap-4">
                     <h1 className="text-4xl font-semibold font-serif">
                        A Place of All Organic Products
                     </h1>
                     <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Minima, magnam.
                     </p>

                     <div className="mt-4">
                        {/* Using Button component with proper props */}
                        <Button
                           text="shop now"
                           additionalClass="hover:scale-110 px-3 py-2 rounded-sm"
                           link="/shop"
                        />
                     </div>
                  </div>
               </div>
            </div>
            <div className=" h-auto w-auto ">
               {/* Using Image component from Next.js */}
               <Image
                  src={img2}
                  alt="image 2"
                  className="h-1/2 w-full object-cover hover:cursor-pointer hover:scale-105 transition duration-300 ease-in-out hover:border-2 hover:border-main"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCA"
               />
               {/* Using Image component from Next.js */}
               <Image
                  src={img3}
                  alt="image 3"
                  className="h-1/2 w-full object-cover hover:cursor-pointer hover:scale-105 transition duration-300 ease-in-out  hover:border-2 hover:border-main "
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCA"
               />
            </div>
         </div>

         <Carousel /> {/* Including Carousel component */}
      </main>
   );
}
