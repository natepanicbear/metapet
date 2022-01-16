const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path')

let listHtml = ['index'];
let multipleHtmlPlugins = listHtml.map(name => {
    return new HtmlWebpackPlugin({
        template: `./src/${name}.html`,
        filename: `${name}.html`,
        minimize: true,
        favicon: "./src/img/favicon.ico"
    })
});

module.exports = {
    // entry: {
    //     home: '../src/script.js'
    // },
    entry: path.resolve(__dirname, '../src/js/main.js'),
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ],
        minimize: true
    },
    output:
    {
        filename: 'bundle.main.js',
        path: path.resolve(__dirname, '../dist')
    },
    devtool: 'source-map',
    plugins:
        [
            new MiniCSSExtractPlugin({
                filename: 'style.min.css'
            }),
            new CleanWebpackPlugin()
        ].concat(multipleHtmlPlugins),
    module:
    {
        rules:
            [
                // HTML
                {
                    test: /\.(html)$/,
                    use: ['html-loader']
                },

                // JS
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use:
                        [
                            'babel-loader'
                        ]
                },

                // CSS | SCSS   
                {
                    test: /\.s[ac]ss$/i,
                    use:
                        [
                            MiniCSSExtractPlugin.loader,
                            'css-loader',
                            'sass-loader'
                        ]
                },

                // Images
                {
                    test: /\.(jpg|png|gif|svg|glb|gltf|mp3)$/,
                    use:
                        [
                            {
                                loader: 'file-loader?url=false',
                                options:
                                {
                                    name: '[name].[ext]',
                                    outputPath: 'img/',
                                    esModule: false
                                }
                            }
                        ]
                },

                // Fonts
                {
                    test: /\.(ttf|eot|woff|woff2|otf)$/,
                    use:
                        [
                            {
                                loader: 'file-loader?url=false',
                                options:
                                {
                                    outputPath: 'fonts/',
                                    esModule: false
                                }
                            }
                        ]
                },
                // JS
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                },
                // GLSL
                {
                    test: /\.(glsl|vs|fs|vert|frag)$/,
                    exclude: /node_modules/,
                    use: [
                        'raw-loader',
                        'glslify-loader',
                    ],
                },
                // VIDEO
                {
                    test: /\.(mp4|webm|ogg|swf|mov)$/,
                    use: [
                        {
                            loader: 'file-loader?url=false',
                            options:
                            {
                                name: '[name].[ext]',
                                outputPath: 'video/',
                                esModule: false
                            }
                        }
                    ]
                }
            ]
    }
}