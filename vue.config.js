module.exports = {
    configureWebpack: {
        devServer: {
            clientLogLevel: 'info',
            watchOptions: {
                poll: true
            }
        }
    },
    chainWebpack: config => {
        config.module.rules.delete('eslint');
    }
}