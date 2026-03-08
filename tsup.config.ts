import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  esbuildOptions(options) {
    options.alias = {
      '@/types': './src/types',
      '@/common': './src/common',
      '@/modules': './src/modules',
      '@/data': './data',
      '@/images': './images',
    };
  },
});
