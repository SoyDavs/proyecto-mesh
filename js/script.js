/* =======================================================
   SCRIPT PRINCIPAL & ENRUTADOR SPA (MESH)
   Gestión de navegación con soporte total para botón Atrás
   y Rediseño Completo de la Página Principal de Presentación.
   ======================================================= */

const app = document.getElementById("app");

app.innerHTML = `
    <div id="encabezado"></div>
    <main id="contenido"></main>
    <div id="piePagina"></div>
`;

// Inicializar Header y Footer
crearHeader();
crearFooter();

/* =======================================================
   ENRUTADOR SPA (SOPORTE TOTAL PARA BOTÓN ATRÁS / FORWARD)
   ======================================================= */

window.navegar = function (ruta, actualizarHash = true) {
    closeMenu();
    const nuevaHash = ruta.startsWith("#") ? ruta : "#" + ruta;
    if (actualizarHash) {
        if (window.location.hash === nuevaHash) {
            procesarRutaHash();
        } else {
            window.location.hash = nuevaHash;
        }
    } else {
        procesarRuta(ruta);
    }
};

window.volverA = function (rutaFallback) {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        navegar(rutaFallback);
    }
};

function procesarRutaHash() {
    const hashLimpio = window.location.hash.replace(/^#\/?/, "");
    procesarRuta(hashLimpio || "inicio");
}

function procesarRuta(rutaCompleta) {
    const partes = rutaCompleta.split("/");
    const seccion = partes[0] || "inicio";
    const subseccion = partes[1] || null;
    const subtema = partes[2] || null;

    // Actualizar clase activa en el menú de navegación
    actualizarMenuActivo(seccion);

    // Scroll al inicio suavemente
    window.scrollTo({ top: 0, behavior: "instant" });

    switch (seccion) {
        case "inicio":
            renderizarInicio();
            break;

        case "aprende":
            if (subseccion && typeof mostrarLeccion === "function") {
                mostrarLeccion(subseccion, subtema);
            } else if (typeof crearAprende === "function") {
                crearAprende();
            }
            break;

        case "seguridad":
            if (subseccion && typeof mostrarRiesgo === "function") {
                mostrarRiesgo(subseccion);
            } else if (typeof crearSeguridad === "function") {
                crearSeguridad();
            }
            break;

        case "redes":
            if (subseccion && typeof mostrarTemaRed === "function") {
                mostrarTemaRed(subseccion);
            } else if (typeof crearRedes === "function") {
                crearRedes();
            }
            break;


        case "actividades":
            if (subseccion === "docente" && typeof renderizarPanelDocente === "function") {
                renderizarPanelDocente();
            } else if (subseccion && typeof iniciarQuiz === "function") {
                iniciarQuiz(subseccion);
            } else if (typeof crearActividades === "function") {
                crearActividades();
            }
            break;

        case "docente":
            if (typeof renderizarPanelDocente === "function") {
                renderizarPanelDocente();
            }
            break;

        default:
            renderizarInicio();
            break;
    }
}

// Escuchar cambios de hash (botón atrás / adelante del navegador)
window.addEventListener("hashchange", procesarRutaHash);
window.addEventListener("DOMContentLoaded", procesarRutaHash);

// Si ya cargó la página, procesar ruta inicial
if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(procesarRutaHash, 10);
}

/* =======================================================
   HEADER & MENÚ RESPONSIVE
   ======================================================= */

function crearHeader() {
    const encabezado = document.getElementById("encabezado");
    if (!encabezado) return;

    encabezado.innerHTML = `
        <header>
            <div class="logo" onclick="navegar('inicio')">
                <img src="img/logo.jpeg" alt="Logo Mesh" class="imagen-circular">
                <div class="logo-texto">
                    <h2>Mesh</h2>
                    <span class="logo-sub">Protegiendo cada conexión</span>
                </div>
            </div>

            <div class="menu-toggle" id="mobile-menu" onclick="toggleMenu()" aria-label="Abrir menú">
                ${icon('menu', 28)}
            </div>

            <nav id="nav-menu">
                <a href="#inicio" onclick="navegar('inicio'); closeMenu();" data-nav="inicio">
                    ${icon('home', 16)} Inicio
                </a>
                <a href="#aprende" onclick="navegar('aprende'); closeMenu();" data-nav="aprende">
                    ${icon('book-open', 16)} Aprende
                </a>
                <a href="#seguridad" onclick="navegar('seguridad'); closeMenu();" data-nav="seguridad">
                    ${icon('shield', 16)} Seguridad
                </a>
                <a href="#redes" onclick="navegar('redes'); closeMenu();" data-nav="redes">
                    ${icon('network', 16)} Redes
                </a>
                <a href="#actividades" onclick="navegar('actividades'); closeMenu();" data-nav="actividades">
                    ${icon('gamepad', 16)} Actividades
                </a>
            </nav>
        </header>
    `;

    if (window.Auth && typeof window.Auth.actualizarHeaderUsuario === "function") {
        window.Auth.actualizarHeaderUsuario();
    }
}

