module.exports = {
    devtool: 'source-map',
    entry: './src/main.tsx',
    output: {
        filename: './app.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx']
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: /src/,
                loader: 'ts-loader'
            },
        ]
    }
};