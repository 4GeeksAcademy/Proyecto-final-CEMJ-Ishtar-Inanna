import {
    defineConfig
} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    assetsInclude: ["**/*.JPG", "**/*.jpg", "**/*.png"],
    plugins: [react()],
    server: {
        port: 3000,
        host: true
    },
    build: {
        outDir: 'dist'
    }
})