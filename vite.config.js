// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })



// Proxcy setup

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5174',
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// });





// proxcy setup and https configuration -Si:

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import mkcert from 'vite-plugin-mkcert';

// export default defineConfig({
//   plugins: [react(), mkcert()],
//   server: {
//     https: true,

//   },
// });


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    https: true, // keep HTTPS since your app runs on https://localhost:5173
   
    proxy: {
      '/api': {
        target: 'http://localhost:5288', // your .NET backend URL
        changeOrigin: true,
        secure: false, // disable SSL check since backend runs on HTTP
      },
    },
  },
});
