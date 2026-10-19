/**
 * ===================================================================
 * MESH - SERVIDOR JAVASCRIPT (Node.js) CON BASE DE DATOS SQLITE
 * ===================================================================
 * 100% JavaScript (Sin Python, sin frameworks pesados, sin dependencias)
 * Utiliza el módulo nativo 'node:sqlite' de Node.js para crear y 
 * gestionar el archivo físico 'mesh.db' en la carpeta del proyecto.
 * 
 * Para iniciar:
 *   node server.js
 * Luego abre en tu navegador:
 *   http://localhost:3000
 * ===================================================================
 */

const http = require("http");
const fs = require("fs");
const path = require("path");
const { DatabaseSync } = require("node:sqlite");

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const DB_FILE = path.join(ROOT, "mesh.db");

// ===================================================================
// INICIALIZACIÓN DE LA BASE DE DATOS SQLITE (mesh.db)
// ===================================================================
console.log(`[SQLite] Conectando a archivo de base de datos: ${DB_FILE}`);
const db = new DatabaseSync(DB_FILE);

// Activar modo WAL para alta concurrencia y velocidad
db.exec("PRAGMA journal_mode = WAL;");

// Crear tablas si no existen
db.exec(`
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

db.exec(`
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

console.log("[SQLite] Tablas 'usuarios' e 'historial_quizzes' verificadas con éxito en mesh.db.");

// ===================================================================
// TIPOS MIME PARA SERVIR ARCHIVOS ESTÁTICOS
// ===================================================================
const MIME_TYPES = {
    ".html": "text/html; charset=UTF-8",
    ".css": "text/css; charset=UTF-8",
    ".js": "application/javascript; charset=UTF-8",
    ".json": "application/json; charset=UTF-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".wasm": "application/wasm",
    ".mp4": "video/mp4",
    ".db": "application/x-sqlite3",
    ".xls": "application/vnd.ms-excel"
};

// ===================================================================
// AYUDANTES PARA API REST
// ===================================================================
function responderJSON(res, statusCode, data) {
    res.writeHead(statusCode, {
        "Content-Type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Cache-Control": "no-cache"
    });
    res.end(JSON.stringify(data));
}

function leerCuerpoJSON(req) {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", chunk => {
            body += chunk;
            if (body.length > 5 * 1024 * 1024) { // Límite de 5MB
                reject(new Error("Cuerpo de solicitud demasiado grande"));
            }
        });
        req.on("end", () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (err) {
                reject(err);
            }
        });
        req.on("error", reject);
    });
}

