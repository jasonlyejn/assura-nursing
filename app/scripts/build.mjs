import { build } from 'esbuild';

await build({
  entryPoints: ['src/main.jsx'],
  bundle: true,
  format: 'esm',
  jsx: 'automatic',
  loader: { '.jsx': 'jsx' },
  outfile: 'public/app.js',
  minify: true,
  sourcemap: true,
  logLevel: 'info',
});
console.log('✓ built public/app.js');
