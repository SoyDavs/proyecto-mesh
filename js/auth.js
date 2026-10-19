/* =======================================================
   MÓDULO DE AUTENTICACIÓN & CIBERSEGURIDAD DE ESTUDIANTES
   Plataforma Educativa Mesh - Control de Acceso y Quizzes
   ======================================================= */

(function () {
    const KEY_ESTUDIANTES = "mesh_estudiantes_db";
    const KEY_SESION = "mesh_estudiante_sesion";

    // Limpiar únicamente objetos y registros de prueba artificiales (id demo_ o esDemo)
    function limpiarEstudiantesDemo(lista) {
        if (!Array.isArray(lista)) return [];
        return lista.filter(u => {
            if (u.id && String(u.id).startsWith("demo_")) return false;
            if (u.esDemo === true) return false;
            return true;
        });
    }

    // Inicializar base de datos de estudiantes en localStorage si no existe
    function obtenerEstudiantes() {
        try {
            const raw = localStorage.getItem(KEY_ESTUDIANTES);
            if (!raw) return [];
            let lista = JSON.parse(raw);
            if (!Array.isArray(lista)) return [];
            const filtrada = limpiarEstudiantesDemo(lista);
            if (filtrada.length !== lista.length) {
                localStorage.setItem(KEY_ESTUDIANTES, JSON.stringify(filtrada));
            }
            return filtrada;
        } catch (e) {
            console.error("Error al leer estudiantes de localStorage:", e);
            return [];
        }
    }

    function guardarEstudiantes(lista) {
        try {
            localStorage.setItem(KEY_ESTUDIANTES, JSON.stringify(lista));
        } catch (e) {
            console.error("Error al guardar estudiantes en localStorage:", e);
        }
    }

    function obtenerEstudianteActivo() {
        try {
            const raw = localStorage.getItem(KEY_SESION);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            console.error("Error al leer sesión activa:", e);
            return null;
        }
    }

    function establecerSesion(estudiante) {
        try {
            localStorage.setItem(KEY_SESION, JSON.stringify(estudiante));
        } catch (e) {
            console.error("Error al guardar sesión activa:", e);
        }
    }

    function cerrarSesionEstudiante() {
        localStorage.removeItem(KEY_SESION);
        actualizarHeaderUsuario();
        const hash = window.location.hash;
        if (hash.startsWith("#actividades")) {
            if (typeof crearActividades === "function") {
                crearActividades();
            }
        } else if (hash.startsWith("#docente")) {
            if (typeof renderizarPanelDocente === "function") {
                renderizarPanelDocente();
            }
        }
    }

    // Estado interno del flujo de recuperación
    let recuperacionPendiente = null;
    let quizPendiente = null;

    /* =======================================================
       MODAL DE AUTENTICACIÓN & VISTAS
       ======================================================= */

    function abrirModalAuth(modo = "login", quizTipo = null) {
        if (quizTipo) {
            quizPendiente = quizTipo;
        }

        cerrarModalAuth();

        const overlay = document.createElement("div");
        overlay.id = "modal-auth-overlay";
        overlay.className = "modal-auth-overlay";
        overlay.innerHTML = `
            <div class="modal-auth-container" id="modal-auth-card">
                <button class="modal-close-btn" onclick="Auth.cerrarModal()" title="Cerrar ventana">
                    ${icon('x', 18)}
                </button>
                <div class="modal-auth-body" id="modal-auth-content">
                    <!-- CONTENIDO DINÁMICO SEGÚN EL MODO -->
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        cambiarVistaModal(modo);

        // Cerrar al hacer clic fuera del card
        overlay.addEventListener("click", function (e) {
            if (e.target === overlay) {
                cerrarModalAuth();
            }
        });
    }

    function cerrarModalAuth() {
        const overlay = document.getElementById("modal-auth-overlay");
        if (overlay) {
            overlay.remove();
        }
    }

    function cambiarVistaModal(vista, datosExtra = {}) {
        const contenedor = document.getElementById("modal-auth-content");
        if (!contenedor) return;

        switch (vista) {
            case "login":
                renderizarVistaLogin(contenedor);
                break;
            case "registro":
                renderizarVistaRegistro(contenedor);
                break;
            case "recuperar":
                renderizarVistaRecuperar(contenedor);
                break;
            case "simulador_correo":
                renderizarVistaSimuladorCorreo(contenedor, datosExtra);
                break;
            case "accion_bloqueada":
                renderizarVistaAccionBloqueada(contenedor, datosExtra);
                break;
            case "nueva_password":
                renderizarVistaNuevaPassword(contenedor, datosExtra);
                break;
            default:
                renderizarVistaLogin(contenedor);
                break;
        }
    }

    /* -------------------------------------------------------
       VISTA 1: INICIAR SESIÓN
       ------------------------------------------------------- */
    function renderizarVistaLogin(contenedor) {
        contenedor.innerHTML = `
            <div class="modal-auth-header">
                <div class="modal-auth-icono">
                    ${icon('lock', 26)}
                </div>
                <h2>Acceso de Estudiantes</h2>
                <p>Ingresa con tu correo y contraseña para realizar los cuestionarios y guardar tus puntajes.</p>
            </div>

            <div class="auth-tabs">
                <button type="button" class="auth-tab active">
                    ${icon('user', 14)} Iniciar Sesión
                </button>
                <button type="button" class="auth-tab" onclick="Auth.cambiarVista('registro')">
                    ${icon('check', 14)} Registrarse
                </button>
            </div>

            <div id="auth-alerta-box"></div>

            <form id="form-login" onsubmit="Auth.procesarLogin(event)">
                <div class="form-grupo">
                    <label for="login-correo">
                        ${icon('user', 14)} Correo Electrónico
                    </label>
                    <div class="input-con-icono">
                        <input type="email" id="login-correo" required placeholder="ejemplo: estudiante@colegio.edu.co" autocomplete="email">
                    </div>
                </div>

                <div class="form-grupo">
                    <label for="login-password">
                        ${icon('key', 14)} Contraseña
                    </label>
                    <div class="input-con-icono">
                        <input type="password" id="login-password" required placeholder="Ingresa tu contraseña" autocomplete="current-password">
                    </div>
                </div>

                <div class="olvido-clave-wrap">
                    <button type="button" class="btn-link-olvido" onclick="Auth.cambiarVista('recuperar')">
                        ¿Olvidaste tu contraseña?
                    </button>
                </div>

                <button type="submit" class="btn-auth-submit">
                    ${icon('zap', 16)}
                    <span>Ingresar a los Cuestionarios</span>
                </button>
            </form>
        `;
    }

    /* -------------------------------------------------------
       VISTA 2: REGISTRO DE ESTUDIANTE
       ------------------------------------------------------- */
    function renderizarVistaRegistro(contenedor) {
        contenedor.innerHTML = `
            <div class="modal-auth-header">
                <div class="modal-auth-icono">
                    ${icon('shield-check', 26)}
                </div>
                <h2>Registro de Usuario</h2>
                <p>Crea tu cuenta seleccionando si eres Estudiante, Docente o Invitado para realizar las actividades.</p>
            </div>

            <div class="auth-tabs">
                <button type="button" class="auth-tab" onclick="Auth.cambiarVista('login')">
                    ${icon('user', 14)} Iniciar Sesión
                </button>
                <button type="button" class="auth-tab active">
                    ${icon('check', 14)} Registrarse
                </button>
            </div>

            <div id="auth-alerta-box"></div>

            <form id="form-registro" onsubmit="Auth.procesarRegistro(event)">
                <div class="form-grupo">
                    <label for="reg-nombre">
                        ${icon('user', 14)} Nombre y Apellido
                    </label>
                    <div class="input-con-icono">
                        <input type="text" id="reg-nombre" required placeholder="ej: Juan Camilo Pérez" autocomplete="name">
                    </div>
                </div>

                <div class="form-grupo">
                    <label for="reg-rol">
                        ${icon('user', 14)} Tipo de Usuario (Rol)
                    </label>
                    <div class="input-con-icono">
                        <select id="reg-rol" required>
                            <option value="Estudiante" selected>Estudiante</option>
                            <option value="Docente">Docente</option>
                            <option value="Invitado">Invitado</option>
                        </select>
                    </div>
                </div>

                <div class="form-grupo">
                    <label for="reg-correo">
                        ${icon('user', 14)} Correo Electrónico
                    </label>
                    <div class="input-con-icono">
                        <input type="email" id="reg-correo" required placeholder="tu.correo@colegio.edu.co" autocomplete="email">
                    </div>
                </div>

                <div class="form-grupo">
                    <label for="reg-password">
                        ${icon('lock', 14)} Contraseña que crearás
                    </label>
                    <div class="input-con-icono">
                        <input type="password" id="reg-password" required minlength="6" placeholder="Mínimo 6 caracteres" autocomplete="new-password">
                    </div>
                    <span class="form-ayuda">Crea una clave segura que recuerdes fácilmente.</span>
                </div>

                <button type="submit" class="btn-auth-submit">
                    ${icon('check-circle', 16)}
                    <span>Completar Registro e Iniciar</span>
                </button>
            </form>
        `;
    }

    /* -------------------------------------------------------
       VISTA 3: SOLICITAR RECUPERACIÓN DE CONTRASEÑA
       ------------------------------------------------------- */
    function renderizarVistaRecuperar(contenedor) {
        contenedor.innerHTML = `
            <div class="modal-auth-header">
                <div class="modal-auth-icono">
                    ${icon('shield', 26)}
                </div>
                <h2>Recuperar Contraseña</h2>
                <p>Escribe tu correo registrado. Te enviaremos un mensaje de seguridad para verificar tu identidad antes de cambiar la clave.</p>
            </div>

            <div id="auth-alerta-box"></div>

            <form id="form-recuperar" onsubmit="Auth.procesarSolicitudRecuperacion(event)">
                <div class="form-grupo">
                    <label for="rec-correo">
                        ${icon('user', 14)} Correo Electrónico Registrado
                    </label>
                    <div class="input-con-icono">
                        <input type="email" id="rec-correo" required placeholder="tu.correo@colegio.edu.co" autocomplete="email">
                    </div>
                </div>

                <button type="submit" class="btn-auth-submit">
                    ${icon('arrow-right', 16)}
                    <span>Enviar Notificación de Seguridad</span>
                </button>
            </form>

            <div style="text-align: center; margin-top: 20px;">
                <button type="button" class="btn-link-olvido" onclick="Auth.cambiarVista('login')">
                    ← Volver a Iniciar Sesión
                </button>
            </div>
        `;
    }

    /* -------------------------------------------------------
       VISTA 4: BANDEJA DE CORREO / MENSAJE DE VERIFICACIÓN
       (Simulador oficial de correo de ciberseguridad)
       ------------------------------------------------------- */
    function renderizarVistaSimuladorCorreo(contenedor, datos) {
        const est = datos.estudiante;

        contenedor.innerHTML = `
            <div class="modal-auth-header">
                <div class="modal-auth-icono">
                    ${icon('shield-check', 26)}
                </div>
                <h2>Notificación de Seguridad en tu Correo</h2>
                <p>Simulador de Mensaje recibido en la bandeja de entrada de <strong>${est.correo}</strong>.</p>
            </div>

            <!-- CARD ESTILO CORREO DE SEGURIDAD -->
            <div class="simulador-correo-box">
                <div class="correo-meta">
                    <div class="correo-meta-fila">
                        <span class="correo-meta-label">De:</span>
                        <span>seguridad@mesh-plataforma.edu.co (Equipo de Ciberseguridad Mesh)</span>
                    </div>
                    <div class="correo-meta-fila">
                        <span class="correo-meta-label">Para:</span>
                        <span>${est.nombre} &lt;${est.correo}&gt; (${est.rol || est.grado || 'Usuario'})</span>
                    </div>
                    <div class="correo-meta-fila">
                        <span class="correo-meta-label">Asunto:</span>
                        <span class="correo-asunto">Alerta de Seguridad: Solicitud de cambio de contraseña</span>
                    </div>
                </div>

                <div class="correo-mensaje">
                    <p style="margin-bottom: 12px;">Hola, <strong>${est.nombre}</strong> (Registrado/a como <strong>${est.rol || est.grado || 'Usuario'}</strong>):</p>
                    <p style="margin-bottom: 12px;">
                        Hemos recibido una solicitud para cambiar la contraseña de tu cuenta en Mesh.
                        Por políticas de ciberdefensa y protección de identidad, requerimos que confirmes si eres tú quien solicitó este cambio.
                    </p>
                    <div class="correo-pregunta-alerta">
                        ¿Fuiste tú quien solicitó cambiar la contraseña de tu cuenta?
                    </div>
                </div>

                <div class="correo-acciones">
                    <button type="button" class="btn-confirmar-yo" onclick="Auth.responderVerificacion(true)">
                        ${icon('check-circle', 18)}
                        <span>SÍ, SOY YO (Deseo cambiar mi contraseña)</span>
                    </button>

                    <button type="button" class="btn-bloquear-no-fui" onclick="Auth.responderVerificacion(false)">
                        ${icon('alert-triangle', 18)}
                        <span>NO, NO FUI YO (Bloquear solicitud de inmediato)</span>
                    </button>
                </div>
            </div>
        `;
    }

    /* -------------------------------------------------------
       VISTA 5: ACCIÓN BLOQUEADA POR CIBERDEFENSA
       (Cuando el estudiante responde "NO, NO FUI YO")
       ------------------------------------------------------- */
    function renderizarVistaAccionBloqueada(contenedor, datos) {
        const est = datos.estudiante;

        contenedor.innerHTML = `
            <div class="accion-bloqueada-box">
                <div class="bloqueo-icono">
                    ${icon('alert-triangle', 38)}
                </div>
                <h3>ACCIÓN BLOQUEADA POR CIBERDEFENSA</h3>
                <p>
                    Has indicado que <strong>no solicitaste cambiar la contraseña</strong>.
                    Por motivos de ciberseguridad, el sistema ha cancelado y <strong>bloqueado permanentemente</strong> esta solicitud para tu cuenta (<strong>${est.correo}</strong>).
                </p>
                <div class="auth-alerta error" style="text-align: left; margin-bottom: 24px;">
                    ${icon('shield', 22)}
                    <div>
                        <strong>Tu contraseña actual no ha sido modificada</strong> y permanece totalmente protegida. Nadie podrá cambiarla sin tu autorización explícita.
                    </div>
                </div>
                <button type="button" class="btn-auth-submit" onclick="Auth.cerrarModal()">
                    ${icon('check', 16)} Entendido y protegido
                </button>
            </div>
        `;
    }

    /* -------------------------------------------------------
       VISTA 6: DEFINIR NUEVA CONTRASEÑA
       (Cuando el estudiante confirma "SÍ, SOY YO")
       ------------------------------------------------------- */
    function renderizarVistaNuevaPassword(contenedor, datos) {
        const est = datos.estudiante;

        contenedor.innerHTML = `
            <div class="modal-auth-header">
                <div class="modal-auth-icono">
                    ${icon('key', 26)}
                </div>
                <h2>Crea tu Nueva Contraseña</h2>
                <p>Identidad confirmada para <strong>${est.nombre}</strong> (${est.rol || est.grado || 'Usuario'}). Ingresa tu nueva contraseña para reactivar tu cuenta.</p>
            </div>

            <div id="auth-alerta-box"></div>

            <form id="form-nueva-pass" onsubmit="Auth.procesarCambioPassword(event)">
                <div class="form-grupo">
                    <label for="nueva-password">
                        ${icon('lock', 14)} Nueva Contraseña
                    </label>
                    <div class="input-con-icono">
                        <input type="password" id="nueva-password" required minlength="6" placeholder="Mínimo 6 caracteres" autocomplete="new-password">
                    </div>
                </div>

                <div class="form-grupo">
                    <label for="conf-password">
                        ${icon('check', 14)} Confirma tu Nueva Contraseña
                    </label>
                    <div class="input-con-icono">
                        <input type="password" id="conf-password" required minlength="6" placeholder="Repite la nueva contraseña" autocomplete="new-password">
                    </div>
                </div>

                <button type="submit" class="btn-auth-submit">
                    ${icon('check-circle', 16)}
                    <span>Guardar Nueva Contraseña e Ingresar</span>
                </button>
            </form>
        `;
    }

    /* =======================================================
       CONTROLADORES DE FORMULARIOS & LÓGICA DE NEGOCIO
       ======================================================= */

    function mostrarAlerta(tipo, mensaje) {
        const box = document.getElementById("auth-alerta-box");
        if (!box) return;
        box.innerHTML = `
            <div class="auth-alerta ${tipo}">
                ${tipo === 'error' ? icon('alert-circle', 18) : (tipo === 'exito' ? icon('check-circle', 18) : icon('shield', 18))}
                <span>${mensaje}</span>
            </div>
        `;
    }

    function procesarLogin(e) {
        e.preventDefault();
        const correo = document.getElementById("login-correo").value.trim().toLowerCase();
        const pass = document.getElementById("login-password").value;

        const estudiantes = obtenerEstudiantes();
        const estudiante = estudiantes.find(u => u.correo.toLowerCase() === correo && u.password === pass);

        if (!estudiante) {
            mostrarAlerta("error", "Correo o contraseña incorrectos. Si olvidaste tu clave, utiliza el enlace abajo.");
            return;
        }

        establecerSesion(estudiante);
        cerrarModalAuth();
        actualizarHeaderUsuario();

        // Si es docente y no había un quiz en cola, navegar al Panel Docente
        const esDocenteLogin = estudiante.rol === "Docente" || (typeof estudiante.rol === "string" && estudiante.rol.toLowerCase().includes("docente"));
        if (esDocenteLogin && !quizPendiente) {
            if (typeof navegar === "function") {
                navegar("docente");
            } else if (typeof renderizarPanelDocente === "function") {
                renderizarPanelDocente();
            }
            return;
        }

        // Si es estudiante y estaba en #docente, redirigir a actividades
        if (!esDocenteLogin && window.location.hash.startsWith("#docente")) {
            if (typeof navegar === "function") {
                navegar("actividades");
            }
            return;
        }

        // Si había un quiz pendiente por iniciar, lanzarlo directamente
        if (quizPendiente) {
            const q = quizPendiente;
            quizPendiente = null;
            if (typeof iniciarQuiz === "function") {
                iniciarQuiz(q);
            }
        } else if (window.location.hash.startsWith("#actividades") && typeof crearActividades === "function") {
            crearActividades();
        } else if (window.location.hash.startsWith("#docente") && typeof renderizarPanelDocente === "function") {
            renderizarPanelDocente();
        }
    }

    function procesarRegistro(e) {
        e.preventDefault();
        const nombreInput = document.getElementById("reg-nombre");
        const nombre = nombreInput ? nombreInput.value.trim() : "";

        const rolEl = document.getElementById("reg-rol") || document.getElementById("reg-grado");
        const rol = (rolEl && rolEl.value) ? rolEl.value : "Estudiante";

        const correoInput = document.getElementById("reg-correo");
        const correo = correoInput ? correoInput.value.trim().toLowerCase() : "";

        const passInput = document.getElementById("reg-password");
        const pass = passInput ? passInput.value : "";

        if (!nombre || !correo || !pass) {
            mostrarAlerta("error", "Por favor completa todos los campos requeridos.");
            return;
        }

        if (pass.length < 6) {
            mostrarAlerta("error", "La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        const estudiantes = obtenerEstudiantes();
        const yaExiste = estudiantes.find(u => u.correo && u.correo.toLowerCase() === correo);

        if (yaExiste) {
            mostrarAlerta("error", "Ya existe un usuario registrado con este correo. Inicia sesión o recupera tu contraseña.");
            return;
        }

        const nuevoEstudiante = {
            id: "usr_" + Date.now(),
            nombre: nombre,
            rol: rol,
            grado: rol,
            correo: correo,
            password: pass,
            fechaRegistro: new Date().toISOString(),
            historialQuizzes: []
        };

        estudiantes.push(nuevoEstudiante);
        guardarEstudiantes(estudiantes);
        establecerSesion(nuevoEstudiante);

        // Guardar en Base de Datos SQLite (mesh.db) vía WebAssembly
        if (window.MeshSQLite && typeof window.MeshSQLite.guardarUsuario === "function") {
            window.MeshSQLite.guardarUsuario(nuevoEstudiante);
        }

        // Notificar actualización de usuarios a observadores
        try {
            window.dispatchEvent(new CustomEvent("mesh_usuarios_actualizados", { detail: nuevoEstudiante }));
        } catch (err) {}

        cerrarModalAuth();
        actualizarHeaderUsuario();

        // Si se registró como docente y no había un quiz en cola, navegar al Panel Docente
        const esDocenteReg = nuevoEstudiante.rol === "Docente" || (typeof nuevoEstudiante.rol === "string" && nuevoEstudiante.rol.toLowerCase().includes("docente"));
        if (esDocenteReg && !quizPendiente) {
            if (typeof navegar === "function") {
                navegar("docente");
            } else if (typeof renderizarPanelDocente === "function") {
                renderizarPanelDocente();
            }
            return;
        }

        // Si es estudiante y estaba en #docente, redirigir a la zona de actividades
        if (!esDocenteReg && window.location.hash.startsWith("#docente")) {
            if (typeof navegar === "function") {
                navegar("actividades");
            }
            return;
        }

        // Si había un quiz pendiente por iniciar, lanzarlo directamente
        if (quizPendiente) {
            const q = quizPendiente;
            quizPendiente = null;
            if (typeof iniciarQuiz === "function") {
                iniciarQuiz(q);
            }
        } else if (window.location.hash.startsWith("#actividades") && typeof crearActividades === "function") {
            crearActividades();
        } else if (window.location.hash.startsWith("#docente") && typeof renderizarPanelDocente === "function") {
            renderizarPanelDocente();
        }
    }

    function procesarSolicitudRecuperacion(e) {
        e.preventDefault();
        const correo = document.getElementById("rec-correo").value.trim().toLowerCase();
        const estudiantes = obtenerEstudiantes();
        const estudiante = estudiantes.find(u => u.correo.toLowerCase() === correo);

        if (!estudiante) {
            mostrarAlerta("error", "No se encontró ningún estudiante registrado con este correo electrónico.");
            return;
        }

        recuperacionPendiente = {
            estudiante: estudiante,
            fecha: new Date()
        };

        cambiarVistaModal("simulador_correo", { estudiante: estudiante });
    }

    function responderVerificacion(esElMismo) {
        if (!recuperacionPendiente || !recuperacionPendiente.estudiante) {
            cerrarModalAuth();
            return;
        }

        const est = recuperacionPendiente.estudiante;

        if (esElMismo) {
            // SÍ ES ÉL: Permitir cambiar la contraseña
            cambiarVistaModal("nueva_password", { estudiante: est });
        } else {
            // NO FUI YO: BLOQUEAR LA ACCIÓN INMEDIATAMENTE
            recuperacionPendiente = null;
            cambiarVistaModal("accion_bloqueada", { estudiante: est });
        }
    }

    function procesarCambioPassword(e) {
        e.preventDefault();
        const nueva = document.getElementById("nueva-password").value;
        const conf = document.getElementById("conf-password").value;

        if (nueva.length < 6) {
            mostrarAlerta("error", "La nueva contraseña debe tener al menos 6 caracteres.");
            return;
        }

        if (nueva !== conf) {
            mostrarAlerta("error", "Las contraseñas no coinciden. Por favor verifícalas.");
            return;
        }

        if (!recuperacionPendiente || !recuperacionPendiente.estudiante) {
            mostrarAlerta("error", "Error de sesión. Intenta nuevamente.");
            return;
        }

        const correo = recuperacionPendiente.estudiante.correo.toLowerCase();
        const estudiantes = obtenerEstudiantes();
        const index = estudiantes.findIndex(u => u.correo.toLowerCase() === correo);

        if (index === -1) {
            mostrarAlerta("error", "Estudiante no encontrado.");
            return;
        }

        // Actualizar contraseña en almacenamiento local y SQLite
        estudiantes[index].password = nueva;
        guardarEstudiantes(estudiantes);

        if (window.MeshSQLite && typeof window.MeshSQLite.actualizarPassword === "function") {
            window.MeshSQLite.actualizarPassword(correo, nueva);
        }

        establecerSesion(estudiantes[index]);

        recuperacionPendiente = null;
        cerrarModalAuth();
        actualizarHeaderUsuario();

        if (window.location.hash.startsWith("#actividades") && typeof crearActividades === "function") {
            crearActividades();
        }
    }

    /* =======================================================
       REGISTRO DE CALIFICACIONES EN EL PERFIL
       ======================================================= */
    function guardarResultadoQuizEstudiante(tipo, puntos, total, porcentaje, detalles = []) {
        const activo = obtenerEstudianteActivo();
        if (!activo) return;

        const estudiantes = obtenerEstudiantes();
        const index = estudiantes.findIndex(u => 
            (u.id && activo.id && u.id === activo.id) ||
            (u.correo && activo.correo && u.correo.trim().toLowerCase() === activo.correo.trim().toLowerCase())
        );
        if (index === -1) return;

        if (!Array.isArray(estudiantes[index].historialQuizzes)) {
            estudiantes[index].historialQuizzes = [];
        }

        const titulos = {
            seguridad: "Seguridad Digital",
            redes: "Redes & Conectividad",
            cableado: "Cableado Estructurado",
            general1: "Cuestionario General 1",
            general2: "Cuestionario General 2"
        };

        const registro = {
            id: "intento_" + Date.now(),
            tipo: tipo,
            titulo: titulos[tipo] || tipo,
            puntos: puntos,
            fallos: total - puntos,
            total: total,
            porcentaje: porcentaje,
            detalles: detalles || [],
            fecha: new Date().toISOString()
        };

        estudiantes[index].historialQuizzes.push(registro);
        guardarEstudiantes(estudiantes);

        // Guardar resultado del intento en SQLite (mesh.db)
        if (window.MeshSQLite && typeof window.MeshSQLite.guardarIntentoQuiz === "function") {
            window.MeshSQLite.guardarIntentoQuiz(registro, estudiantes[index]);
        }

        // Actualizar sesión activa
        establecerSesion(estudiantes[index]);

        // Notificar en tiempo real a observadores de actualización de intento
        try {
            window.dispatchEvent(new CustomEvent("mesh_usuarios_actualizados", { detail: estudiantes[index] }));
        } catch (err) {}
    }

    /* =======================================================
       ACTUALIZAR CHIP DE USUARIO EN EL HEADER
       ======================================================= */
    function actualizarHeaderUsuario() {
        const nav = document.getElementById("nav-menu");
        if (!nav) return;

        let badge = document.getElementById("nav-auth-user");
        let linkDocente = document.getElementById("nav-link-docente");
        const activo = obtenerEstudianteActivo();

        if (activo) {
            const primerNombre = (activo.nombre || "Usuario").split(" ")[0];
            const rol = activo.rol || activo.grado || "Usuario";
            const esDocente = rol === "Docente" || (typeof rol === "string" && rol.toLowerCase().includes("docente"));

            // El botón de Panel Docente en el menú SÓLO se muestra para usuarios con rol Docente
            if (esDocente) {
                if (!linkDocente) {
                    linkDocente = document.createElement("a");
                    linkDocente.id = "nav-link-docente";
                    linkDocente.href = "#docente";
                    linkDocente.className = "nav-link-docente";
                    linkDocente.setAttribute("data-nav", "docente");
                    linkDocente.onclick = function (e) {
                        e.preventDefault();
                        if (typeof navegar === "function") navegar("docente");
                        if (typeof closeMenu === "function") closeMenu();
                    };
                    linkDocente.innerHTML = `${icon('award', 16)} Panel Docente`;
                    nav.appendChild(linkDocente);
                }
            } else if (linkDocente) {
                linkDocente.remove();
            }

            if (!badge) {
                badge = document.createElement("div");
                badge.id = "nav-auth-user";
                nav.appendChild(badge);
            }

            badge.innerHTML = `
                <div class="header-estudiante-chip ${esDocente ? 'header-docente-chip' : ''}" 
                     onclick="Auth.abrirModal('login')" 
                     title="Usuario identificado: ${activo.nombre} (${rol})">
                    ${esDocente ? icon('award', 14) : icon('user', 14)}
                    <span>${esDocente ? 'Prof. ' : ''}${primerNombre} (${rol})</span>
                </div>
            `;
        } else {
            if (badge) badge.remove();
            if (linkDocente) linkDocente.remove();
        }
    }

    // Exponer API global
    window.Auth = {
        obtenerEstudianteActivo,
        obtenerEstudiantes,
        cerrarSesion: cerrarSesionEstudiante,
        abrirModal: abrirModalAuth,
        cerrarModal: cerrarModalAuth,
        cambiarVista: cambiarVistaModal,
        procesarLogin,
        procesarRegistro,
        procesarSolicitudRecuperacion,
        responderVerificacion,
        procesarCambioPassword,
        guardarResultadoQuizEstudiante,
        actualizarHeaderUsuario
    };

    // Alias directos para accesibilidad global
    window.obtenerEstudianteActivo = obtenerEstudianteActivo;
    window.obtenerEstudiantes = obtenerEstudiantes;
    window.cerrarSesionEstudiante = cerrarSesionEstudiante;
    window.abrirModalAuth = abrirModalAuth;
    window.guardarResultadoQuizEstudiante = guardarResultadoQuizEstudiante;

    // Escuchar eventos de carga para inicializar el estado del header
    window.addEventListener("DOMContentLoaded", actualizarHeaderUsuario);
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(actualizarHeaderUsuario, 50);
    }
})();
