module.exports = (api) => {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@/app-pages': './src/app-pages',
            '@/widgets': './src/widgets',
            '@/features': './src/features',
            '@/entities': './src/entities',
            '@/shared': './src/shared',
            '@/core': './src/core',
          },
        },
      ],
      'react-native-reanimated/plugin', // Должен быть последним!
    ],
  };
};
