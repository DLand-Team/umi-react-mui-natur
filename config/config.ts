import routes from '../src/router';

export default {
	npmClient: 'npm',
	mfsu: false,
	plugins: ['umi-natur'],
	svgr: {},
	svgo: false,
	natur: {
		persist: {
			include: ['user'],
			specific: {
				user: 0,
			},
		},
		useImmer: true,
	},
	srcTranspiler: 'esbuild',
	styles: [
		'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
		'https://fonts.googleapis.com/icon?family=Material+Icons',
	],
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
		lodash: '_',
		// 'decimal.js': 'Decimal',
		// rxjs: 'rxjs',
	},
	headScripts: [
		{
			src: 'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js',
			integrity:
				'sha512-8Q6Y9XnTbOE+JNvjBQwJ2H8S+UV4uA6hiRykhdtIyDYZ2TprdNmWOUaKdGzOhyr4dCyk287OejbPvwl7lrfqrQ==',
			crossorigin: 'anonymous',
			referrerpolicy: 'no-referrer',
		},
		{
			src: 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
			integrity:
				'sha512-MOCpqoRoisCTwJ8vQQiciZv0qcpROCidek3GTFS6KTk2+y7munJIlKCVkFCYY+p3ErYFXCjmFjnfTTRSC1OHWQ==',
			crossorigin: 'anonymous',
			referrerpolicy: 'no-referrer',
		},
		{
			src: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js',
			integrity:
				'sha512-WFN04846sdKMIP5LKNphMaWzU7YpMyCU245etK3g/2ARYbPK9Ub18eG+ljU96qKRCWh+quCY7yefSmlkQw1ANQ==',
			crossorigin: 'anonymous',
			referrerpolicy: 'no-referrer',
		},
		// {
		// 	src: 'https://cdnjs.cloudflare.com/ajax/libs/decimal.js/10.4.3/decimal.min.js',
		// 	integrity:
		// 		'sha512-WWzCZDQZ23GuPVKPowBGCF6MhoA1az8iJk/Gjh2a5S3jeeNEvKJHgGPMyDofeUtcOeHeI3AbsPFUILWHfoRP8w==',
		// 	crossorigin: 'anonymous',
		// 	referrerpolicy: 'no-referrer',
		// },
		// {
		// 	src: 'https://unpkg.com/rxjs@7.8.0/dist/bundles/rxjs.umd.min.js',
		// },
	],
	metas: [
		{
			name: 'viewport',
			content: 'initial-scale=1, width=device-width',
		},
	],
	routes,
};
