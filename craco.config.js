const CracoAntDesignPlugin = require("craco-antd");
const { getThemeVariables } = require("antd/dist/theme");
// const path = require("path");

module.exports = {
  webpack: {
    configure: {
      output: {
        // path: path.join(__dirname, './docs'),
        // publicPath: "../docs/",
      }
    }
  },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: getThemeVariables({ dark: true }),
      },
    },
  ],
};
