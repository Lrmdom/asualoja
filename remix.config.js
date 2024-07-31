/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "esm",
  tailwind: true,
  postcss: true,
  serverPlatform: "node",
  serverDependenciesToBundle: "all" /*[
    /^rehype.*!/,
    /^remark.*!/,
    /^unified.*!/,
    "remix-i18next",
    "accept-language-parser",


  ],*/
};
