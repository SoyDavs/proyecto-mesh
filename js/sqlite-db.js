/**
 * ===================================================================
 * MESH - GESTOR DE BASE DE DATOS SQLITE (WebAssembly / sql.js)
 * ===================================================================
 * Implementación 100% en JavaScript y WebAssembly sin servidor Python.
 * Crea y administra la base de datos real 'mesh.db' en el cliente,
 * almacena de forma persistente en IndexedDB y permite descargar/cargar
 * el archivo físico .db para abrirlo en DB Browser for SQLite.
 */

(function (window) {
    "use strict";

    const IDB_NAME = "MeshSQLiteStorage";
    const IDB_STORE = "sqlite_file";
    const IDB_KEY = "mesh.db";

    let SQL = null;
    let dbInstance = null;
    let isReady = false;

    // Conexión a IndexedDB para guardar el binario .db
    function abrirIndexedDB() {
        return new Promise((resolve, reject) => {
            if (!window.indexedDB) {
                console.warn("[SQLite] IndexedDB no soportado en este navegador.");
                return resolve(null);
            }
            const req = window.indexedDB.open(IDB_NAME, 1);
            req.onupgradeneeded = function (e) {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(IDB_STORE)) {
                    db.createObjectStore(IDB_STORE);
                }
            };
            req.onsuccess = function () {
                resolve(req.result);
            };
            req.onerror = function () {
                console.warn("[SQLite] Error al abrir IndexedDB:", req.error);
                resolve(null);
            };
        });
    }

    async function persistirEnIndexedDB(uint8Array) {
        try {
            const idb = await abrirIndexedDB();
            if (!idb) return;
            const tx = idb.transaction(IDB_STORE, "readwrite");
            tx.objectStore(IDB_STORE).put(uint8Array, IDB_KEY);
            return new Promise((res) => {
                tx.oncomplete = () => res(true);
                tx.onerror = () => res(false);
            });
        } catch (err) {
            console.warn("[SQLite] No se pudo persistir en IndexedDB:", err);
        }
    }

    async function cargarDesdeIndexedDB() {
        try {
            const idb = await abrirIndexedDB();
            if (!idb) return null;
            const tx = idb.transaction(IDB_STORE, "readonly");
            const req = tx.objectStore(IDB_STORE).get(IDB_KEY);
            return new Promise((res) => {
                req.onsuccess = () => res(req.result || null);
                req.onerror = () => res(null);
            });
        } catch (err) {
            console.warn("[SQLite] Error leyendo de IndexedDB:", err);
            return null;
        }
    }

    // Inicializar tablas en la base de datos SQLite
    function inicializarTablas(db) {
        db.run(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id TEXT PRIMARY KEY,
                nombre TEXT NOT NULL,
                correo TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                rol TEXT NOT NULL,
                grado TEXT,
                fecha_registro TEXT
            );
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS historial_quizzes (
                id TEXT PRIMARY KEY,
                usuario_id TEXT NOT NULL,
                correo TEXT NOT NULL,
                tipo TEXT NOT NULL,
                titulo TEXT NOT NULL,
                puntos INTEGER NOT NULL,
                fallos INTEGER NOT NULL,
                total INTEGER NOT NULL,
                porcentaje INTEGER NOT NULL,
                detalles TEXT,
                fecha TEXT NOT NULL,
                FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
            );
        `);
    }

    // Guardar cambios a IndexedDB
    async function guardarCambios() {
        if (!dbInstance) return;
        try {
            const binary = dbInstance.export();
            await persistirEnIndexedDB(binary);
            console.log("[SQLite] Base de datos mesh.db persistida exitosamente.");
        } catch (err) {
            console.warn("[SQLite] Error al exportar binario SQLite:", err);
        }
    }

    // Inicializar motor SQLite WebAssembly
    async function inicializar() {
        try {
            if (typeof window.initSqlJs !== "function") {
                console.warn("[SQLite] initSqlJs no está disponible todavía en window.");
                return false;
            }

            SQL = await window.initSqlJs({
                locateFile: function (file) {
                    return "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.12.0/" + file;
                }
            });

            const datosGuardados = await cargarDesdeIndexedDB();
            if (datosGuardados && datosGuardados.length > 0) {
                dbInstance = new SQL.Database(datosGuardados);
                console.log("[SQLite] Base de datos mesh.db cargada desde almacenamiento local.");
            } else {
                dbInstance = new SQL.Database();
                console.log("[SQLite] Nueva base de datos mesh.db creada en memoria.");
            }

            inicializarTablas(dbInstance);
            isReady = true;

            // Sincronizar registros locales existentes
            sincronizarConLocalStorage();

            window.dispatchEvent(new CustomEvent("mesh_sqlite_ready"));
            return true;
        } catch (err) {
            console.warn("[SQLite] No se pudo inicializar SQLite WebAssembly:", err);
            return false;
        }
    }

    // Sincronización bidireccional con localStorage
    function sincronizarConLocalStorage() {
        if (!isReady || !dbInstance) return;

        try {
            const raw = localStorage.getItem("mesh_estudiantes_db");
            if (!raw) return;
            const locales = JSON.parse(raw);
            if (!Array.isArray(locales)) return;

            locales.forEach(u => {
                if (!u || !u.correo) return;
                guardarUsuario(u, false);
                if (Array.isArray(u.historialQuizzes)) {
                    u.historialQuizzes.forEach(q => {
                        guardarIntentoQuiz(q, u, false);
                    });
                }
            });

            guardarCambios();
        } catch (err) {
            console.warn("[SQLite] Error en sincronización inicial:", err);
        }
    }

    // Guardar o actualizar usuario en tabla 'usuarios'
    function guardarUsuario(usuario, autoPersistir = true) {
        if (!isReady || !dbInstance || !usuario) return;

        try {
            const id = usuario.id || ("usr_" + Date.now());
            const nombre = usuario.nombre || "";
            const correo = usuario.correo || "";
            const pass = usuario.password || "";
            const rol = usuario.rol || "Estudiante";
            const grado = usuario.grado || rol;
            const fecha = usuario.fechaRegistro || new Date().toISOString();

            dbInstance.run(
                `INSERT OR REPLACE INTO usuarios (id, nombre, correo, password, rol, grado, fecha_registro)
                 VALUES (?, ?, ?, ?, ?, ?, ?);`,
                [id, nombre, correo, pass, rol, grado, fecha]
            );

            if (autoPersistir) {
                guardarCambios();
            }
        } catch (err) {
            console.warn("[SQLite] Error al guardar usuario en SQLite:", err);
        }
    }

    // Actualizar contraseña de usuario
    function actualizarPassword(correo, nuevaPassword) {
        if (!isReady || !dbInstance || !correo) return;

        try {
            dbInstance.run(
                `UPDATE usuarios SET password = ? WHERE lower(correo) = lower(?);`,
                [nuevaPassword, correo]
            );
            guardarCambios();
            console.log("[SQLite] Contraseña actualizada en tabla 'usuarios' para:", correo);
        } catch (err) {
            console.warn("[SQLite] Error al actualizar contraseña:", err);
        }
    }

    // Guardar intento en tabla 'historial_quizzes'
    function guardarIntentoQuiz(registro, usuario, autoPersistir = true) {
        if (!isReady || !dbInstance || !registro || !usuario) return;

        try {
            const id = registro.id || ("intento_" + Date.now());
            const usrId = usuario.id || "";
            const correo = usuario.correo || "";
            const tipo = registro.tipo || "";
            const titulo = registro.titulo || tipo;
            const puntos = Number(registro.puntos || 0);
            const fallos = Number(registro.fallos || 0);
            const total = Number(registro.total || 0);
            const porcentaje = Number(registro.porcentaje || 0);
            const detalles = JSON.stringify(registro.detalles || []);
            const fecha = registro.fecha || new Date().toISOString();

            dbInstance.run(
                `INSERT OR REPLACE INTO historial_quizzes 
                 (id, usuario_id, correo, tipo, titulo, puntos, fallos, total, porcentaje, detalles, fecha)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                [id, usrId, correo, tipo, titulo, puntos, fallos, total, porcentaje, detalles, fecha]
            );

            if (autoPersistir) {
                guardarCambios();
            }
        } catch (err) {
            console.warn("[SQLite] Error al guardar intento de quiz:", err);
        }
    }

    // Ejecutar consultas SQL personalizadas (SELECT)
    function consultar(sql, params = []) {
        if (!isReady || !dbInstance) return [];

        try {
            const stmt = dbInstance.prepare(sql);
            if (params.length > 0) stmt.bind(params);
            const resultados = [];
            while (stmt.step()) {
                resultados.push(stmt.getAsObject());
            }
            stmt.free();
            return resultados;
        } catch (err) {
            console.warn("[SQLite] Error al ejecutar consulta SQL:", err);
            return [];
        }
    }

    // Descargar el archivo binario real 'mesh.db'
    function descargarDB() {
        if (!dbInstance) {
            alert("La base de datos SQLite aún no está lista.");
            return;
        }

        try {
            const data = dbInstance.export();
            const blob = new Blob([data], { type: "application/x-sqlite3" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "mesh.db";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            console.log("[SQLite] Archivo mesh.db descargado.");
        } catch (err) {
            console.error("[SQLite] Error al descargar mesh.db:", err);
        }
    }

    // Importar un archivo físico .db existente
    function importarDB(archivo) {
        if (!SQL || !archivo) return;

        const reader = new FileReader();
        reader.onload = async function () {
            try {
                const u8 = new Uint8Array(reader.result);
                dbInstance = new SQL.Database(u8);
                inicializarTablas(dbInstance);
                await persistirEnIndexedDB(u8);

                // Leer usuarios de SQLite y refrescar localStorage
                const usuariosSql = consultar("SELECT * FROM usuarios;");
                const intentosSql = consultar("SELECT * FROM historial_quizzes;");

                const usuariosReconstruidos = usuariosSql.map(u => {
                    const susIntentos = intentosSql.filter(q => q.usuario_id === u.id || q.correo === u.correo).map(q => {
                        let det = [];
                        try { det = JSON.parse(q.detalles); } catch (e) {}
                        return {
                            id: q.id,
                            tipo: q.tipo,
                            titulo: q.titulo,
                            puntos: q.puntos,
                            fallos: q.fallos,
                            total: q.total,
                            porcentaje: q.porcentaje,
                            detalles: det,
                            fecha: q.fecha
                        };
                    });
                    return {
                        id: u.id,
                        nombre: u.nombre,
                        correo: u.correo,
                        password: u.password,
                        rol: u.rol,
                        grado: u.grado,
                        fechaRegistro: u.fecha_registro,
                        historialQuizzes: susIntentos
                    };
                });

                if (usuariosReconstruidos.length > 0) {
                    localStorage.setItem("mesh_estudiantes_db", JSON.stringify(usuariosReconstruidos));
                    window.dispatchEvent(new CustomEvent("mesh_usuarios_actualizados"));
                }

                alert("Base de datos mesh.db importada correctamente con " + usuariosSql.length + " usuarios.");
                window.location.reload();
            } catch (err) {
                alert("Error al importar la base de datos: " + err.message);
            }
        };
        reader.readAsArrayBuffer(archivo);
    }

    // Exponer API global
    window.MeshSQLite = {
        init: inicializar,
        guardarUsuario: guardarUsuario,
        actualizarPassword: actualizarPassword,
        guardarIntentoQuiz: guardarIntentoQuiz,
        consultar: consultar,
        descargarDB: descargarDB,
        importarDB: importarDB,
        isReady: () => isReady
    };

    // Auto-arrancar en cuanto cargue el DOM
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", inicializar);
    } else {
        inicializar();
    }

})(window);
