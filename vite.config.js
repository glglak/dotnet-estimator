import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/dotnet-estimator/', // Replace with your exact repository name
  plugins: [react()],
});