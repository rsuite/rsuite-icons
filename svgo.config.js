module.exports = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // viewBox is required to resize SVGs with CSS.
          // @see https://github.com/svg/svgo/issues/1128#issuecomment-978136077
          removeViewBox: false
        }
      }
    }
  ]
};
