module.exports = {
  //__dirname node.js全局变量，指向当前执行脚本所在目录


  //app 唯一入口文件
  entry: __dirname + "/app/main.js",
  output:{
    //打包后的文件存放路径
    path: __dirname + "/public",
    //打包后的输出文件名
    filename:"bundle.js"
  }
};