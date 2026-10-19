import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";


// CONFIGURACIÓN DE TU PROYECTO

const firebaseConfig = {

    apiKey: "AIzaSyCFp6fdt_GtUcWRokiOfNMTrlgT8ZA2hbU",

    authDomain: "mesh-babd2.firebaseapp.com",

    projectId: "mesh-babd2",

    storageBucket: "mesh-babd2.firebasestorage.app",

    messagingSenderId:
        "851764962783",

    appId: "1:851764962783:web:91d4e235292a54fdbb106a"

};


// INICIAR FIREBASE

const app =
    initializeApp(firebaseConfig);


// EXPORTAR LA APLICACIÓN

export { app };