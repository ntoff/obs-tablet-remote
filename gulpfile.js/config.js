module.exports = {
	root: {
		src:  './src',
		dest: './public',
	},

	tasks: {
		js: {
			src:            'javascripts/boot',
			dest:           'javascripts',
			entries:        {
				main: ['./main.js'],
			},
			extensions:     ['js'],
			cleanExtensons: ['js', 'css'],
		},

		css: {
			src:            'stylesheets',
			dest:           'stylesheets',
			autoprefixer:   {
				browsers: ['last 3 version']
			},
			sass:           {},
			extensions:     ['scss', 'css'],
			cleanExtensons: ['css'],
		},

		html: {
			src:            'html',
			dest:           './',
			htmlmin:        {
				collapseWhitespace: true
			},
			extensions:     ['html'],
			excludeFolders: [],
		},

	},
}