function obtenerTodosLosUsuariosConHistorial() {
    const usuarios = db.prepare("SELECT * FROM usuarios ORDER BY fecha_registro ASC").all();
    const intentos = db.prepare("SELECT * FROM historial_quizzes ORDER BY fecha ASC").all();

    return usuarios.map(u => {
        const susIntentos = intentos
            .filter(q => q.usuario_id === u.id || (u.correo && q.correo && q.correo.toLowerCase() === u.correo.toLowerCase()))
            .map(q => {
                let det = [];
                try { det = JSON.parse(q.detalles || "[]"); } catch (e) {}
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
            grado: u.grado || u.rol,
            fechaRegistro: u.fecha_registro,
            historialQuizzes: susIntentos
        };
    });
}

// ===================================================================
// SERVIDOR HTTP PRINCIPAL
// ===================================================================
const server = http.createServer(async (req, res) => {
    // Manejo de CORS Preflight
    if (req.method === "OPTIONS") {
        res.writeHead(204, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        });
        res.end();
        return;
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    const pathname = parsedUrl.pathname;

    // ---------------------------------------------------------------
    // ENDPOINTS DE API SQLITE (mesh.db)
    // ---------------------------------------------------------------

    // 1. Obtener lista completa de usuarios e historial
    if (pathname === "/api/usuarios" && req.method === "GET") {
        try {
            const data = obtenerTodosLosUsuariosConHistorial();
            responderJSON(res, 200, data);
        } catch (err) {
            console.error("[API Error] /api/usuarios:", err);
            responderJSON(res, 500, { success: false, error: err.message });
        }
        return;
    }

    // 2. Registrar o actualizar un usuario
    if (pathname === "/api/registro" && req.method === "POST") {
        try {
            const u = await leerCuerpoJSON(req);
            if (!u.correo || !u.nombre) {
                responderJSON(res, 400, { success: false, error: "Datos incompletos" });
                return;
            }

            const id = u.id || ("usr_" + Date.now());
            const nombre = u.nombre.trim();
            const correo = u.correo.trim().toLowerCase();
            const password = u.password || "";
            const rol = u.rol || "Estudiante";
            const grado = u.grado || rol;
            const fecha = u.fechaRegistro || new Date().toISOString();

            db.prepare(`
                INSERT INTO usuarios (id, nombre, correo, password, rol, grado, fecha_registro)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(correo) DO UPDATE SET
                    nombre = excluded.nombre,
                    password = excluded.password,
                    rol = excluded.rol,
                    grado = excluded.grado;
            `).run(id, nombre, correo, password, rol, grado, fecha);

            console.log(`[SQLite] Usuario guardado en mesh.db: ${correo} (${rol})`);
            responderJSON(res, 200, {
                success: true,
                usuario: { id, nombre, correo, password, rol, grado, fechaRegistro: fecha }
            });
        } catch (err) {
            console.error("[API Error] /api/registro:", err);
            responderJSON(res, 500, { success: false, error: err.message });
        }
        return;
    }

    // 3. Guardar intento de quiz
    if (pathname === "/api/quiz-resultado" && req.method === "POST") {
        try {
            const q = await leerCuerpoJSON(req);
            if (!q.correo || !q.tipo) {
                responderJSON(res, 400, { success: false, error: "Datos de quiz incompletos" });
                return;
            }

            const id = q.id || ("intento_" + Date.now());
            const usuarioId = q.usuario_id || "";
            const correo = (q.correo || "").trim().toLowerCase();
            const tipo = q.tipo;
            const titulo = q.titulo || tipo;
            const puntos = Number(q.puntos || 0);
            const fallos = Number(q.fallos || 0);
            const total = Number(q.total || 0);
            const porcentaje = Number(q.porcentaje || 0);
            const detalles = JSON.stringify(q.detalles || []);
            const fecha = q.fecha || new Date().toISOString();

            db.prepare(`
                INSERT OR REPLACE INTO historial_quizzes 
                (id, usuario_id, correo, tipo, titulo, puntos, fallos, total, porcentaje, detalles, fecha)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            `).run(id, usuarioId, correo, tipo, titulo, puntos, fallos, total, porcentaje, detalles, fecha);

            console.log(`[SQLite] Intento de quiz guardado en mesh.db para ${correo}: ${titulo} (${porcentaje}%)`);
            responderJSON(res, 200, { success: true, id: id });
        } catch (err) {
            console.error("[API Error] /api/quiz-resultado:", err);
            responderJSON(res, 500, { success: false, error: err.message });
        }
        return;
    }

    // 4. Cambiar contraseña
    if (pathname === "/api/cambiar-password" && req.method === "POST") {
        try {
            const body = await leerCuerpoJSON(req);
            const correo = (body.correo || "").trim().toLowerCase();
            const nueva = body.nuevaPassword || "";

            if (!correo || !nueva) {
                responderJSON(res, 400, { success: false, error: "Correo y nueva contraseña requeridos" });
                return;
            }

            const info = db.prepare(`
                UPDATE usuarios SET password = ? WHERE lower(correo) = lower(?);
            `).run(nueva, correo);

            console.log(`[SQLite] Contraseña actualizada en mesh.db para: ${correo}`);
            responderJSON(res, 200, { success: true, cambios: info.changes });
        } catch (err) {
            console.error("[API Error] /api/cambiar-password:", err);
            responderJSON(res, 500, { success: false, error: err.message });
        }
        return;
    }

    // 5. Sincronización en lote
    if (pathname === "/api/sync" && req.method === "POST") {
        try {
            const lista = await leerCuerpoJSON(req);
            if (Array.isArray(lista)) {
                const stmtUser = db.prepare(`
                    INSERT INTO usuarios (id, nombre, correo, password, rol, grado, fecha_registro)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                    ON CONFLICT(correo) DO UPDATE SET
                        nombre = excluded.nombre,
                        password = excluded.password,
                        rol = excluded.rol,
                        grado = excluded.grado;
                `);

                const stmtQuiz = db.prepare(`
                    INSERT OR REPLACE INTO historial_quizzes
                    (id, usuario_id, correo, tipo, titulo, puntos, fallos, total, porcentaje, detalles, fecha)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
                `);

                for (const u of lista) {
                    if (!u || !u.correo) continue;
                    const id = u.id || ("usr_" + Date.now());
                    const nombre = u.nombre || "";
                    const correo = u.correo.trim().toLowerCase();
                    const pass = u.password || "";
                    const rol = u.rol || "Estudiante";
                    const grado = u.grado || rol;
                    const fecha = u.fechaRegistro || new Date().toISOString();

                    stmtUser.run(id, nombre, correo, pass, rol, grado, fecha);

                    if (Array.isArray(u.historialQuizzes)) {
                        for (const q of u.historialQuizzes) {
                            if (!q) continue;
                            const qId = q.id || ("intento_" + Date.now());
                            stmtQuiz.run(
                                qId,
                                id,
                                correo,
                                q.tipo || "",
                                q.titulo || q.tipo || "",
                                Number(q.puntos || 0),
                                Number(q.fallos || 0),
                                Number(q.total || 0),
                                Number(q.porcentaje || 0),
                                JSON.stringify(q.detalles || []),
                                q.fecha || new Date().toISOString()
                            );
                        }
                    }
                }
                console.log(`[SQLite] Sincronización en lote procesada: ${lista.length} usuarios.`);
            }

            const dataFinal = obtenerTodosLosUsuariosConHistorial();
            responderJSON(res, 200, { success: true, usuarios: dataFinal });
        } catch (err) {
            console.error("[API Error] /api/sync:", err);
            responderJSON(res, 500, { success: false, error: err.message });
        }
        return;
    }

    // ---------------------------------------------------------------
    // SERVIR ARCHIVOS ESTÁTICOS (HTML, CSS, JS, IMÁGENES, VIDEOS)
    // ---------------------------------------------------------------
    let cleanUrl = pathname;
    if (cleanUrl === "/" || cleanUrl === "") cleanUrl = "/index.html";

    let filePath = path.join(ROOT, decodeURIComponent(cleanUrl));

    fs.stat(filePath, (err, stats) => {
        if (!err && stats.isDirectory()) {
            filePath = path.join(filePath, "index.html");
        }

        fs.readFile(filePath, (readErr, content) => {
            if (readErr) {
                // SPA Fallback a index.html para rutas no encontradas
                const indexHtml = path.join(ROOT, "index.html");
                fs.readFile(indexHtml, (spaErr, indexContent) => {
                    if (spaErr) {
                        res.writeHead(404, { "Content-Type": "text/plain; charset=UTF-8" });
                        res.end("404 Not Found");
                    } else {
                        res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
                        res.end(indexContent);
                    }
                });
                return;
            }

            const ext = path.extname(filePath).toLowerCase();
            const mime = MIME_TYPES[ext] || "application/octet-stream";

            res.writeHead(200, {
                "Content-Type": mime,
                "Cache-Control": "no-cache"
            });
            res.end(content);
        });
    });
});

server.listen(PORT, () => {
    console.log("====================================================");
    console.log(` MESH - Servidor Node.js con SQLite`);
    console.log(` URL Local: http://localhost:${PORT}`);
    console.log(` Archivo SQLite: ${DB_FILE}`);
    console.log(" 100% JavaScript (HTML + CSS + JS) - Cero Python");
    console.log("====================================================");
});
