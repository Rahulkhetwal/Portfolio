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
      sourcemap: isProduction ? false : 'inline',
      minify: isProduction ? 'esbuild' : false,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
        output: {
          entryFileNames: 'assets/js/[name].[hash].js',
          chunkFileNames: 'assets/js/[name].[hash].js',
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1].toLowerCase();
            
            if (/\.(png|jpe?g|svg|gif|webp|avif)$/i.test(assetInfo.name)) {
              return `assets/images/[name].[hash][extname]`;
            }
            if (/\.(woff|woff2|eot|ttf|otf)$/i.test(assetInfo.name)) {
              return `assets/fonts/[name].[hash][extname]`;
            }
            if (/\.css$/i.test(assetInfo.name)) {
              return `assets/css/[name].[hash][extname]`;
            }
            return `assets/[name].[hash][extname]`;
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
    define: {
      // Ensure environment variables are available in the client
      'import.meta.env.STREAMLIT_SERVER_BASE_URL': JSON.stringify(process.env.STREAMLIT_SERVER_BASE_URL || ''),
      'import.meta.env.STREAMLIT_SERVER_RUNNING_ON_CLOUD': JSON.stringify(process.env.STREAMLIT_SERVER_RUNNING_ON_CLOUD || 'false'),
    },
  };
});
