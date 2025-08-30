import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ command }) => {
  const isProduction = command === 'build';
  
  return {
    base: '/',
    publicDir: 'public',
    plugins: [react()],
    server: {
      port: 3000,
      host: '0.0.0.0',
      open: true,
      strictPort: true,
      hmr: {
        host: 'localhost',
        port: 3000,
        protocol: 'ws',
      },
      headers: {
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Opener-Policy': 'same-origin',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; img-src 'self' data: blob: https:; connect-src 'self' https:;",
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), fullscreen=()',
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      assetsInlineLimit: 0, // Ensure all assets are copied as files
      copyPublicDir: true, // Ensure public directory is copied
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
        output: {
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: (assetInfo) => {
            // Keep images in the root directory
            if (/\.(jpe?g|png|gif|svg|webp|avif)$/i.test(assetInfo.name)) {
              return '[name][extname]';
            }
            // Other assets in assets directory
            return 'assets/[name].[hash][extname]';
          },
        },
      },
    },
  };
});
