import { defineConfig, loadEnv } from 'vite' // <-- Importez loadEnv ici
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// La configuration est maintenant une fonction asynchrone qui prend 'mode'
export default defineConfig(({ mode }) => {
  // 1. Chargez les variables d'environnement basées sur le mode actuel ('development', 'production', etc.)
  const env = loadEnv(mode, process.cwd(), '');

  // 2. Utilisez la variable chargée 'env' pour le proxy
  const apiUrl = env.VITE_API_URL;

  console.log("API URL:", apiUrl);

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: apiUrl, // Utilisez la variable correctement chargée
          changeOrigin: true,
          // Les headers ne sont généralement pas nécessaires pour le proxy lui-même,
          // ils sont envoyés par le client. Mais on les laisse pour l'exemple :
          headers: {
            Accept: 'application/json',
            "Content-type": 'application/json'
          }
        }
      }
    }
  };
});