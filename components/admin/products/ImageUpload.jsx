"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import { FaTrash } from "react-icons/fa";

export default function ImageUpload({
   setImages,
   setOldImages,
   oldImages = [],
}) {
   const [selectedImages, setSelectedImages] = useState([]);

   useEffect(() => {
      setImages(selectedImages);
   }, [selectedImages]);

   const onSelectFile = (event) => {
      const selectedFiles = event.target.files;
      const selectedFilesArray = Array.from(selectedFiles);

      const imagesArray = selectedFilesArray.map((file) => {
         return URL.createObjectURL(file);
      });

      setSelectedImages((previousImages) => previousImages.concat(imagesArray));

      // // FOR BUG IN CHROME
      // event.target.value = "";
   };

   function deleteHandler(image) {
      setSelectedImages(selectedImages.filter((e) => e !== image));
      URL.revokeObjectURL(image);
   }

   function deletePreviousImage(image) {
      setOldImages(oldImages.filter((e) => e._id !== image._id));
   }

   return (
      <section className="mt-4">
         <div className="flex justify-center">
            <label className="border-dotted border-black border-2 rounded-xl w-40 h-fit flex flex-col justify-center items-center cursor-pointer text-lg">
               + Add Images
               <br />
               <span className="text-sm font-light pt-0">up to 4 images</span>
               <input
                  type="file"
                  name="images"
                  onChange={onSelectFile}
                  multiple
                  accept="image/png , image/jpeg, image/webp"
                  className="hidden"
               />
            </label>
         </div>
         <br />

         <div className="flex flex-row flex-wrap justify-center items-center">
            {/* images from the database */}
            {oldImages &&
               oldImages.map((image) => (
                  <div
                     key={image._id}
                     className=" my-2 relative rounded-xl shadow-md"
                  >
                     <Image
                        src={image.image}
                        width={100}
                        height={100}
                        alt="old image"
                        style={{
                           height: "100px",
                           width: "100px",
                           objectFit: "contain",
                           objectPosition: "center",
                        }}
                     />
                     <FaTrash
                        className="absolute top-2 right-2 cursor-pointer border-none text-red-500 rounded-none "
                        onClick={() => deletePreviousImage(image)}
                     />
                  </div>
               ))}

            {/* images from the user */}
            {selectedImages &&
               selectedImages.map((image) => (
                  <div
                     key={image}
                     className=" my-2 relative rounded-xl shadow-md"
                  >
                     <Image
                        src={image}
                        width={100}
                        height={100}
                        alt="upload"
                        style={{
                           height: "100px",
                           width: "100px",
                           objectFit: "contain",
                           objectPosition: "center",
                        }}
                     />
                     <FaTrash
                        className="absolute top-2 right-2 cursor-pointer border-none text-red-500 rounded-none "
                        onClick={() => deleteHandler(image)}
                     />
                  </div>
               ))}
         </div>
      </section>
   );
}
