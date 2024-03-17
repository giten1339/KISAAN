import * as yup from "yup";

/**
 * Schema for validating product data.
 */
export const ProductSchema = yup.object().shape({
   name: yup.string().required("Name is required"), // Validates that name is a non-empty string
   price: yup.number().positive().required("Price is required"), // Validates that price is a positive number
   image: yup.string().required("Image is required"), // Validates that image is a non-empty string
   category: yup.string().required("Category is required"), // Validates that category is a non-empty string
   tags: yup.string().required("Tags are required"), // Validates that tags is a non-empty string
   quantity: yup.number().positive().required("Quantity is required"), // Validates that quantity is a positive number
});


/**
 * ProductSchema: Defines a schema object using yup.object().shape({}), which specifies the structure of the data to be validated.

Inside the schema:

name: Validates that the name field is a non-empty string and throws an error message if it's missing.
price: Validates that the price field is a positive number and throws an error message if it's missing.
image: Validates that the image field is a non-empty string and throws an error message if it's missing.
category: Validates that the category field is a non-empty string and throws an error message if it's missing.
tags: Validates that the tags field is a non-empty string and throws an error message if it's missing.
quantity: Validates that the quantity field is a positive number and throws an error message if it's missing.
Each validation rule is chained using the yup methods to define the requirements for each field, and a corresponding error message is provided for better user feedback.
 */