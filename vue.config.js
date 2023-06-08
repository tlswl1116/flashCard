const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  lintOnSave: "default",
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/css/style.scss";
        `,
      },
    },
  },
  publicPath: "./",
  assetsDir: "./",
  productionSourceMap: false,
  filenameHashing: false,
  configureWebpack: {
    devtool: "source-map",
  },
  devServer: {
    port: 8080,
    // 서버 업로드 후 삭제
    // proxy: {
    //   "/flashcard": {
    //     target: "https://branch2.eie.co.kr",
    //     changeOrigin: true,
    //   },
    // },
  },
});
