// babel.config.js
module.exports = {
    presets: [
      '@babel/preset-env',
      '@babel/preset-typescript',   // for TS support
      ['@babel/preset-react' , {
        runtime: 'automatic' // This is important for React 17 and later
      }]     
    ],
  };
  