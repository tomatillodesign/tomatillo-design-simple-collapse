const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
	...defaultConfig,
	entry: {
		index: './src/index.js',       // Editor logic
		frontend: './src/frontend.js', // Frontend logic
	},
};