function actualizarMenuActivo(seccionActiva) {
    const links = document.querySelectorAll("#nav-menu a");
    links.forEach(link => {
        if (link.getAttribute("data-nav") === seccionActiva) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

function toggleMenu() {
    const nav = document.getElementById("nav-menu");
    if (nav) {
        nav.classList.toggle("active");
    }
}

function closeMenu() {
    const nav = document.getElementById("nav-menu");
    if (nav) {
        nav.classList.remove("active");
    }
}

/* =======================================================
   PÁGINA PRINCIPAL DE PRESENTACIÓN (REDISEÑO COMPLETO)
   ======================================================= */

function renderizarInicio() {
    const contenido = document.getElementById("contenido");
    if (!contenido) return;

    contenido.innerHTML = `
        <!-- HERO SECTION (ENRIQUECIDO, BALANCEADO Y SIN VACÍOS) -->
        <section class="hero">
            <div class="heroTexto">
                
                <div class="hero-chip">
                    <span class="chip-dot"></span>
                    ${icon('shield-check', 15)} Plataforma Educativa Mesh • Ciberseguridad & Redes
                </div>

                <h1>
                    Seguridad Informática y Redes de Computación
                </h1>

                <p class="hero-descripcion">
                    Una plataforma interactiva diseñada para dominar la protección de datos, identificar ciberamenazas reales y comprender a fondo la arquitectura de redes desde los conceptos teóricos hasta la práctica evaluativa.
                </p>

                <div class="hero-botones">
                    <button class="btn-hero-primario" onclick="navegar('aprende')">
                        ${icon('book-open', 18)} Comenzar con Aprende
                        ${icon('arrow-right', 16)}
                    </button>
                    <button class="btn-hero-secundario" onclick="navegar('actividades')">
                        ${icon('gamepad', 18)} Zona de Desafíos
                    </button>
                </div>

                <!-- MÉTRICAS CLAVE PARA ENRIQUECER EL HERO -->
                <div class="hero-stats">
                    <div class="hero-stat-item">
                        <span class="hero-stat-num">4</span>
                        <span class="hero-stat-label">Módulos de Formación</span>
                    </div>
                    <div class="hero-stat-item">
                        <span class="hero-stat-num">100%</span>
                        <span class="hero-stat-label">Casos Reales y Prácticos</span>
                    </div>
                    <div class="hero-stat-item">
                        <span class="hero-stat-num">Inmediata</span>
                        <span class="hero-stat-label">Revisión y Feedback</span>
                    </div>
                </div>

            </div>

            <!-- LOGO PRESENTACIÓN CON BADGES DINÁMICOS -->
            <div class="heroImagen">
                <div class="hero-logo-box">
                    <div class="hero-badge badge-1">
                        ${icon('shield-check', 18)}
                        <span>Ciberdefensa Activa</span>
                    </div>

                    <img src="img/logo.jpeg" alt="Logo Mesh" class="imagen-circular hero-logo-img">

                    <div class="hero-badge badge-2">
                        ${icon('network', 18)}
                        <span>Redes & Cableado T568B</span>
                    </div>

                    <div class="hero-badge badge-3">
                        ${icon('gamepad', 18)}
                        <span>Quizzes Gamificados</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- SECCIÓN: MÓDULOS DE APRENDIZAJE (ORDEN ESTRICTO DEL ENCABEZADO) -->
        <section class="seccion-modulos">
            <div class="seccion-encabezado">
                <div class="seccion-tag">
                    ${icon('layers', 14)} Ruta de Formación Continua
                </div>
                <h2>Módulos Educativos de la Plataforma</h2>
                <p>Explora cada una de las secciones en el orden establecido en el menú superior para consolidar tus conocimientos de forma progresiva.</p>
            </div>

            <div class="cards-grid-presentacion">

                <!-- 1. APRENDE (PRIMER APARTADO DEL ENCABEZADO) -->
                <article class="card-modulo" onclick="navegar('aprende')">
                    <div>
                        <div class="card-modulo-top">
                            <div class="modulo-icono-box">
                                ${icon('book-open', 32)}
                            </div>
                            <span class="modulo-paso-badge">01 • Aprende</span>
                        </div>
                        <h3>Aprende: Fundamentos & Guías</h3>
                        <p>
                            Explora el menú teórico con conceptos clave, arquitecturas de red, glosario digital y lecciones estructuradas para construir una base sólida.
                        </p>
                        <div class="modulo-tags">
                            <span class="modulo-tag-item">${icon('check', 12)} Lecciones Guiadas</span>
                            <span class="modulo-tag-item">${icon('check', 12)} Conceptos Clave</span>
                            <span class="modulo-tag-item">${icon('check', 12)} Glosario Digital</span>
                        </div>
                    </div>
                    <button class="btn-modulo-action" onclick="event.stopPropagation(); navegar('aprende')">
                        <span>Ingresar a Aprende</span>
                        ${icon('arrow-right', 16)}
                    </button>
                </article>

                <!-- 2. SEGURIDAD (SEGUNDO APARTADO DEL ENCABEZADO) -->
                <article class="card-modulo" onclick="navegar('seguridad')">
                    <div>
                        <div class="card-modulo-top">
                            <div class="modulo-icono-box">
                                ${icon('shield-check', 32)}
                            </div>
                            <span class="modulo-paso-badge">02 • Seguridad</span>
                        </div>
                        <h3>Seguridad Informática</h3>
                        <p>
                            Aprende a reconocer y prevenir ciberamenazas críticas reales: Phishing, Ciberacoso, Robo de Identidad, Estafas Financieras y Protección de Datos.
                        </p>
                        <div class="modulo-tags">
                            <span class="modulo-tag-item">${icon('check', 12)} Phishing & Estafas</span>
                            <span class="modulo-tag-item">${icon('check', 12)} Privacidad Digital</span>
                            <span class="modulo-tag-item">${icon('check', 12)} Ciberdefensa</span>
                        </div>
                    </div>
                    <button class="btn-modulo-action" onclick="event.stopPropagation(); navegar('seguridad')">
                        <span>Explorar Seguridad</span>
                        ${icon('arrow-right', 16)}
                    </button>
                </article>

                <!-- 3. REDES (TERCER APARTADO DEL ENCABEZADO) -->
                <article class="card-modulo" onclick="navegar('redes')">
                    <div>
                        <div class="card-modulo-top">
                            <div class="modulo-icono-box">
                                ${icon('network', 32)}
                            </div>
                            <span class="modulo-paso-badge">03 • Redes</span>
                        </div>
                        <h3>Redes de Computación</h3>
                        <p>
                            Comprende cómo se comunican los dispositivos: routers, switches, topologías, direccionamiento IPv4, servidores DNS y cableado norma T568B.
                        </p>
                        <div class="modulo-tags">
                            <span class="modulo-tag-item">${icon('check', 12)} Routers & Switches</span>
                            <span class="modulo-tag-item">${icon('check', 12)} Direcciones IP</span>
                            <span class="modulo-tag-item">${icon('check', 12)} Norma T568B</span>
                        </div>
                    </div>
                    <button class="btn-modulo-action" onclick="event.stopPropagation(); navegar('redes')">
                        <span>Descubrir Redes</span>
                        ${icon('arrow-right', 16)}
                    </button>
                </article>

                <!-- 4. ACTIVIDADES (CUARTO APARTADO DEL ENCABEZADO) -->
                <article class="card-modulo" onclick="navegar('actividades')">
                    <div>
                        <div class="card-modulo-top">
                            <div class="modulo-icono-box">
                                ${icon('gamepad', 32)}
                            </div>
                            <span class="modulo-paso-badge">04 • Actividades</span>
                        </div>
                        <h3>Zona de Desafíos & Quizzes</h3>
                        <p>
                            Pon a prueba tus habilidades con preguntas de casos reales, cuestionarios temáticos, retos integrales de 10 preguntas y revisión con feedback detallado.
                        </p>
                        <div class="modulo-tags">
                            <span class="modulo-tag-item">${icon('check', 12)} Casos Situacionales</span>
                            <span class="modulo-tag-item">${icon('check', 12)} Quizzes Temáticos</span>
                            <span class="modulo-tag-item">${icon('check', 12)} Cuestionarios Generales</span>
                        </div>
                    </div>
                    <button class="btn-modulo-action" onclick="event.stopPropagation(); navegar('actividades')">
                        <span>Iniciar Desafíos</span>
                        ${icon('arrow-right', 16)}
                    </button>
                </article>

            </div>



            <!-- CALL TO ACTION BANNER -->
            <div class="inicio-cta">
                <div class="inicio-cta-tag">
                    ${icon('flame', 14)} Tu aprendizaje empieza aquí
                </div>
                <h3>¿Listo para potenciar tus habilidades digitales?</h3>
                <p>
                    Comienza explorando el módulo teórico Aprende o ponte a prueba directamente en los cuestionarios interactivos de Actividades.
                </p>
                <div class="inicio-cta-botones">
                    <button class="btn-cta-primario" onclick="navegar('aprende')">
                        ${icon('book-open', 18)} Comenzar con Aprende
                        ${icon('arrow-right', 16)}
                    </button>
                    <button class="btn-cta-secundario" onclick="navegar('actividades')">
                        ${icon('gamepad', 18)} Explorar Actividades
                    </button>
                </div>
            </div>

        </section>
    `;
}

// Wrapper para compatibilidad hacia atrás
function crearInicio() {
    navegar("inicio");
}

/* =======================================================
   FOOTER
   ======================================================= */

function crearFooter() {
    const pie = document.getElementById("piePagina");
    if (!pie) return;

    pie.innerHTML = `
        <footer>
            <div class="footer-contenido">
                <div class="footer-logo" onclick="navegar('inicio')">
                    <img src="img/logo.jpeg" alt="Logo Mesh" class="imagen-circular footer-logo-img">
                    <span>Mesh</span>
                </div>
                <p class="footer-desc">Plataforma Educativa de Seguridad Informática y Redes de Computación.</p>
                <p class="footer-copy">Mesh © 2026 • Todos los derechos reservados.</p>
            </div>
        </footer>
    `;
}