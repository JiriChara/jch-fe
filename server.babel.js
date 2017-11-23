// Enable runtime transpilation to use ES6+

require('babel-register')({
  presets: ['env', 'stage-2']
});
