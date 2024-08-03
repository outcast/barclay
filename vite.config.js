import { defineConfig } from "vite";

export default defineConfig({
    server: {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    }
});