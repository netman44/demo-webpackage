# 说明

## 环境安装

* npm
* node.js
* webpacck

## webpack安装

```
//全局安装
npm install -g webpack
//安装到你的项目目录
npm install --save-dev webpack

```

## 初始化项目

```
npm init
```

由于不是介绍npm命令，直接一路回车完事。

## 基础文件创建

* 准备文件
```
 mkdir demo-webpackage
 cd demo-webpackage
 mkdir app
 mkdir public
 touch app/greeter.js
 touch app/main.js
 touch public/index.html
```

* js/html文件代码

    * index.html
    ```
    <!-- index.html -->
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>Webpack Sample Project</title>
        </head>
        <body>
        <div id='root'>
        </div>
        <script src="bundle.js"></script>
        </body>
        </html>
    ```

    * greeter.js

    ```
    // Greeter.js
    module.exports = function() {
      var greet = document.createElement('div');
      greet.textContent = "Hi there and greetings!";
      return greet;
    };

    ```

    * main.js

    ```
    //main.js
    const greeter = require('./Greeter.js');
    document.querySelector("#root").appendChild(greeter());
    ```

## webpack 命令编译

* 命令参数：

```
# {extry file}出填写入口文件的路径，本文中就是上述main.js的路径，
# {destination for bundled file}处填写打包文件的存放路径
# 填写路径的时候不用添加{}
webpack {entry file} {destination for bundled file}
```

* 命令实例：
```
# webpack非全局安装的情况
node_modules/.bin/webpack app/main.js public/bundle.js

# webpack非全局安装的情况
webpack app/main.js public/bundle.js
```

## 配置文件执行

* 配置文件
```
module.exports = {
  entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  }
}
```

* 命令执行
```
webpack(非全局安装需使用node_modules/.bin/webpack)
```

## npm 命令打包

设置package.json中的script对象，完成打包。

* 修改package.json文件。修改scripts对象，进行设置。
```
{
  "name": "demo-webpackage",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^3.8.1"
  },

  "scripts": {
    "start":"webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

> start 是npm的一个特殊脚本名称。特殊在执行`mpm start`就可以执行其对应的命令。

* 自定义npm 命令

```
{
  "name": "demo-webpackage",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^3.8.1"
  },

  "scripts": {
    "s":"webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

> 需要执行：npm rum s 才能执行指定的命令

## source maps

> source maps 是为了方便调试，解决打包后文件不容易扎到出错位置的问题的。

 配置`webpack.config.js`文件的 `devtool` 属性完成。

devtool 属性值说明：


|devtool选项	 | 配置结果|
| --- | --- |
|source-map	| 在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的source map，但是它会减慢打包速度；
|cheap-module-source-map |	在一个单独的文件中生成一个不带列映射的map，不带列映射提高了打包速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便；
|eval-source-map|	使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。在开发阶段这是一个非常好的选项，在生产阶段则一定不要启用这个选项；
|cheap-module-eval-source-map|	这是在打包文件时最快的生成source map的方法，生成的Source Map 会和打包后的JavaScript文件同行显示，没有列映射，和eval-source-map选项具有相似的缺点；

代码：
```
module.exports = {
  //__dirname node.js全局变量，指向当前执行脚本所在目录

  //source maps 代码映射，方便调试。
  devtool:'eval-source-map',

  //app 唯一入口文件
  entry: __dirname + "/app/main.js",
  output:{
    //打包后的文件存放路径
    path: __dirname + "/public",
    //打包后的输出文件名
    filename:"bundle.js"
  }
};
```

## 浏览器自动刷新

要实现浏览器自动刷新，必须使用`node.js`的本地服务器。需要安装`webpack`的单独组建库。

* 命令：
```
npm install --save-dev webpack-dev-server
```

可选设置：（ [详细配置](https://webpack.js.org/configuration/dev-server/) ）

|devserver的配置选项 |	功能描述
| --- | --- |
contentBase |	默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到“public"目录）
port|	设置默认监听端口，如果省略，默认为”8080“
inline|	设置为true，当源文件改变时会自动刷新页面
historyApiFallback|	在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html

需要修改`webpack.config.js` 和 `package.json`

* 设置服务器参数 webpack.config.js
```
devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  }
```

* 设置开启服务器命令： package.json
```
{
  "name": "demo-webpackage",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^3.8.1",
    "webpack-dev-server": "^2.9.5"
  },
  "scripts": {
    "start": "webpack",
    "test": "echo \"Error: no test specified\" && exit 1",
    "server": "webpack-dev-server --open"
  }
}
```

* 开启服务器命令：

```
npm run server
```

> 到此，哥哥就可以愉快的实时刷新啦。


## loaders

作用：

>webpack使用不同的loader，可以调用外部的脚本或者工具，实现对不同格式的文件的处理。
如：转换sccs文件为css文件；把es6、es7语法转换为es5语法。react的jsx转换为js文件。

Loaders需要单独安装并且需要在webpack.config.js中的modules关键字下进行配置，

配置项：

| 名称 | 必选 | 作用|
| --- | --- | --- |
|test| 是 | 一个用以匹配loaders所处理文件的拓展名的正则表达式|
|loader|是| loader的名称|
|include/exclude| 否| 手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）|
|query | 否| 为loaders提供额外的设置选项|

在了解了这些概念后，我们必须先了解下`Babel`

### babel
Babel其实是一个编译JavaScript的平台，它的强大之处表现在可以通过编译帮你达到以下目的：

* 使用下一代的JavaScript代码（ES6，ES7...），即使这些标准目前并未被当前的浏览器完全的支持；
* 使用基于JavaScript进行了拓展的语言，比如React的JSX；

#### 安装：

>Babel其实是几个模块化的包，其核心功能位于称为babel-core的npm包中。webpack负责把这些包整合在一起使用。

常用包：
>
* babel-preset-es2015(es6 2 es 5)
* babel-preset-react
* 其他请度娘。


* 命令：
```
// npm一次性安装多个依赖模块，模块之间用空格隔开
npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react
```

* 配置：
```
module.exports = {
    entry: __dirname + "/app/main.js",//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/public",//打包后的文件存放的地方
        filename: "bundle.js"//打包后输出文件的文件名
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "es2015", "react"
                        ]
                    }
                },
                exclude: /node_modules/
            }
        ]
    }
};

```

* 使用react

命令：`npm install --save react react-dom`

现在就可以愉快的使用react 了。



## 参考：

* [入门Webpack，看这篇就够了]([http://www.jianshu.com/p/42e11515c10f])