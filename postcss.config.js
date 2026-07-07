/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: [
    require('@csstools/postcss-global-data')({
      files: ['./app/custom-media.css'],
    }),
    require('postcss-custom-media')(),
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'custom-properties': false,
        'custom-media-queries': false,
      },
    }),
  ],
};
