const path = require('path')
const { PROJECT_PATH, isDev } = require('../../constant')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const WebpackBar = require('webpackbar')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')


module.exports = {
    entry: {
        index: path.resolve(PROJECT_PATH, './src/index.tsx')
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
    },
    output: {
        filename: `js/[name]${isDev ? '' : '.[hash:8]'}.js`,
        path: path.resolve(PROJECT_PATH, './dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(PROJECT_PATH, './public/index.html'),
            filename: 'index.html',
            cache: false,
            minify: isDev ? false : {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true,
                collapseBooleanAttributes: true,
                collapseInlineTagWhitespace: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: true,
                useShortDoctype: true,
            },
        }),
        // new CopyPlugin({
        //     patterns: [
        //       {
        //         context: path.resolve(PROJECT_PATH, './public'),
        //         from: '*',
        //         to: path.resolve(PROJECT_PATH, './dist'),
        //         toType: 'dir',
        //       },
        //     ],
        // }),
        new CopyPlugin({
            patterns: [
              { from: "public/favicon.ico", to: path.resolve(PROJECT_PATH, './dist') },
            ],
        }),
        new WebpackBar({
            name: isDev ? '正在启动' : '正在打包',
            color: '#fa8c16',
        }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
              configFile: path.resolve(PROJECT_PATH, './tsconfig.json'),
            },
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(tsx?|js)$/,
                loader: 'babel-loader',
                options: { cacheDirectory: true },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false, // 默认就是 false, 若要开启，可在官网具体查看可配置项
                            sourceMap: isDev, // 开启后与 devtool 设置一致, 开发环境开启，生产环境关闭
                            importLoaders: 0, // 指定在 CSS loader 处理前使用的 laoder 数量
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                  'style-loader',
                  {
                    loader: 'css-loader',
                    options: {
                      modules: false,
                      sourceMap: isDev,
                      importLoaders: 1, // 需要先被 less-loader 处理，所以这里设置为 1
                    },
                  },
                  {
                    loader: 'less-loader',
                    options: {
                      sourceMap: isDev,
                    },
                  },
                ],
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 10 * 1024,
                      name: '[name].[contenthash:8].[ext]',
                      outputPath: 'assets/images',
                    },
                  },
                ],
            },
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/,
                use: [
                    {
                    loader: 'url-loader',
                    options: {
                        name: '[name].[contenthash:8].[ext]',
                        outputPath: 'assets/fonts',
                    },
                    },
                ],
            },
        ]
    },
    optimization: {
        minimize: !isDev,
        minimizer: [
          !isDev && new TerserPlugin({
            extractComments: false,
            terserOptions: {
              compress: { pure_funcs: ['console.log'] },
            }
          })
        ].filter(Boolean),
        splitChunks: {
          chunks: 'all',
          name: false,
        },
    },
}