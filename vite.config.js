import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
    plugins: [react()],
    build: {
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'src/inject.jsx'),
            name: 'VF Context',
            // the proper extensions will be added
            fileName: 'vf-context'
        },
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
        'process.env': {}
    },
})
