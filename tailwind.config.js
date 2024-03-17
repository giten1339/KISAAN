/**
 * Tailwind CSS configuration file.
 * For more information: https://tailwindcss.com/docs/configuration
 */

// Importing Tailwind CSS colors module
import colors from "tailwindcss/colors";

// Exporting Tailwind CSS configuration
module.exports = {
   // Specifies the files where Tailwind should look for classes
   content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   // Customizing theme
   theme: {
      extend: {
         // Extending background image utilities with radial and conic gradients
         backgroundImage: {
            "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            "gradient-conic":
               "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
         },
      },
      // Customizing color palette
      colors: {
         slate: colors.slate,
         gray: colors.gray,
         blue: colors.blue,
         red: colors.rose,
         pink: colors.fuchsia,
         white: colors.white,
         black: colors.black,
         green: colors.green,
         yellow: colors.amber,
         purple: colors.violet,
         indigo: colors.indigo,
         transparent: "transparent",
         current: "currentColor",
         main: "#81b501", // Custom main color
      },
   },
   // Including DaisyUI plugin
   plugins: [require("daisyui")],

   // Configuration for DaisyUI plugin
   daisyui: {
      // Themes to be included
      themes: ["light", "dark", "cupcake"], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
      darkTheme: "light", // Name of one of the included themes for dark mode
      base: true, // Applies background color and foreground color for root element by default
      styled: true, // Include DaisyUI colors and design decisions for all components
      utils: true, // Adds responsive and modifier utility classes
      rtl: false, // Rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
      prefix: "", // Prefix for DaisyUI classnames (components, modifiers and responsive class names. Not colors)
      logs: true, // Shows info about DaisyUI version and used config in the console when building your CSS
   },
};

/*
Content Paths: It specifies the paths where Tailwind CSS should look for classes to process in the project.

Theme Customization: The theme section extends the default Tailwind CSS theme. It adds custom background image utilities for radial and conic gradients and customizes the color palette with some predefined colors and a custom "main" color.

Plugins: The configuration includes the DaisyUI plugin. DaisyUI adds additional utility classes and components to Tailwind CSS.

DaisyUI Configuration: It provides configuration options for DaisyUI, such as which themes to include, whether to enable dark mode, whether to include base styles, utilities, and logging options.

Overall, this configuration sets up Tailwind CSS with customizations and adds the DaisyUI plugin for additional features.


*/