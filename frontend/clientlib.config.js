module.exports = {
  // default working directory (can be changed per 'cwd' in every asset option)
  context: __dirname,

  // path to the clientlib root folder (output)
  clientLibRoot: "../bundles/core/src/main/webapp/clientlibs-root",

  // define all clientlib options here as array... (multiple clientlibs)
  libs: [
    {
      // main app, including assets to be copied over
      name: "vic.app",
      serializationFormat: "json",
      longCacheKey: "${project.version}-${buildNumber}",
      allowProxy: true,
      cssProcessor: ["default:none", "min:none"],
      jsProcessor: ["default:none", "min:none"],
      assets: {
        js: ["target/js/vic.app.js", "target/js/vic.app.js.map"],
        css: ["target/css/vic.app.css", "target/css/vic.app.css.map"],
        resources: {
          cwd: "target/resources/",
          flatten: false,
          files: ["**/*.*"],
        },
      },
    },
    // client lib being loaded in the editor window (not the content iframe)
    // contains for example custom cq:listeners
    {
      name: "vic.authoring",
      serializationFormat: "json",
      longCacheKey: "${project.version}-${buildNumber}",
      allowProxy: true,
      assets: {
        js: ["target/js/vic.authoring.js", "target/js/vic.authoring.js.map"],
        css: ["target/css/vic.authoring.css", "target/css/vic.authoring.css.map"],
      },
      categories: ["vic.authoring"]
    },
    {
      name: "vic-legacy.app",
      longCacheKey: "${project.version}-${buildNumber}",
      serializationFormat: "json",
      allowProxy: true,
      jsProcessor: ["default:none", "min:none"],
      assets: {
        js: ["target/js/vic.app.legacy.js", "target/js/vic.app.legacy.js.map"],
        css: [],
      },
    },
    {
      name: "vic.editmode",
      serializationFormat: "json",
      allowProxy: true,
      jsProcessor: ["default:none", "min:none"],
      longCacheKey: "${project.version}-${buildNumber}",
      categories: [
        "cq.authoring.editor.core"
      ],
      assets: {
        css: ["target/css/vic.editmode.css"],
      },
    },
    {
      name: "vic.editmode.hooks",
      serializationFormat: "json",
      allowProxy: true,
      jsProcessor: ["default:none", "min:none"],
      longCacheKey: "${project.version}-${buildNumber}",
      categories: [
        "cq.authoring.editor.hook"
      ],
      assets: {
        js: ["src/editmode/vic.editmode.hooks.js"],
      },
    }
  ],
};
