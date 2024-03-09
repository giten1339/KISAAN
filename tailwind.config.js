/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";
module.exports = {
   content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      extend: {
         backgroundImage: {
            "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            "gradient-conic":
               "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
         },
      },
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
         main: "#81b501",
      },
   },
   plugins: [require("daisyui")],

   daisyui: {
      themes: ["light", "dark", "cupcake"], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
      darkTheme: "light", // name of one of the included themes for dark mode
      base: true, // applies background color and foreground color for root element by default
      styled: true, // include daisyUI colors and design decisions for all components
      utils: true, // adds responsive and modifier utility classes
      rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
      prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
      logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
   },
};
