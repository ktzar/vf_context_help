import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
    plugins: [react()],
    lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(__dirname, 'src/inject.jsx'),
        name: 'VF Context',
        // the proper extensions will be added
        fileName: 'vf-context'
      },
    build: {
        rollupOptions: {
            output: {
                assetFileNames: 'assets/[name]safsdkhfsdk-[hash][extname]'
            }
        },
    },
    server: {
    },
    define: {
        'global': {},
        '__APP_VERSION__': JSON.stringify(process.env.npm_package_version),
    },
})
