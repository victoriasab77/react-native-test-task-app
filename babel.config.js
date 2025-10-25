// babel.config.js
const nativewind = require('nativewind/babel')

module.exports = function (api) {
  api.cache(true)
  const nativeWindPlugins = nativewind()
    .plugins
    .filter(plugin => plugin !== 'react-native-worklets/plugin')

  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      ...nativeWindPlugins, // skip worklets plugin (React Native 0.74 incompatibility)
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@screens': './src/screens',
          },
        },
      ],
    ],
  }
}
