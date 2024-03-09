import * as yup from "yup";

export const ProductSchema = yup.object().shape({
   name: yup.string().required("name is required"),
   price: yup.number().positive().required("price is required"),
   image: yup.string().required("image is required"),
   category: yup.string().required("category is required"),
   tags: yup.string().required("tags is required"),
   quantity: yup.number().positive().required("quantity is required"),
});
