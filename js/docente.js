/* =======================================================
   PANEL DOCENTE - SEGUIMIENTO DE RESULTADOS DE ESTUDIANTES (MESH)
   Supervisión de calificaciones, conteo de intentos por cuestionario,
   resultados de cada intento (aciertos, fallos, porcentajes) y desglose.
   100% Vector React-Icons (Sin emojis) & Navegación SPA
   ======================================================= */

(function () {
    const CUESTIONARIOS_DEF = [
        { id: "seguridad", titulo: "Seguridad Digital", icono: "shield", totalPreguntas: 12 },
        { id: "redes", titulo: "Redes & Conectividad", icono: "network", totalPreguntas: 12 },
        { id: "cableado", titulo: "Cableado Estructurado", icono: "cable", totalPreguntas: 12 },
        { id: "general1", titulo: "Cuestionario General 1", icono: "file-text", totalPreguntas: 12 },
        { id: "general2", titulo: "Cuestionario General 2", icono: "file-text", totalPreguntas: 12 }
    ];

    let filtroTextoDocente = "";
    let filtroQuizDocente = "todos";
    let filtroEstadoDocente = "todos";
    let filtroRolDocente = "todos";
    let intentoSeleccionadoModal = null;
    let filtroModalPreguntas = "todas";

    // Limpieza de cualquier residuo de estudiantes de prueba artificiales (solo alumnos reales)
    function limpiarDemoResidual() {
        try {
            const raw = localStorage.getItem("mesh_estudiantes_db");
            if (!raw) return;
            const lista = JSON.parse(raw);
            if (!Array.isArray(lista)) return;

            const limpia = lista.filter(u => {
                if (u.id && String(u.id).startsWith("demo_")) return false;
                if (u.esDemo === true) return false;
                return true;
            });

            if (limpia.length !== lista.length) {
                localStorage.setItem("mesh_estudiantes_db", JSON.stringify(limpia));
            }
        } catch (e) {
            console.error("Error al limpiar demo:", e);
        }
    }

    /* =======================================================
       RENDERIZADO PRINCIPAL DEL PANEL DOCENTE
       ======================================================= */
    function renderizarPanelDocente() {
        limpiarDemoResidual();

        const contenido = document.getElementById("contenido");
        if (!contenido) return;

        const usuarioActivo = typeof obtenerEstudianteActivo === "function" ? obtenerEstudianteActivo() : null;

        // GUARD 1: No ha iniciado sesión
        if (!usuarioActivo) {
            contenido.innerHTML = `
                <section class="docente-section">
                    <div class="docente-guard-container">
                        <div class="docente-guard-icon">
                            ${icon('award', 38)}
                        </div>
                        <h2>Panel Exclusivo para Docentes</h2>
                        <p>
                            Este apartado permite a los profesores supervisar en tiempo real las calificaciones, 
                            el número de veces que cada estudiante realizó cada cuestionario, los aciertos, fallos y 
                            porcentajes obtenidos en cada intento.
                        </p>
                        <p style="color: #6eeeea; font-weight: 500; font-size: 0.95rem;">
                            Para acceder a este panel, debes iniciar sesión con una cuenta con rol de Docente.
                        </p>
                        <div class="docente-guard-actions">
                            <button class="btn-docente-action primary" onclick="Auth.abrirModal('login')">
                                ${icon('user', 16)} Iniciar Sesión como Docente
                            </button>
                            <button class="btn-docente-action" onclick="Auth.abrirModal('registro')">
                                ${icon('check-circle', 16)} Registrarse como Docente
                            </button>
                        </div>
                    </div>
                </section>
            `;
            return;
        }

        // GUARD 2: No tiene rol de docente (es estudiante o invitado)
        const rolUsuario = usuarioActivo.rol || usuarioActivo.grado || "";
        const esDocente = rolUsuario === "Docente" || (typeof rolUsuario === "string" && rolUsuario.toLowerCase().includes("docente"));
        if (!esDocente) {
            contenido.innerHTML = `
                <section class="docente-section">
                    <div class="docente-guard-container">
                        <div class="docente-guard-icon">
                            ${icon('alert-triangle', 38)}
                        </div>
                        <h2>Acceso Reservado para Docentes</h2>
                        <p>
                            Actualmente has iniciado sesión como <strong>${usuarioActivo.nombre}</strong> con el rol de 
                            <strong>${rolUsuario}</strong>.
                        </p>
                        <p style="color: #cbd5e1; font-size: 0.95rem;">
                            Este apartado de analítica, estadísticas pedagógicas y resultados de cuestionarios está 
                            reservado exclusivamente para usuarios registrados como <strong>Docente</strong>.
                        </p>
                        <div class="docente-guard-actions">
                            <button class="btn-docente-action primary" onclick="navegar('actividades')">
                                ${icon('gamepad', 16)} Ir a Zona de Desafíos y Quizzes
                            </button>
                            <button class="btn-docente-action" onclick="Auth.cerrarSesion(); Auth.abrirModal('login');">
                                ${icon('refresh', 16)} Cambiar a Cuenta de Docente
                            </button>
                        </div>
                    </div>
                </section>
            `;
            return;
        }

        // ACCESO AUTORIZADO: DOCENTE CONFIRMADO
        const todosLosUsuarios = typeof obtenerEstudiantes === "function" ? obtenerEstudiantes() : [];

        // REGLA DE VISIBILIDAD:
        // Los docentes solo pueden ver:
        // 1. Estudiantes registrados
        // 2. Invitados registrados
        // 3. Su propio perfil y resultados (él mismo)
        // EXCLUYENDO por completo los resultados de cualquier otro docente
        const estudiantes = obtenerUsuariosVisiblesParaDocente(todosLosUsuarios, usuarioActivo);

        // CONTAR EXACTAMENTE POR TIPO DE ROL
        const cantEstudiantes = estudiantes.filter(u => {
            const r = (u.rol || u.grado || "").toLowerCase();
            return !r.includes("docente") && !r.includes("invitado");
        }).length;

        const cantInvitados = estudiantes.filter(u => {
            const r = (u.rol || u.grado || "").toLowerCase();
            return r.includes("invitado");
        }).length;

        // CALCULAR MÉTRICAS GENERALES DE LOS ESTUDIANTES E INVITADOS
        // (Excluyendo los intentos propios del docente para no sesgar las calificaciones de la clase)
        const usuariosParaMetricas = estudiantes.filter(u => {
            const r = (u.rol || u.grado || "").toLowerCase();
            return !r.includes("docente");
        });
        const baseMetricas = usuariosParaMetricas.length > 0 ? usuariosParaMetricas : estudiantes;

        let totalIntentos = 0;
        let sumaPorcentajes = 0;
        let intentosAprobados = 0;

        baseMetricas.forEach(est => {
            const historial = Array.isArray(est.historialQuizzes) ? est.historialQuizzes : [];
            historial.forEach(intento => {
                totalIntentos++;
                sumaPorcentajes += (intento.porcentaje || 0);
                if ((intento.porcentaje || 0) >= 70) {
                    intentosAprobados++;
                }
            });
        });

        const promedioGeneral = totalIntentos > 0 ? Math.round(sumaPorcentajes / totalIntentos) : 0;
        const tasaAprobacion = totalIntentos > 0 ? Math.round((intentosAprobados / totalIntentos) * 100) : 0;

        contenido.innerHTML = `
            <section class="docente-section">

                <!-- ENCABEZADO DOCENTE -->
                <div class="docente-hero">
                    <div class="docente-hero-top">
                        <div>
                            <div class="docente-badge">
                                ${icon('award', 16)}
                                <span>Panel de Supervisión Académica • Docente: Prof. ${usuarioActivo.nombre}</span>
                            </div>
                            <h1>Resultados de Estudiantes por Cuestionario</h1>
                            <p>
                                Supervisa el rendimiento pedagógico de los estudiantes registrados: consulta cuántas veces realizaron 
                                cada cuestionario, los resultados individuales de cada intento (aciertos, fallos y porcentaje), y el 
                                desglose de preguntas.
                            </p>
                        </div>
                        <div class="docente-hero-actions">
                            <button class="btn-docente-action primary" id="btn-nuevo-estudiante-docente" onclick="Docente.abrirModalNuevoEstudiante()" title="Registrar un nuevo estudiante directamente">
                                ${icon('user-plus', 16)} + Registrar Estudiante
                            </button>
                            <button class="btn-docente-action excel" id="btn-exportar-excel" onclick="Docente.exportarExcelConLogo()" title="Exportar informe oficial de calificaciones a Excel con logo institucional">
                                ${icon('file-text', 16)} Exportar a Excel
                            </button>
                            <button class="btn-docente-action" id="btn-refrescar-docente" onclick="Docente.renderizarPanelDocente()" title="Recargar lista de estudiantes">
                                ${icon('refresh', 16)} Actualizar
                            </button>
                            <button class="btn-docente-action" id="btn-volver-actividades" onclick="navegar('actividades')">
                                ${icon('arrow-left', 16)} Volver a Actividades
                            </button>
                            <button class="btn-docente-action" id="btn-imprimir-informe" onclick="window.print()">
                                ${icon('printer', 16)} Imprimir Informe
                            </button>
                        </div>
                    </div>

                    <!-- TARJETAS DE MÉTRICAS KPI -->
                    <div class="docente-kpi-grid">
                        <div class="docente-kpi-card">
                            <div class="docente-kpi-icon">${icon('user', 26)}</div>
                            <div class="docente-kpi-info">
                                <span class="docente-kpi-valor">${cantEstudiantes}</span>
                                <span class="docente-kpi-label">Estudiantes Registrados</span>
                                <span class="docente-kpi-sublabel">${cantInvitados > 0 ? `+ ${cantInvitados} invitados • ` : ''}+ Tu perfil docente</span>
                            </div>
                        </div>

                        <div class="docente-kpi-card">
                            <div class="docente-kpi-icon">${icon('refresh', 26)}</div>
                            <div class="docente-kpi-info">
                                <span class="docente-kpi-valor">${totalIntentos}</span>
                                <span class="docente-kpi-label">Total de Intentos Realizados</span>
                            </div>
                        </div>

                        <div class="docente-kpi-card">
                            <div class="docente-kpi-icon">${icon('award', 26)}</div>
                            <div class="docente-kpi-info">
                                <span class="docente-kpi-valor">${promedioGeneral}%</span>
                                <span class="docente-kpi-label">Promedio de Aciertos Global</span>
                            </div>
                        </div>

                        <div class="docente-kpi-card">
                            <div class="docente-kpi-icon">${icon('check-circle', 26)}</div>
                            <div class="docente-kpi-info">
                                <span class="docente-kpi-valor">${tasaAprobacion}%</span>
                                <span class="docente-kpi-label">Tasa de Aprobación (&ge; 70%)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- BARRA DE BÚSQUEDA Y FILTROS -->
                <div class="docente-toolbar">
                    <div class="docente-search-wrap">
                        ${icon('search', 18)}
                        <input type="text" 
                               id="docente-busqueda" 
                               class="docente-search-input" 
                               placeholder="Buscar estudiante por nombre o correo electrónico..." 
                               value="${filtroTextoDocente}"
                               oninput="Docente.actualizarFiltroTexto(this.value)">
                    </div>

                    <div class="docente-filter-group">
                        <select class="docente-select-filter" onchange="Docente.actualizarFiltroQuiz(this.value)">
                            <option value="todos" ${filtroQuizDocente === 'todos' ? 'selected' : ''}>Todos los cuestionarios</option>
                            <option value="seguridad" ${filtroQuizDocente === 'seguridad' ? 'selected' : ''}>Seguridad Digital</option>
                            <option value="redes" ${filtroQuizDocente === 'redes' ? 'selected' : ''}>Redes & Conectividad</option>
                            <option value="cableado" ${filtroQuizDocente === 'cableado' ? 'selected' : ''}>Cableado Estructurado</option>
                            <option value="general1" ${filtroQuizDocente === 'general1' ? 'selected' : ''}>Cuestionario General 1</option>
                            <option value="general2" ${filtroQuizDocente === 'general2' ? 'selected' : ''}>Cuestionario General 2</option>
                        </select>

                        <select class="docente-select-filter" onchange="Docente.actualizarFiltroEstado(this.value)">
                            <option value="todos" ${filtroEstadoDocente === 'todos' ? 'selected' : ''}>Todos los estados</option>
                            <option value="con_intentos" ${filtroEstadoDocente === 'con_intentos' ? 'selected' : ''}>Con intentos realizados</option>
                            <option value="sin_intentos" ${filtroEstadoDocente === 'sin_intentos' ? 'selected' : ''}>Sin intentos aún</option>
                        </select>

                        <select class="docente-select-filter" onchange="Docente.actualizarFiltroRol(this.value)">
                            <option value="todos" ${filtroRolDocente === 'todos' ? 'selected' : ''}>Todos los roles visibles</option>
                            <option value="estudiante" ${filtroRolDocente === 'estudiante' ? 'selected' : ''}>Solo Estudiantes</option>
                            <option value="invitado" ${filtroRolDocente === 'invitado' ? 'selected' : ''}>Solo Invitados</option>
                            <option value="docente" ${filtroRolDocente === 'docente' ? 'selected' : ''}>Mi cuenta (Docente)</option>
                        </select>
                    </div>
                </div>

                <!-- CONTENEDOR DE TARJETAS DE ESTUDIANTES -->
                <div class="docente-students-container" id="docente-students-list">
                    ${renderizarListaEstudiantesFiltrada(estudiantes)}
                </div>

            </section>
        `;
    }

    /* =======================================================
       RENDERIZADO DE LA LISTA DE ESTUDIANTES FILTRADA
       ======================================================= */
    function renderizarListaEstudiantesFiltrada(estudiantes) {
        let lista = [...estudiantes];

        // Filtro por texto (nombre o correo)
        if (filtroTextoDocente.trim() !== "") {
            const query = filtroTextoDocente.toLowerCase();
            lista = lista.filter(e => 
                (e.nombre && e.nombre.toLowerCase().includes(query)) ||
                (e.correo && e.correo.toLowerCase().includes(query))
            );
        }

        // Filtro por estado
        if (filtroEstadoDocente === "con_intentos") {
            lista = lista.filter(e => Array.isArray(e.historialQuizzes) && e.historialQuizzes.length > 0);
        } else if (filtroEstadoDocente === "sin_intentos") {
            lista = lista.filter(e => !Array.isArray(e.historialQuizzes) || e.historialQuizzes.length === 0);
        }

        // Filtro por rol
        if (filtroRolDocente !== "todos") {
            lista = lista.filter(e => {
                const r = (e.rol || e.grado || "").toLowerCase();
                return r.includes(filtroRolDocente);
            });
        }

        if (lista.length === 0) {
            return `
                <div class="docente-empty-state">
                    <div class="docente-empty-icon">${icon('user-x', 36)}</div>
                    <h3>No se encontraron estudiantes registrados</h3>
                    <p>
                        Aún no hay estudiantes que coincidan con los filtros aplicados. 
                        Cuando los estudiantes se registren con su cuenta y completen los cuestionarios, 
                        sus calificaciones e intentos aparecerán automáticamente aquí.
                    </p>
                </div>
            `;
        }

        return lista.map(estudiante => renderizarTarjetaEstudiante(estudiante)).join("");
    }

    /* =======================================================
       RENDERIZADO DE CADA TARJETA DE ESTUDIANTE / USUARIO
       ======================================================= */
    function renderizarTarjetaEstudiante(estudiante) {
        const historial = Array.isArray(estudiante.historialQuizzes) ? estudiante.historialQuizzes : [];
        const iniciales = estudiante.nombre ? estudiante.nombre.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase() : "ES";

        const usuarioActivo = typeof obtenerEstudianteActivo === "function" ? obtenerEstudianteActivo() : null;
        const correoActivo = usuarioActivo && usuarioActivo.correo ? usuarioActivo.correo.toLowerCase().trim() : "";
        const idActivo = usuarioActivo && usuarioActivo.id ? String(usuarioActivo.id) : "";
        const correoEst = (estudiante.correo || "").toLowerCase().trim();
        const idEst = estudiante.id ? String(estudiante.id) : "";
        const esElMismoDocente = (correoActivo && correoEst === correoActivo) || (idActivo && idEst === idActivo);

        // Promedio general del estudiante basado en todos sus intentos
        let totalIntentosEstudiante = historial.length;
        let sumaEstudiante = 0;
        historial.forEach(h => {
            sumaEstudiante += (h.porcentaje || 0);
        });
        const promedioEstudiante = totalIntentosEstudiante > 0 ? Math.round(sumaEstudiante / totalIntentosEstudiante) : null;

        let claseScore = "sin-datos";
        let textoScore = "Sin intentos";
        if (promedioEstudiante !== null) {
            if (promedioEstudiante >= 80) {
                claseScore = "excelente";
                textoScore = `Promedio: ${promedioEstudiante}%`;
            } else if (promedioEstudiante >= 60) {
                claseScore = "bueno";
                textoScore = `Promedio: ${promedioEstudiante}%`;
            } else {
                claseScore = "regular";
                textoScore = `Promedio: ${promedioEstudiante}%`;
            }
        }

        // Cuestionarios a mostrar según el filtro de la barra de herramientas
        const cuestionariosAMostrar = filtroQuizDocente === "todos" 
            ? CUESTIONARIOS_DEF 
            : CUESTIONARIOS_DEF.filter(c => c.id === filtroQuizDocente);

        const fechaRegStr = estudiante.fechaRegistro ? new Date(estudiante.fechaRegistro).toLocaleDateString() : "Activo";

        return `
            <article class="student-card ${esElMismoDocente ? 'es-docente-propio' : ''}" id="student-card-${estudiante.id}">
                
                <!-- CABECERA DEL ESTUDIANTE / USUARIO -->
                <div class="student-card-header">
                    <div class="student-card-profile">
                        <div class="student-avatar ${esElMismoDocente ? 'avatar-docente-propio' : ''}">${iniciales}</div>
                        <div class="student-details">
                            <h3>
                                ${estudiante.nombre}
                                ${esElMismoDocente ? `<span class="badge-tu-perfil">${icon('award', 12)} Tu Perfil (Docente)</span>` : ''}
                            </h3>
                            <div class="student-meta">
                                <span class="student-rol-pill ${esElMismoDocente ? 'docente-propio' : ''}">${esElMismoDocente ? 'Docente (Tú)' : (estudiante.rol || 'Estudiante')}</span>
                                <span>${estudiante.correo}</span>
                                <span>• Registrado: ${fechaRegStr}</span>
                            </div>
                        </div>
                    </div>

                    <div class="student-overall-score">
                        <span class="student-meta-pill" title="Número total de intentos realizados por este estudiante">
                            ${icon('refresh', 13)} ${totalIntentosEstudiante} ${totalIntentosEstudiante === 1 ? 'intento total' : 'intentos totales'}
                        </span>
                        <div class="score-badge ${claseScore}">
                            ${promedioEstudiante !== null ? icon('award', 16) : icon('file-text', 16)}
                            <span>${textoScore}</span>
                        </div>
                    </div>
                </div>

                <!-- GRID DE RESULTADOS POR CUESTIONARIO (CONTEO DE VECES Y CADA INTENTO) -->
                <div class="student-quizzes-grid">
                    ${cuestionariosAMostrar.map(quizDef => {
                        const intentosQuiz = historial.filter(h => h.tipo === quizDef.id);
                        return renderizarCajaCuestionario(estudiante, quizDef, intentosQuiz);
                    }).join("")}
                </div>

            </article>
        `;
    }

    /* =======================================================
       RENDERIZADO DE LA CAJA DE CUESTIONARIO
       (MUESTRA CUÁNTAS VECES LO HIZO Y LOS RESULTADOS DE CADA INTENTO)
       ======================================================= */
    function renderizarCajaCuestionario(estudiante, quizDef, intentosQuiz = []) {
        const totalVeces = intentosQuiz.length;

        // CASO 1: NO HA REALIZADO EL CUESTIONARIO (0 INTENTOS)
        if (totalVeces === 0) {
            return `
                <div class="quiz-result-box pendiente">
                    <div class="quiz-result-header">
                        <div>
                            <span class="quiz-result-title">${quizDef.titulo}</span>
                            <div class="quiz-veces-badge">
                                ${icon('refresh', 12)} 0 veces realizado
                            </div>
                        </div>
                        <span class="quiz-status-pill pendiente">Pendiente</span>
                    </div>
                    <div style="color: #94a3b8; font-size: 0.82rem; margin: 12px 0;">
                        El estudiante aún no ha presentado este cuestionario.
                    </div>
                    <div style="font-size: 0.78rem; color: #64748b;">
                        12 preguntas evaluativas
                    </div>
                </div>
            `;
        }

        // CALCULAR MEJOR CALIFICACIÓN ENTRE TODOS LOS INTENTOS
        let mejorPorcentaje = -1;
        let mejorIntento = intentosQuiz[0];
        intentosQuiz.forEach(int => {
            const p = int.porcentaje !== undefined ? int.porcentaje : 0;
            if (p > mejorPorcentaje) {
                mejorPorcentaje = p;
                mejorIntento = int;
            }
        });

        let claseMejor = "regular";
        if (mejorPorcentaje >= 80) claseMejor = "excelente";
        else if (mejorPorcentaje >= 60) claseMejor = "bueno";

        // CASO 2: REALIZÓ EL CUESTIONARIO 1 SOLA VEZ
        if (totalVeces === 1) {
            const intento = intentosQuiz[0];
            const puntosBien = intento.puntos;
            const totalPreguntas = intento.total || 12;
            const puntosMal = intento.fallos !== undefined ? intento.fallos : (totalPreguntas - puntosBien);
            const porcentaje = intento.porcentaje !== undefined ? intento.porcentaje : Math.round((puntosBien / totalPreguntas) * 100);
            const fechaStr = intento.fecha 
                ? new Date(intento.fecha).toLocaleDateString([], { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }) 
                : 'Intento #1';

            return `
                <div class="quiz-result-box completado">
                    <div class="quiz-result-header">
                        <div>
                            <span class="quiz-result-title">${quizDef.titulo}</span>
                            <div class="quiz-veces-badge">
                                ${icon('refresh', 12)} 1 vez realizado
                            </div>
                        </div>
                        <span class="quiz-status-pill completado">1 Intento</span>
                    </div>

                    <!-- FECHA Y STATS DEL INTENTO: BIEN, MAL, PORCENTAJE -->
                    <div style="font-size: 0.78rem; color: #94a3b8; margin: 4px 0 8px; display: flex; align-items: center; gap: 5px;">
                        ${icon('file-text', 12)} Intento realizado el: <strong style="color: #cbd5e1;">${fechaStr}</strong>
                    </div>

                    <div class="quiz-stats-row">
                        <div class="stat-item bien" title="Preguntas que tuvo bien">
                            ${icon('check', 14)}
                            <span>${puntosBien} Bien</span>
                        </div>
                        <div class="stat-item mal" title="Preguntas que tuvo mal">
                            ${icon('x', 14)}
                            <span>${puntosMal} Mal</span>
                        </div>
                        <div class="stat-item pct" title="Porcentaje de efectividad">
                            <span>${porcentaje}%</span>
                        </div>
                    </div>

                    <!-- BARRA VISUAL DE PROGRESO -->
                    <div class="quiz-progress-wrap">
                        <div class="quiz-progress-bar-bg">
                            <div class="quiz-progress-fill ${claseMejor}" style="width: ${porcentaje}%"></div>
                        </div>
                    </div>

                    <!-- BOTÓN VER DESGLOSE DE PREGUNTAS -->
                    <button class="btn-ver-preguntas" 
                            id="btn-ver-${estudiante.id}-${quizDef.id}-0" 
                            onclick="Docente.abrirModalDetalle('${estudiante.id}', '${intento.id}', 1, 1)">
                        ${icon('eye', 14)}
                        <span>Ver Preguntas (Intento 1)</span>
                    </button>
                </div>
            `;
        }

        // CASO 3: REALIZÓ EL CUESTIONARIO MÚLTIPLES VECES (2 O MÁS INTENTOS)
        return `
            <div class="quiz-result-box completado multi-intentos">
                <div class="quiz-result-header">
                    <div>
                        <span class="quiz-result-title">${quizDef.titulo}</span>
                        <div class="quiz-veces-badge multi">
                            ${icon('refresh', 12)} <strong>${totalVeces} veces realizado</strong>
                        </div>
                    </div>
                    <span class="quiz-status-pill completado">${totalVeces} Intentos</span>
                </div>

                <!-- RESUMEN DE LA MEJOR CALIFICACIÓN -->
                <div class="quiz-resumen-mejor">
                    <span class="resumen-label">Mejor resultado:</span>
                    <span class="resumen-valor ${claseMejor}">
                        ${mejorPorcentaje}% (${mejorIntento.puntos} Bien, ${mejorIntento.fallos !== undefined ? mejorIntento.fallos : (mejorIntento.total - mejorIntento.puntos)} Mal)
                    </span>
                </div>

                <!-- HISTORIAL DETALLADO DE CADA INTENTO -->
                <div class="intentos-historial-wrap">
                    <div class="intentos-historial-titulo">Resultados de cada intento:</div>
                    <div class="intentos-lista-items">
                        ${intentosQuiz.map((int, i) => {
                            const num = i + 1;
                            const esMejor = int.id === mejorIntento.id;
                            const pBien = int.puntos;
                            const pTotal = int.total || 12;
                            const pMal = int.fallos !== undefined ? int.fallos : (pTotal - pBien);
                            const pPct = int.porcentaje !== undefined ? int.porcentaje : Math.round((pBien / pTotal) * 100);
                            const fechaStr = int.fecha 
                                ? new Date(int.fecha).toLocaleDateString([], { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }) 
                                : `Intento #${num}`;

                            return `
                                <div class="intento-fila-item ${esMejor ? 'intento-fila-mejor' : ''}">
                                    <div class="intento-fila-izq">
                                        <div class="intento-fila-num">
                                            <span class="intento-num-tag">#${num}</span>
                                            ${esMejor ? '<span class="badge-mejor-mini">Mejor</span>' : ''}
                                        </div>
                                        <span class="intento-fila-fecha">${fechaStr}</span>
                                    </div>

                                    <div class="intento-fila-der">
                                        <div class="intento-fila-stats">
                                            <span class="stat-mini bien" title="Aciertos">${icon('check', 11)} ${pBien}</span>
                                            <span class="stat-mini mal" title="Fallos">${icon('x', 11)} ${pMal}</span>
                                            <span class="stat-mini pct">${pPct}%</span>
                                        </div>

                                        <button class="btn-ver-intento-ui" 
                                                id="btn-ver-${estudiante.id}-${quizDef.id}-${i}"
                                                onclick="Docente.abrirModalDetalle('${estudiante.id}', '${int.id}', ${num}, ${totalVeces})"
                                                title="Ver qué preguntas tuvo bien y mal en el intento #${num}">
                                            ${icon('eye', 13)}
                                            <span>Ver</span>
                                        </button>
                                    </div>
                                </div>
                            `;
                        }).join("")}
                    </div>
                </div>

            </div>
        `;
    }

    /* =======================================================
       MODAL DE REVISIÓN PREGUNTA POR PREGUNTA (QUÉ TUVO BIEN / MAL EN EL INTENTO)
       ======================================================= */
    function abrirModalDetalle(estudianteId, intentoId, numeroIntento = 1, totalIntentos = 1) {
        cerrarModalDetalle();

        const todosLosUsuarios = typeof obtenerEstudiantes === "function" ? obtenerEstudiantes() : [];
        const estudiante = todosLosUsuarios.find(u => u.id === estudianteId || String(u.id) === String(estudianteId));
        if (!estudiante || !Array.isArray(estudiante.historialQuizzes)) return;

        const intento = estudiante.historialQuizzes.find(i => i.id === intentoId || String(i.id) === String(intentoId)) || estudiante.historialQuizzes[numeroIntento - 1];
        if (!intento) return;

        intentoSeleccionadoModal = {
            estudiante: estudiante,
            intento: intento,
            numeroIntento: numeroIntento,
            totalIntentos: totalIntentos
        };
        filtroModalPreguntas = "todas";

        const overlay = document.createElement("div");
        overlay.id = "modal-docente-overlay";
        overlay.className = "modal-docente-overlay";

        const pBien = intento.puntos;
        const pTotal = intento.total || 12;
        const pMal = intento.fallos !== undefined ? intento.fallos : (pTotal - pBien);
        const pPct = intento.porcentaje !== undefined ? intento.porcentaje : Math.round((pBien / pTotal) * 100);
        const fechaHoraStr = intento.fecha ? new Date(intento.fecha).toLocaleString() : 'Reciente';

        overlay.innerHTML = `
            <div class="modal-docente-card" id="modal-docente-card">
                <button class="modal-close-btn" id="btn-cerrar-modal-docente" onclick="Docente.cerrarModalDetalle()" title="Cerrar modal">
                    ${icon('x', 18)}
                </button>

                <div class="modal-docente-header">
                    <h2>Desglose de Preguntas Respondidas</h2>
                    <div class="modal-docente-subtitle">
                        <span><strong>Estudiante:</strong> ${estudiante.nombre}</span>
                        <span>•</span>
                        <span><strong>Cuestionario:</strong> ${intento.titulo}</span>
                        <span>•</span>
                        <span><strong>Intento:</strong> #${numeroIntento} de ${totalIntentos}</span>
                        <span>•</span>
                        <span><strong>Fecha:</strong> ${fechaHoraStr}</span>
                    </div>

                    <!-- RESUMEN COMPACTO DEL INTENTO: ACIERTOS, FALLOS, PORCENTAJE Y VEREDICTO -->
                    <div class="modal-stats-compact-bar">
                        <div class="modal-stat-pill bien" title="Preguntas acertadas">
                            ${icon('check', 14)}
                            <span><strong>${pBien}</strong> Bien</span>
                        </div>
                        <div class="modal-stat-pill mal" title="Preguntas falladas">
                            ${icon('x', 14)}
                            <span><strong>${pMal}</strong> Mal</span>
                        </div>
                        <div class="modal-stat-pill pct" title="Porcentaje de efectividad">
                            ${icon('award', 14)}
                            <span><strong>${pPct}%</strong> Efectividad</span>
                        </div>
                        <div class="modal-stat-pill veredicto ${pPct >= 70 ? 'bien' : 'mal'}" title="Veredicto del intento">
                            ${pPct >= 70 ? icon('check-circle', 14) : icon('alert-triangle', 14)}
                            <span>${pPct >= 70 ? 'Aprobado' : 'Refuerzo Requerido'}</span>
                        </div>
                    </div>
                </div>

                <!-- TABS DE FILTRO: TODAS / BIEN / MAL -->
                <div class="modal-tabs-wrap">
                    <button class="modal-tab-btn activo" id="tab-modal-todas" onclick="Docente.cambiarFiltroModal('todas')">
                        ${icon('file-text', 14)} Todas (${(intento.detalles || []).length})
                    </button>
                    <button class="modal-tab-btn" id="tab-modal-bien" onclick="Docente.cambiarFiltroModal('bien')">
                        ${icon('check-circle', 14)} Solo Bien (${pBien})
                    </button>
                    <button class="modal-tab-btn" id="tab-modal-mal" onclick="Docente.cambiarFiltroModal('mal')">
                        ${icon('x-circle', 14)} Solo Mal (${pMal})
                    </button>
                </div>

                <!-- LISTA DE PREGUNTAS DETALLADA -->
                <div class="modal-docente-body" id="modal-preguntas-lista">
                    ${renderizarPreguntasModal(intento.detalles || [], "todas")}
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        overlay.addEventListener("click", function (e) {
            if (e.target === overlay) {
                cerrarModalDetalle();
            }
        });
    }

    function cerrarModalDetalle() {
        const modal = document.getElementById("modal-docente-overlay");
        if (modal) modal.remove();
        intentoSeleccionadoModal = null;
    }

    function cambiarFiltroModal(filtro) {
        filtroModalPreguntas = filtro;
        const btnTodas = document.getElementById("tab-modal-todas");
        const btnBien = document.getElementById("tab-modal-bien");
        const btnMal = document.getElementById("tab-modal-mal");

        if (btnTodas) btnTodas.classList.toggle("activo", filtro === "todas");
        if (btnBien) btnBien.classList.toggle("activo", filtro === "bien");
        if (btnMal) btnMal.classList.toggle("activo", filtro === "mal");

        const listaContenedor = document.getElementById("modal-preguntas-lista");
        if (listaContenedor && intentoSeleccionadoModal && intentoSeleccionadoModal.intento) {
            const detalles = intentoSeleccionadoModal.intento.detalles || [];
            listaContenedor.innerHTML = renderizarPreguntasModal(detalles, filtro);
            listaContenedor.scrollTop = 0;
        }
    }

    function renderizarPreguntasModal(detalles, filtro) {
        let lista = [...detalles];

        if (filtro === "bien") {
            lista = lista.filter(d => d.esCorrecta === true || (d.seleccionada !== undefined && d.correcta !== undefined && d.seleccionada === d.correcta));
        } else if (filtro === "mal") {
            lista = lista.filter(d => d.esCorrecta === false || (d.seleccionada !== undefined && d.correcta !== undefined && d.seleccionada !== d.correcta));
        }

        if (lista.length === 0) {
            const mensajeVacio = filtro === "bien" 
                ? "No hay preguntas acertadas en este intento." 
                : filtro === "mal" 
                    ? "¡Excelente! No hubo preguntas incorrectas en este intento." 
                    : "No hay preguntas disponibles en esta categoría.";

            return `
                <div style="text-align: center; padding: 60px 20px; color: #94a3b8;">
                    <div style="width: 56px; height: 56px; margin: 0 auto 16px; border-radius: 50%; background: rgba(0, 229, 229, 0.1); border: 1px solid rgba(0, 229, 229, 0.3); display: flex; align-items: center; justify-content: center; color: #00e5e5;">
                        ${filtro === 'bien' ? icon('alert-circle', 28) : icon('check-circle', 28)}
                    </div>
                    <p style="font-size: 1rem; color: #cbd5e1; font-weight: 600;">${mensajeVacio}</p>
                </div>
            `;
        }

        return lista.map((item, idx) => {
            const numeroPregunta = (item.indice !== undefined ? item.indice : idx) + 1;
            const esBien = item.esCorrecta === true || (item.seleccionada !== undefined && item.correcta !== undefined && item.seleccionada === item.correcta);
            const opciones = Array.isArray(item.opciones) ? item.opciones : [];

            return `
                <div class="pregunta-detalle-card ${esBien ? 'bien' : 'mal'}">
                    
                    <div class="pregunta-card-header">
                        <div class="pregunta-numero-badge">
                            <span>Pregunta ${numeroPregunta}</span>
                            ${item.contexto ? `<span class="pregunta-contexto-pill">${item.contexto}</span>` : ''}
                        </div>

                        <div class="pregunta-estado-badge ${esBien ? 'bien' : 'mal'}">
                            ${esBien ? icon('check', 13) : icon('x', 13)}
                            <span>${esBien ? 'Bien / Correcta' : 'Mal / Fallo'}</span>
                        </div>
                    </div>

                    <div class="pregunta-texto">
                        ${item.pregunta}
                    </div>

                    <!-- OPCIONES Y RESPUESTAS DEL ESTUDIANTE -->
                    <div class="opciones-detalle-list">
                        ${opciones.map((opc, opcIdx) => {
                            const fueSeleccionada = item.seleccionada === opcIdx;
                            const esLaCorrecta = item.correcta === opcIdx;

                            let claseOpcion = "";
                            let etiquetaOpcion = "";

                            if (fueSeleccionada && esLaCorrecta) {
                                claseOpcion = "estudiante-acierto";
                                etiquetaOpcion = `<span class="opcion-etiqueta-docente acierto">${icon('check', 12)} Respuesta del estudiante (Correcta)</span>`;
                            } else if (fueSeleccionada && !esLaCorrecta) {
                                claseOpcion = "estudiante-fallo";
                                etiquetaOpcion = `<span class="opcion-etiqueta-docente fallo">${icon('x', 12)} Respuesta del estudiante (Incorrecta)</span>`;
                            } else if (!fueSeleccionada && esLaCorrecta) {
                                claseOpcion = "correcta-esperada";
                                etiquetaOpcion = `<span class="opcion-etiqueta-docente correcta">${icon('check', 12)} Respuesta correcta esperada</span>`;
                            }

                            return `
                                <div class="opcion-detalle-item ${claseOpcion}">
                                    <span>${opc}</span>
                                    ${etiquetaOpcion}
                                </div>
                            `;
                        }).join("")}
                    </div>

                    <!-- EXPLICACIÓN PEDAGÓGICA -->
                    ${item.explicacion ? `
                        <div class="pregunta-explicacion-box">
                            ${icon('lightbulb', 18)}
                            <div>
                                <strong>Explicación técnica:</strong>
                                <span>${item.explicacion}</span>
                            </div>
                        </div>
                    ` : ''}

                </div>
            `;
        }).join("");
    }

    /* =======================================================
       CONTROLADORES DE FILTROS EN TIEMPO REAL
       ======================================================= */
    function actualizarFiltroTexto(texto) {
        filtroTextoDocente = texto;
        refrescarContenedorLista();
    }

    function actualizarFiltroQuiz(quizId) {
        filtroQuizDocente = quizId;
        refrescarContenedorLista();
    }

    function actualizarFiltroEstado(estado) {
        filtroEstadoDocente = estado;
        refrescarContenedorLista();
    }

    function actualizarFiltroRol(rol) {
        filtroRolDocente = rol;
        refrescarContenedorLista();
    }

    /* =======================================================
       HELPER: FILTRO DE VISIBILIDAD DE USUARIOS PARA EL DOCENTE
       ======================================================= */
    function obtenerUsuariosVisiblesParaDocente(todosLosUsuarios, usuarioActivo) {
        if (!Array.isArray(todosLosUsuarios)) return [];
        const correoActivo = (usuarioActivo && usuarioActivo.correo) ? usuarioActivo.correo.toLowerCase().trim() : "";
        const idActivo = (usuarioActivo && usuarioActivo.id) ? String(usuarioActivo.id) : "";

        return todosLosUsuarios.filter(u => {
            if (u.esDemo === true || (u.id && String(u.id).startsWith("demo_"))) return false;

            const correoU = (u.correo || "").toLowerCase().trim();
            const idU = u.id ? String(u.id) : "";
            const esElDocenteActivo = (correoActivo && correoU === correoActivo) || (idActivo && idU === idActivo);

            // 1. Si es él mismo (el docente activo en sesión), SIEMPRE se muestra
            if (esElDocenteActivo) return true;

            const rol = (u.rol || u.grado || "").toLowerCase().trim();

            // 2. Si es CUALQUIER OTRO docente, NO se muestra
            if (rol.includes("docente")) return false;

            // 3. Estudiantes e Invitados sí son visibles
            return true;
        });
    }

    function refrescarContenedorLista() {
        const listaContenedor = document.getElementById("docente-students-list");
        if (listaContenedor) {
            const usuarioActivo = typeof obtenerEstudianteActivo === "function" ? obtenerEstudianteActivo() : null;
            const todosLosUsuarios = typeof obtenerEstudiantes === "function" ? obtenerEstudiantes() : [];
            const estudiantes = obtenerUsuariosVisiblesParaDocente(todosLosUsuarios, usuarioActivo);
            listaContenedor.innerHTML = renderizarListaEstudiantesFiltrada(estudiantes);
        }
    }

    /* =======================================================
       MODAL DE REGISTRO DIRECTO DE ESTUDIANTES DESDE EL PANEL
       ======================================================= */
    function abrirModalNuevoEstudiante() {
        cerrarModalNuevoEstudiante();

        const overlay = document.createElement("div");
        overlay.id = "modal-nuevo-estudiante-overlay";
        overlay.className = "modal-docente-overlay";
        overlay.innerHTML = `
            <div class="modal-docente-card" style="max-width: 520px; padding: 30px 34px;">
                <button class="modal-close-btn" onclick="Docente.cerrarModalNuevoEstudiante()" title="Cerrar ventana">
                    ${icon('x', 18)}
                </button>
                <div style="margin-bottom: 22px; text-align: center;">
                    <div style="margin: 0 auto 12px; width: 50px; height: 50px; border-radius: 14px; background: rgba(0, 229, 229, 0.15); border: 1px solid rgba(0, 229, 229, 0.4); display: flex; align-items: center; justify-content: center; color: #00e5e5;">
                        ${icon('user-plus', 26)}
                    </div>
                    <h2 style="font-size: 1.45rem; color: #ffffff; margin-bottom: 6px;">Registrar Nuevo Estudiante</h2>
                    <p style="font-size: 0.88rem; color: #94a3b8; margin: 0;">Agrega al estudiante a la plataforma Mesh para supervisar sus calificaciones e intentos.</p>
                </div>

                <div id="nuevo-est-alerta-box"></div>

                <form id="form-nuevo-estudiante" onsubmit="Docente.procesarNuevoEstudiante(event)">
                    <div class="form-grupo" style="margin-bottom: 14px;">
                        <label for="doc-reg-nombre" style="display: block; font-size: 0.85rem; color: #cbd5e1; margin-bottom: 6px; font-weight: 600;">
                            ${icon('user', 14)} Nombre y Apellido
                        </label>
                        <div class="input-con-icono">
                            <input type="text" id="doc-reg-nombre" required placeholder="ej: Daniel Alejandro Pérez" style="width: 100%; padding: 11px 14px; background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(0, 229, 229, 0.35); border-radius: 10px; color: #ffffff; font-size: 0.9rem; box-sizing: border-box;">
                        </div>
                    </div>

                    <div class="form-grupo" style="margin-bottom: 14px;">
                        <label for="doc-reg-rol" style="display: block; font-size: 0.85rem; color: #cbd5e1; margin-bottom: 6px; font-weight: 600;">
                            ${icon('award', 14)} Rol del Usuario
                        </label>
                        <div class="input-con-icono">
                            <select id="doc-reg-rol" required style="width: 100%; padding: 11px 14px; background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(0, 229, 229, 0.35); border-radius: 10px; color: #ffffff; font-size: 0.9rem; box-sizing: border-box;">
                                <option value="Estudiante" selected>Estudiante</option>
                                <option value="Docente">Docente</option>
                                <option value="Invitado">Invitado</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-grupo" style="margin-bottom: 14px;">
                        <label for="doc-reg-correo" style="display: block; font-size: 0.85rem; color: #cbd5e1; margin-bottom: 6px; font-weight: 600;">
                            ${icon('user', 14)} Correo Electrónico
                        </label>
                        <div class="input-con-icono">
                            <input type="email" id="doc-reg-correo" required placeholder="daniel.perez@colegio.edu.co" style="width: 100%; padding: 11px 14px; background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(0, 229, 229, 0.35); border-radius: 10px; color: #ffffff; font-size: 0.9rem; box-sizing: border-box;">
                        </div>
                    </div>

                    <div class="form-grupo" style="margin-bottom: 20px;">
                        <label for="doc-reg-password" style="display: block; font-size: 0.85rem; color: #cbd5e1; margin-bottom: 6px; font-weight: 600;">
                            ${icon('lock', 14)} Contraseña de Acceso (mínimo 6 caracteres)
                        </label>
                        <div class="input-con-icono">
                            <input type="password" id="doc-reg-password" required minlength="6" placeholder="Mínimo 6 caracteres" style="width: 100%; padding: 11px 14px; background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(0, 229, 229, 0.35); border-radius: 10px; color: #ffffff; font-size: 0.9rem; box-sizing: border-box;">
                        </div>
                    </div>

                    <button type="submit" class="btn-docente-action primary" style="width: 100%; justify-content: center; padding: 12px; font-size: 0.95rem;">
                        ${icon('check-circle', 16)} Registrar y Mostrar en el Panel
                    </button>
                </form>
            </div>
        `;

        document.body.appendChild(overlay);

        overlay.addEventListener("click", function (e) {
            if (e.target === overlay) {
                cerrarModalNuevoEstudiante();
            }
        });
    }

    function cerrarModalNuevoEstudiante() {
        const modal = document.getElementById("modal-nuevo-estudiante-overlay");
        if (modal) modal.remove();
    }

    function procesarNuevoEstudiante(e) {
        e.preventDefault();
        const nombreInput = document.getElementById("doc-reg-nombre");
        const nombre = nombreInput ? nombreInput.value.trim() : "";

        const rolInput = document.getElementById("doc-reg-rol");
        const rol = rolInput ? rolInput.value : "Estudiante";

        const correoInput = document.getElementById("doc-reg-correo");
        const correo = correoInput ? correoInput.value.trim().toLowerCase() : "";

        const passInput = document.getElementById("doc-reg-password");
        const pass = passInput ? passInput.value : "";

        const alertBox = document.getElementById("nuevo-est-alerta-box");

        if (!nombre || !correo || !pass) {
            if (alertBox) alertBox.innerHTML = `<div style="background: rgba(239,68,68,0.2); border: 1px solid #ef4444; color: #fca5a5; padding: 10px 14px; border-radius: 8px; margin-bottom: 12px; font-size: 0.85rem;">Por favor completa todos los campos requeridos.</div>`;
            return;
        }

        if (pass.length < 6) {
            if (alertBox) alertBox.innerHTML = `<div style="background: rgba(239,68,68,0.2); border: 1px solid #ef4444; color: #fca5a5; padding: 10px 14px; border-radius: 8px; margin-bottom: 12px; font-size: 0.85rem;">La contraseña debe tener al menos 6 caracteres.</div>`;
            return;
        }

        const todosLosUsuarios = typeof obtenerEstudiantes === "function" ? obtenerEstudiantes() : [];
        const yaExiste = todosLosUsuarios.find(u => u.correo && u.correo.toLowerCase() === correo);

        if (yaExiste) {
            if (alertBox) alertBox.innerHTML = `<div style="background: rgba(239,68,68,0.2); border: 1px solid #ef4444; color: #fca5a5; padding: 10px 14px; border-radius: 8px; margin-bottom: 12px; font-size: 0.85rem;">Ya existe un usuario con este correo: ${correo}.</div>`;
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

        todosLosUsuarios.push(nuevoEstudiante);
        try {
            localStorage.setItem("mesh_estudiantes_db", JSON.stringify(todosLosUsuarios));
            window.dispatchEvent(new CustomEvent("mesh_usuarios_actualizados", { detail: nuevoEstudiante }));
        } catch (err) {}

        // Guardar en Base de Datos SQLite (mesh.db) vía WebAssembly
        if (window.MeshSQLite && typeof window.MeshSQLite.guardarUsuario === "function") {
            window.MeshSQLite.guardarUsuario(nuevoEstudiante);
        }

        cerrarModalNuevoEstudiante();
        renderizarPanelDocente();

        // Notificación flotante de confirmación
        const notif = document.createElement("div");
        notif.style.cssText = "position: fixed; bottom: 30px; right: 30px; background: rgba(8, 26, 55, 0.95); border: 1.5px solid #00e5e5; color: #6eeeea; padding: 14px 22px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); z-index: 9999; display: flex; align-items: center; gap: 10px; font-weight: 600;";
        notif.innerHTML = `${icon('check-circle', 18)} ¡Estudiante <strong>${nombre}</strong> agregado con éxito! Ya visible en el panel.`;
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 4000);
    }

    // Escuchar eventos en tiempo real para mantener la lista actualizada automáticamente
    window.addEventListener("mesh_usuarios_actualizados", function () {
        if (window.location.hash.includes("docente")) {
            renderizarPanelDocente();
        }
    });

    window.addEventListener("storage", function (e) {
        if (e.key === "mesh_estudiantes_db" && window.location.hash.includes("docente")) {
            renderizarPanelDocente();
        }
    });

    window.addEventListener("focus", function () {
        if (window.location.hash.includes("docente")) {
            renderizarPanelDocente();
        }
    });

    // =======================================================
    // EXPORTACIÓN DE CALIFICACIONES A EXCEL CON LOGO
    // =======================================================
    async function obtenerLogoBase64() {
        try {
            const res = await fetch("img/logo.jpeg");
            if (!res.ok) return "";
            const blob = await res.blob();
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = () => resolve("");
                reader.readAsDataURL(blob);
            });
        } catch (err) {
            console.warn("No se pudo cargar img/logo.jpeg para Excel:", err);
            return "";
        }
    }

    async function exportarExcelConLogo() {
        const usuarioActivo = typeof obtenerEstudianteActivo === "function" ? obtenerEstudianteActivo() : (typeof Auth !== "undefined" && typeof Auth.obtenerEstudianteActivo === "function" ? Auth.obtenerEstudianteActivo() : null);
        const todosLosUsuarios = typeof obtenerEstudiantes === "function" ? obtenerEstudiantes() : (typeof Auth !== "undefined" && typeof Auth.obtenerEstudiantes === "function" ? Auth.obtenerEstudiantes() : []);
        const lista = typeof obtenerUsuariosVisiblesParaDocente === "function" ? obtenerUsuariosVisiblesParaDocente(todosLosUsuarios, usuarioActivo) : todosLosUsuarios;
        const nombreDocente = usuarioActivo ? (usuarioActivo.nombre || "Docente Responsable") : "Docente Responsable";
        const correoDocente = usuarioActivo ? (usuarioActivo.correo || "docente@mesh.edu") : "docente@mesh.edu";

        // Obtener logo en base64
        const logoBase64 = await obtenerLogoBase64();

        const fechaActual = new Date();
        const fechaFormateada = fechaActual.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });

        // Métricas generales
        const cantEstudiantes = lista.filter(e => !(e.rol || e.grado || "").toLowerCase().includes("docente")).length;
        let totalIntentos = 0;
        let sumaPorcentajes = 0;
        let intentosAprobados = 0;

        lista.forEach(e => {
            const hist = Array.isArray(e.historialQuizzes) ? e.historialQuizzes : [];
            totalIntentos += hist.length;
            hist.forEach(h => {
                const pct = Number(h.porcentaje) || 0;
                sumaPorcentajes += pct;
                if (pct >= 70) intentosAprobados++;
            });
        });

        const promedioGeneral = totalIntentos > 0 ? Math.round(sumaPorcentajes / totalIntentos) : 0;
        const tasaAprobacion = totalIntentos > 0 ? Math.round((intentosAprobados / totalIntentos) * 100) : 0;

        // Filas de la tabla consolidada de estudiantes
        let filasEstudiantesHtml = "";
        lista.forEach((estudiante, idx) => {
            const hist = Array.isArray(estudiante.historialQuizzes) ? estudiante.historialQuizzes : [];
            const cantIntentos = hist.length;

            let prom = 0;
            if (cantIntentos > 0) {
                const sum = hist.reduce((acc, h) => acc + (Number(h.porcentaje) || 0), 0);
                prom = Math.round(sum / cantIntentos);
            }

            const obtenerMejorNota = (tipo) => {
                const delTipo = hist.filter(h => h.tipo === tipo);
                if (delTipo.length === 0) return "—";
                const max = Math.max(...delTipo.map(h => Number(h.porcentaje) || 0));
                return max + "%";
            };

            const notaSeguridad = obtenerMejorNota("seguridad");
            const notaRedes = obtenerMejorNota("redes");
            const notaCableado = obtenerMejorNota("cableado");
            const notaGeneral1 = obtenerMejorNota("general1");
            const notaGeneral2 = obtenerMejorNota("general2");

            let estadoClase = "sin-actividad";
            let estadoTexto = "Sin Intentos";
            if (cantIntentos > 0) {
                if (prom >= 70) {
                    estadoClase = "aprobado";
                    estadoTexto = "Aprobado (≥ 70%)";
                } else {
                    estadoClase = "reprobado";
                    estadoTexto = "Requiere Refuerzo";
                }
            }

            const rolTexto = estudiante.rol || estudiante.grado || "Estudiante";

            filasEstudiantesHtml += `
                <tr>
                    <td style="text-align: center; border: 1px solid #cbd5e0; padding: 7px;">${idx + 1}</td>
                    <td style="border: 1px solid #cbd5e0; padding: 7px;"><strong>${estudiante.nombre || "Sin nombre"}</strong></td>
                    <td style="border: 1px solid #cbd5e0; padding: 7px;">${estudiante.correo || "Sin correo"}</td>
                    <td style="text-align: center; border: 1px solid #cbd5e0; padding: 7px;">${rolTexto}</td>
                    <td style="text-align: center; border: 1px solid #cbd5e0; padding: 7px;">${cantIntentos}</td>
                    <td style="text-align: center; font-weight: bold; border: 1px solid #cbd5e0; padding: 7px;">${cantIntentos > 0 ? prom + "%" : "—"}</td>
                    <td style="text-align: center; border: 1px solid #cbd5e0; padding: 7px;">${notaSeguridad}</td>
                    <td style="text-align: center; border: 1px solid #cbd5e0; padding: 7px;">${notaRedes}</td>
                    <td style="text-align: center; border: 1px solid #cbd5e0; padding: 7px;">${notaCableado}</td>
                    <td style="text-align: center; border: 1px solid #cbd5e0; padding: 7px;">${notaGeneral1}</td>
                    <td style="text-align: center; border: 1px solid #cbd5e0; padding: 7px;">${notaGeneral2}</td>
                    <td class="${estadoClase}" style="border: 1px solid #cbd5e0; padding: 7px;">${estadoTexto}</td>
                </tr>
            `;
        });

        // Filas del registro individual detallado de intentos
        let filasHistorialHtml = "";
        let countHist = 0;
        lista.forEach(estudiante => {
            const hist = Array.isArray(estudiante.historialQuizzes) ? estudiante.historialQuizzes : [];
            hist.forEach(intento => {
                countHist++;
                const pct = Number(intento.porcentaje) || 0;
                const esAprobado = pct >= 70;
                const fechaIntento = intento.fecha ? new Date(intento.fecha).toLocaleString("es-ES") : "—";
                filasHistorialHtml += `
                    <tr>
                        <td style="text-align: center; border: 1px solid #cbd5e0; padding: 7px;">${countHist}</td>
                        <td style="border: 1px solid #cbd5e0; padding: 7px;">${fechaIntento}</td>
                        <td style="border: 1px solid #cbd5e0; padding: 7px;"><strong>${estudiante.nombre || "—"}</strong></td>
                        <td style="border: 1px solid #cbd5e0; padding: 7px;">${estudiante.correo || "—"}</td>
                        <td style="border: 1px solid #cbd5e0; padding: 7px;">${intento.titulo || intento.tipo || "Cuestionario"}</td>
                        <td style="text-align: center; border: 1px solid #cbd5e0; padding: 7px;">${intento.puntos || 0} / ${intento.total || 0}</td>
                        <td style="text-align: center; border: 1px solid #cbd5e0; padding: 7px;">${intento.fallos || 0}</td>
                        <td style="text-align: center; font-weight: bold; border: 1px solid #cbd5e0; padding: 7px;">${pct}%</td>
                        <td class="${esAprobado ? 'aprobado' : 'reprobado'}" style="border: 1px solid #cbd5e0; padding: 7px;">${esAprobado ? 'Aprobado' : 'No Aprobado'}</td>
                    </tr>
                `;
            });
        });

        if (filasHistorialHtml === "") {
            filasHistorialHtml = `
                <tr>
                    <td colspan="9" style="text-align: center; color: #718096; font-style: italic; padding: 15px; border: 1px solid #cbd5e0;">
                        Aún no se registran intentos individuales de cuestionarios.
                    </td>
                </tr>
            `;
        }

        // Construir plantilla Excel completa compatible con MS Excel, LibreOffice y Google Sheets
        const excelContent = `
            <html xmlns:o="urn:schemas-microsoft-com:office:office" 
                  xmlns:x="urn:schemas-microsoft-com:office:excel" 
                  xmlns="http://www.w3.org/TR/REC-html40">
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                <!--[if gte mso 9]>
                <xml>
                    <x:ExcelWorkbook>
                        <x:ExcelWorksheets>
                            <x:ExcelWorksheet>
                                <x:Name>Informe Calificaciones MESH</x:Name>
                                <x:WorksheetOptions>
                                    <x:DisplayGridlines/>
                                </x:WorksheetOptions>
                            </x:ExcelWorksheet>
                        </x:ExcelWorksheets>
                    </x:ExcelWorkbook>
                </xml>
                <![endif]-->
                <style>
                    body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; color: #1a202c; background: #ffffff; }
                    table { border-collapse: collapse; width: 100%; margin-bottom: 25px; }
                    th { background-color: #081a37; color: #ffffff; font-weight: bold; border: 1px solid #2d3748; padding: 9px 8px; font-size: 10pt; text-align: center; }
                    td { border: 1px solid #cbd5e0; padding: 7px 10px; font-size: 9.5pt; }
                    .header-title { font-size: 16pt; font-weight: bold; color: #081a37; margin: 0; }
                    .header-sub { font-size: 11pt; color: #2d3748; margin: 4px 0; }
                    .kpi-th { background-color: #008b8b; color: #ffffff; font-weight: bold; text-align: center; border: 1px solid #005f5f; padding: 9px; font-size: 10.5pt; }
                    .kpi-td { background-color: #f7fafc; font-size: 14pt; font-weight: bold; text-align: center; color: #081a37; border: 1px solid #cbd5e0; padding: 12px; }
                    .aprobado { background-color: #c6f6d5; color: #22543d; font-weight: bold; text-align: center; }
                    .reprobado { background-color: #fed7d7; color: #742a2a; font-weight: bold; text-align: center; }
                    .sin-actividad { background-color: #edf2f7; color: #718096; font-style: italic; text-align: center; }
                    .section-header { background-color: #008b8b; color: #ffffff; font-size: 12pt; font-weight: bold; padding: 10px 12px; text-align: left; }
                </style>
            </head>
            <body>
                <!-- ENCABEZADO CON LOGO INSTITUCIONAL -->
                <table border="0" style="margin-bottom: 25px;">
                    <tr>
                        ${logoBase64 ? `
                        <td style="width: 95px; text-align: center; vertical-align: middle; border: none;" rowspan="3">
                            <img src="${logoBase64}" width="80" height="80" alt="Logo MESH" style="display:block; margin:auto;">
                        </td>` : ''}
                        <td colspan="${logoBase64 ? 11 : 12}" style="border: none; padding-left: 12px;">
                            <div class="header-title">MESH - PLATAFORMA EDUCATIVA INTERACTIVA DE SEGURIDAD INFORMÁTICA Y REDES</div>
                            <div class="header-sub"><strong>INFORME OFICIAL DE RESULTADOS Y SEGUIMIENTO ACADÉMICO</strong></div>
                            <div class="header-sub">
                                <strong>Docente Responsable:</strong> ${nombreDocente} (${correoDocente}) &nbsp;|&nbsp; 
                                <strong>Fecha de Generación:</strong> ${fechaFormateada} &nbsp;|&nbsp;
                                <strong>Base de Datos:</strong> SQLite (mesh.db)
                            </div>
                        </td>
                    </tr>
                </table>

                <!-- RESUMEN DE INDICADORES (KPIs) -->
                <table>
                    <thead>
                        <tr>
                            <th class="kpi-th" style="width: 25%;">Estudiantes Registrados</th>
                            <th class="kpi-th" style="width: 25%;">Cuestionarios Realizados</th>
                            <th class="kpi-th" style="width: 25%;">Promedio Global del Grupo</th>
                            <th class="kpi-th" style="width: 25%;">Tasa de Aprobación (≥ 70%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="kpi-td">${cantEstudiantes}</td>
                            <td class="kpi-td">${totalIntentos}</td>
                            <td class="kpi-td">${promedioGeneral}%</td>
                            <td class="kpi-td">${tasaAprobacion}%</td>
                        </tr>
                    </tbody>
                </table>

                <!-- SECCIÓN 1: CONSOLIDADO DE ESTUDIANTES -->
                <table>
                    <thead>
                        <tr>
                            <th colspan="12" class="section-header">1. CONSOLIDADO DE CALIFICACIONES POR ESTUDIANTE</th>
                        </tr>
                        <tr>
                            <th style="width: 4%;">#</th>
                            <th style="width: 17%;">Nombre del Estudiante</th>
                            <th style="width: 17%;">Correo Electrónico</th>
                            <th style="width: 10%;">Perfil / Rol</th>
                            <th style="width: 7%;">Intentos</th>
                            <th style="width: 7%;">Promedio</th>
                            <th style="width: 7%;">Seguridad</th>
                            <th style="width: 7%;">Redes</th>
                            <th style="width: 7%;">Cableado</th>
                            <th style="width: 7%;">General 1</th>
                            <th style="width: 7%;">General 2</th>
                            <th style="width: 11%;">Estado Académico</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filasEstudiantesHtml}
                    </tbody>
                </table>

                <!-- SECCIÓN 2: HISTORIAL DETALLADO DE INTENTOS -->
                <table>
                    <thead>
                        <tr>
                            <th colspan="9" class="section-header">2. REGISTRO DETALLADO DE TODOS LOS INTENTOS REALIZADOS</th>
                        </tr>
                        <tr>
                            <th style="width: 4%;">#</th>
                            <th style="width: 15%;">Fecha y Hora</th>
                            <th style="width: 18%;">Estudiante</th>
                            <th style="width: 18%;">Correo Electrónico</th>
                            <th style="width: 18%;">Cuestionario</th>
                            <th style="width: 8%;">Aciertos</th>
                            <th style="width: 6%;">Fallos</th>
                            <th style="width: 6%;">Nota (%)</th>
                            <th style="width: 9%;">Resultado</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filasHistorialHtml}
                    </tbody>
                </table>
            </body>
            </html>
        `;

        // Descarga directa con formato .xls
        const blob = new Blob([excelContent], { type: "application/vnd.ms-excel;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const fechaArchivo = fechaActual.toISOString().slice(0, 10);
        a.download = `Informe_Calificaciones_Mesh_${fechaArchivo}.xls`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Notificación flotante de confirmación
        const notif = document.createElement("div");
        notif.style.cssText = "position: fixed; bottom: 30px; right: 30px; background: rgba(8, 26, 55, 0.95); border: 1.5px solid #107c41; color: #a3e635; padding: 14px 22px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); z-index: 9999; display: flex; align-items: center; gap: 10px; font-weight: 600;";
        notif.innerHTML = `${icon('check-circle', 18)} ¡Informe de calificaciones en Excel exportado con éxito (incluye logo institucional)!`;
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 4000);
    }

    // Exponer API del módulo Docente
    window.Docente = {
        renderizarPanelDocente,
        abrirModalDetalle,
        cerrarModalDetalle,
        abrirModalNuevoEstudiante,
        cerrarModalNuevoEstudiante,
        procesarNuevoEstudiante,
        cambiarFiltroModal,
        actualizarFiltroTexto,
        actualizarFiltroQuiz,
        actualizarFiltroEstado,
        actualizarFiltroRol,
        exportarExcelConLogo
    };

    window.renderizarPanelDocente = renderizarPanelDocente;
    window.cambiarFiltroModal = cambiarFiltroModal;

    // Ejecutar limpieza al cargar
    limpiarDemoResidual();

})();
