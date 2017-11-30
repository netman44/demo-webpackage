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

### 分拆babel配置

`babel`会有非常多的配置。需要进行拆分，拆分出`.babelrc`配置文件。

到目前为止，我们已经知道了，对于模块，Webpack能提供非常强大的处理功能，那那些是模块呢。

## webpack处理模块。

> 一切皆模块

## css loader

webpack中常用的css相关的loader有两个：css-loader、style-loader.

* css-loader：使你能够使用类似@import 和 url(...)的方法实现 require()的功
* style-loader：将所有的计算后的样式加入页面中

二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。

### 安装：
```
//安装
npm install --save-dev style-loader css-loader
```

### css Modules
css module 就是把js的模块化思想引入css中。实现所有的类名、动画名默认都之作用于当前模块。

   在`css-loader`的添加modules属性。代码如下：
   ```
   module.exports = {
        // ..其他设置
     module: {
       rules: [
            //... 其他loader
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
   ```
### css预处理
处理想`sass、less`之类的对原生css扩展。

* [sass loader](https://github.com/jtangelder/sass-loader)
* [less loader](https://github.com/webpack/less-loader)
* [stylus loader](https://github.com/shama/stylus-loader)

可以使用`-PostCSS` 预处理平台。可以帮组Css实现更多的功能。具体可查看 [官方文档](https://github.com/postcss/postcss)

`PostCSS`有非常多的CSS预处理扩展，我们以处理自动为CSS代码添加适应不同浏览器的前缀为例。需要用到
>
* postcss-loader（postcss 插件）
* autoprefixer(自动添加前缀插件)

* 命令
```
npm install --save-dev postcss-loader autoprefixer
```

* webpack.config.js添加如下代码：
```
//webpack.config.js
module.exports = {
    ...
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    }
}
```

* 新建postcss.config.js。并添加如下代码：
```
// postcss.config.js
module.exports = {
    plugins: [
        require('autoprefixer')
    ]
}
```

* 重新打包 `npm start`

自此，以说明了处理JS的`Babel` 和处理CSS的`PostCSS`的基本用法。他们是两个独立的平台，配合`webpack`可以很好的发挥他们的作用。

>
这里重申一下，loader的作用是：可以使用外部的脚本或者工具，实现对不同格式的文件的处理。

## plugin
这一章将介绍webpack的另一个改了`plugin`。plugin是用来扩展webpack的功能的。作用域为`整个构建过程`，会在整个苟安过程中生效，执行相关的任务。

与loader区别：
* loader 在打包构建过程中用来预处理源文件的（JSX、Scss、Less）,一次处理一个文件。
* plugin plugin不直接操作单个文件。它直接多整个构建过程起作用。

### 使用方法
使用流程：
1、 npm安装
2、webpack配置

webpack有许多内置插件，也有许多第三方插件。

### HtmlWebpackPlugin

这个插件的作用是依据一个简单的index.html模板，生成一个自动引用你打包后的JS文件的新index.html。这在每次生成的js文件名称不同时非常有用（比如添加了hash值）。

* 安装
```
npm install --save-dev html-webpack-plugin
```
* webpack 配置
```
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: __dirname + "/app/main.js",//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
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
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        })
    ],
};
```

* 删除public ，npm start 会发现有build文件夹下生成了`bundle.js` 和`index.html`文件。

### Hot module replacement

热加载：本插件允许你在修改组件代码后，自动刷新实时预览修改后的效果。

react项目实现热加载

使用：
1、在webpack配置文件中添加HMR插件；
2、在Webpack Dev Server中添加“hot”参数；

不过配置完这些后，JS模块其实还是不能自动热加载的，还需要在你的JS模块中执行一个Webpack提供的API才能实现热加载，虽然这个API不难使用，但是如果是React模块，使用我们已经熟悉的Babel可以更方便的实现功能热加载。

整理下我们的思路，具体实现方法如下

* Babel和webpack是独立的工具
* 二者可以一起工作
* 二者都可以通过插件拓展功能
* HMR是一个webpack插件，它让你能浏览器中实时观察模块修改后的效果，但是如果你想让它工作，需要对模块进行额外的配额；
* Babel有一个叫做react-transform-hrm的插件，可以在不对React模块进行额外的配置的前提下让HMR正常工作；

配置：
* webpack.config.js
```
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: __dirname + "/app/main.js",//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin()//热加载插件
    ],
};
```
* 安装 react-transform-hmr
```
npm install --save-dev babel-plugin-react-transform react-transform-hmr
```

* 配置Babel
```
// .babelrc
{
  "presets": ["react", "es2015"],
  "env": {
    "development": {
    "plugins": [["react-transform", {
       "transforms": [{
         "transform": "react-transform-hmr",

         "imports": ["react"],

         "locals": ["module"]
       }]
     }]]
    }
  }
}
```

## 产品构建
目前为止，我们已经使用webpack构建了一个完整的开发环境。但是在产品阶段，可能还需要对打包的文件进行额外的处理，比如说优化，压缩，缓存以及分离CSS和JS。

对于复杂的项目来说，需要复杂的配置，这时候分解配置文件为多个小的文件可以使得事情井井有条，以上面的例子来说，我们创建一个`webpack.production.config.js`的文件，在里面加上基本的配置,它和原始的webpack.config.js很像，如下

### 优化插件

* OccurenceOrderPlugin :为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
* UglifyJsPlugin：压缩JS代码；
* ExtractTextPlugin：分离CSS和JS文件

build构建配置：
```
// webpack.production.config.js
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: __dirname + "/app/main.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/build",
    filename: "bundle.js"
  },
  devtool: 'none',
  devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          }, {
            loader: "css-loader",
            options: {
              modules: true
            }
          }, {
            loader: "postcss-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.tmpl.html"
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("style.css")
  ],
};
```

### 缓存插件。
缓存无处不在，使用缓存的最好方法是保证你的文件名和文件内容是匹配的（内容改变，名称相应改变）

webpack可以把一个哈希值添加到打包的文件名中，使用方法如下,添加特殊的字符串混合体（[name], [id] and [hash]）到输出文件名前

## 参考：

* [入门Webpack，看这篇就够了](http://www.jianshu.com/p/42e11515c10f)
* [webpack for react](http://www.pro-react.com/materials/appendixA/)
* [webpack教程](http://www.jqhtml.com/7694.html)
* [官方文档](https://webpack.js.org/plugins/banner-plugin/
)
