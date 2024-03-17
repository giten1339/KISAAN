/**
 * Specifies the Next.js configuration object type.
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
   /**
    * Configuration options for image optimization.
    */
   images: {
     domains: ["lh3.googleusercontent.com", "i.ibb.co"], // Domains for optimized images
   },
   /**
    * Experimental features configuration.
    */
   experimental: {
     serverActions: true, // Enables server actions
     isrMemoryCacheSize: 50, // Sets ISR (Incremental Static Regeneration) memory cache size to 50
   },
 };
 
 /**
  * Exports the Next.js configuration object.
  */
 module.exports = nextConfig;
 

 /*
Images Configuration: Configures image optimization options. It specifies domains for optimized images, allowing Next.js to optimize images from these domains.

Experimental Features Configuration: Configures experimental features. It enables server actions and sets the ISR (Incremental Static Regeneration) memory cache size to 50, allowing Next.js to optimize performance with these experimental features.

Overall, this configuration enhances the functionality of Next.js with image optimization and experimental features.
 */