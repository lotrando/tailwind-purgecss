// Tailwind postcss config with cssnano and purgecss by L0tr4nd0 2020

const tailwindcss = require('tailwindcss')
const purgecss = require('@fullhuman/postcss-purgecss')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')

module.exports = {
	plugins:[
		tailwindcss('tailwind.config.js'),
		cssnano({
			preset: 'default',
		}),
		purgecss({
			safelist: [
				'html',
				'body'
			],
			content: [
				'dist/*.html',
				'dist/*.php'
			],
			defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
			extensions: ['html','php']
		}),  
		autoprefixer
	]
}