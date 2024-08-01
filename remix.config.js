/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
    ignoredRouteFiles: ["**/.*"],
    tailwind: true,
    postcss: true,
    serverModuleFormat: "esm",
    serverPlatform: "node",
    serverDependenciesToBundle: [
        /^rehype.*/,
        /^remark.*/,
        /^unified.*/,
        "remix-i18next",
        "accept-language-parser",
    ],
};
