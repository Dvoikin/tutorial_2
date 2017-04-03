module.exports = {
    module: {
        name: 'app',
        styles: 'styles',
        standalone: 'app',
        export: 'app'
    },

    file: {
        lib: [
            'node_modules/pip-webui-all/dist/**/*'
        ]
    },

    build: {
        js: false,
        ts: false,
        bundle: true,
        html: true,
        less: true,    
        sass: false,    
        lib: true,
        images: true,
        dist: true
    },

    browserify: {
        entries: [ 
            './temp/pip-webui-sample-html.js',
            './src/index.ts'
        ]
    }

};