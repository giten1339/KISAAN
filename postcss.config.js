/**
 * Exports the PostCSS configuration object.
 */
module.exports = {
  /**
   * Specifies the PostCSS plugins to be used.
   */
  plugins: {
    tailwindcss: {}, // Plugin for processing Tailwind CSS
    autoprefixer: {}, // Plugin for adding vendor prefixes to CSS rules
  },
};


/*
Plugins: Specifies the PostCSS plugins to be used. In this case, it includes two plugins:
tailwindcss: This plugin processes Tailwind CSS, allowing you to use Tailwind's utility classes in your CSS.
autoprefixer: This plugin adds vendor prefixes to CSS rules to ensure cross-browser compatibility. For example, it automatically adds -webkit-, -moz-, and -ms- prefixes where necessary.
Overall, this configuration ensures that Tailwind CSS is processed and vendor prefixes are added to the CSS rules.


*/