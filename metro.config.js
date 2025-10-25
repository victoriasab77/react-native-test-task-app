const path = require('path')
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config')
const { withNativeWind } = require('nativewind/metro')

const defaultConfig = getDefaultConfig(__dirname)
const { assetExts, sourceExts } = defaultConfig.resolver

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    // зберігаємо дефолтні розширення, лише видаляємо svg
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
    // додаємо alias, щоб Metro бачив '@/'
    extraNodeModules: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
}

// 👇 Оце ключовий момент
module.exports = withNativeWind(mergeConfig(defaultConfig, config), {
  input: './global.css',
})
