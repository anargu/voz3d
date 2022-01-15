const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const merge = require('webpack-merge')

const utils = require('./webpack.utils')

const ENV = utils.ENV
const isProd = ENV === 'production'
const INDEX_TEMPLATE = path.resolve(__dirname, 'src/index.html')
const OUTPUT_PATH = ENV === 'production' ? path.resolve('dist/') : path.resolve('src/') // resolve('dist')

const webcomponentsjs = './node_modules/@webcomponents/webcomponentsjs'
const webanimationjs = './node_modules/web-animations-js'


const polyfills = [
    {
        from: path.resolve(`${webcomponentsjs}/webcomponents-*.js`),
        to: path.join(OUTPUT_PATH, 'vendor'),
        flatten: true
    },
    {
        from: path.resolve(`${webcomponentsjs}/bundles/*.js`),
        to: path.join(OUTPUT_PATH, 'vendor', 'bundles'),
        flatten: true
    },
    {
        from: path.resolve(`${webcomponentsjs}/custom-elements-es5-adapter.js`),
        to: path.join(OUTPUT_PATH, 'vendor'),
        flatten: true
    },
    {
        from: path.resolve(`${webanimationjs}/web-animations-next.min.js`),
        to: path.join(OUTPUT_PATH, 'vendor'),
        flatten: true
    }
    // {
    //     from: resolve('./node_modules/whatwg-fetch/fetch.js'),
    //     to: join(OUTPUT_PATH, 'vendor')
    // },
    // {
    //     from: resolve('./node_modules/promise-polyfill/dist/polyfill.min.js'),
    //     to: join(OUTPUT_PATH, 'vendor')
    // }
]

const assets = [
    {
        from: path.resolve('./src/assets/*.*'),
        to: path.resolve('dist/assets/'),
        flatten: true
    },
    {
        from: path.resolve('./src/assets/manifest/*.*'),
        to: path.resolve('dist/assets/manifest/'),
        flatten: true
    },
    {
        from: path.resolve('./src/assets/head/*.*'),
        to: path.resolve('dist/assets/head/'),
        flatten: true
    },
    {
        from: path.resolve('./src/assets/body/*.*'),
        to: path.resolve('dist/assets/body/'),
        flatten: true
    }
]
  
const productionConfig = merge([
    {
        devtool: 'nosources-source-map',
        plugins: [
            new CleanWebpackPlugin([OUTPUT_PATH], { verbose: true }),
            new CopyWebpackPlugin([...polyfills, ...assets]),
            new HtmlWebpackPlugin({
                template: INDEX_TEMPLATE,
                minify: {
                    collapseWhitespace: true,
                    removeComments: true,
                    minifyCSS: true,
                    minifyJS: true
                }
            }),
            // new WorkboxPlugin.GenerateSW({
            //     // these options encourage the ServiceWorkers to get in there fast 
            //     // and not allow any straggling "old" SWs to hang around
            //     clientsClaim: true,
            //     skipWaiting: true
            // })
        ],
        optimization: {
            minimize: true,
            splitChunks: {
                chunks: 'all'
            }
        },

        resolve: {
          alias: {
            '~': (__dirname + '/src/'),
            // '@': (__dirname + '/dist/'),
          },
          extensions: ['.js', '.jsx', '.html']
        }
    }
])

const developmentConfig = merge([
    {
        devtool: 'cheap-module-source-map',
        plugins: [
            new CopyWebpackPlugin([...polyfills]), // ...assets
            new HtmlWebpackPlugin({
                template: INDEX_TEMPLATE
            }),
        ],

        devServer: {
            contentBase: OUTPUT_PATH,
            compress: true,
            overlay: true,
            port: 8000,
            historyApiFallback: true,
            host: 'localhost'
        },

        resolve: {
          alias: {
            '~': (__dirname + '/src/'),
          },
          extensions: ['.js', '.jsx']
        }
    }
])

const commonConfig = merge([
    {
        entry: path.resolve(__dirname, 'src/lit-app.js'),
        output: {
            path: path.resolve(__dirname, OUTPUT_PATH),
            filename: 'bundled.js',
            publicPath: process.env.PREFIX_PATH ? `/${process.env.PREFIX_PATH}` : '',
        },
        module: {
            rules: [...utils.rules]
        },
      plugins: [
          new webpack.DefinePlugin({
              "ENV": JSON.stringify(ENV),
              "PREFIX_PATH": JSON.stringify(process.env.PREFIX_PATH ? `/${process.env.PREFIX_PATH}` : ''),
          }),
      ]
    }
])

module.exports = mode => {
    if (mode === 'production')
        return merge(commonConfig, productionConfig, { mode })
    return merge(commonConfig, developmentConfig, { mode })
}
