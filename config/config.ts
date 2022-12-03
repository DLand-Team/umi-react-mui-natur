import routes from '../src/router'

export default {
  npmClient: 'npm',
  mfsu: false,
  plugins: ['umi-natur'],
  natur: {},
  styles: [
    'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
    'https://fonts.googleapis.com/icon?family=Material+Icons'
  ],
  metas: [
    {
      name: 'viewport',
      content: 'initial-scale=1, width=device-width'
    }
  ],
  routes
};
