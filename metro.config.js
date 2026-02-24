const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add src directory to watchFolders
config.watchFolders = [path.resolve(__dirname, 'src')];

// Configure resolver for path aliases
config.resolver.extraNodeModules = {
  '@/app-pages': path.resolve(__dirname, 'src/app-pages'),
  '@/widgets': path.resolve(__dirname, 'src/widgets'),
  '@/features': path.resolve(__dirname, 'src/features'),
  '@/entities': path.resolve(__dirname, 'src/entities'),
  '@/shared': path.resolve(__dirname, 'src/shared'),
  '@/core': path.resolve(__dirname, 'src/core'),
};

// Ensure node_modules resolution works
config.resolver.nodeModulesPaths = [path.resolve(__dirname, 'node_modules')];

module.exports = withNativeWind(config, { input: './global.css' });
