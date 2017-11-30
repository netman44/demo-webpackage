module.exports = {
  //__dirname node.js全局变量，指向当前执行脚本所在目录

  //source maps 代码映射，方便调试。
  devtool: 'eval-source-map',

  //app 唯一入口文件
  entry: __dirname + "/app/main.js",
  output: {
    //打包后的文件存放路径
    path: __dirname + "/public",
    //打包后的输出文件名
    filename: "bundle.js"
  },
  devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  },

  //loader babel 配置
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: [
          {
            loader: "babel-loader",
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }

};