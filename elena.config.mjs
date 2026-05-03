/**
 * ░█ [ELENA]: Bundler configuration
 *
 * @type {import("@elenajs/bundler").ElenaConfig}
 */
export default {
  // Source directory scanned for .js/.ts entry files and .css files.
  input: "src",

  // Rollup output options.
  output: {
    dir: "dist",
    format: "esm",
    sourcemap: true,
  },

  // Entry for the single-file bundle. Set to false to disable.
  bundle: "src/index.js",

  // Additional Rollup plugins appended after Elena’s built-in set.
  // plugins: [],

  // Custom Elements Manifest options. Set to false to skip entirely.
  // analyze: {
  //   plugins: [],
  // },

  // Browserslist targets for transpilation. Enables syntax transforms
  // (e.g. class fields, optional chaining) to widen browser support.
  // target: ["chrome 71", "firefox 69", "safari 12.1"],

  // Custom Terser minifier options, merged with the defaults.
  // terser: { ecma: 2020, module: true },
};
