/**
 * Servidor local en Node.js (Puro JavaScript - Sin dependencias externas)
 * Para ejecutar en tu computador si deseas probar en local:
 *   node server.js
 * Luego abre: http://localhost:3000
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

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
    ".db": "application/x-sqlite3"
};

const server = http.createServer((req, res) => {
    let cleanUrl = req.url.split("?")[0].split("#")[0];
    if (cleanUrl === "/" || cleanUrl === "") cleanUrl = "/index.html";

    let filePath = path.join(ROOT, decodeURIComponent(cleanUrl));

    fs.stat(filePath, (err, stats) => {
        if (!err && stats.isDirectory()) {
            filePath = path.join(filePath, "index.html");
        }

        fs.readFile(filePath, (readErr, content) => {
            if (readErr) {
                // SPA fallback para rutas no encontradas
                const indexHtml = path.join(ROOT, "index.html");
                fs.readFile(indexHtml, (spaErr, indexContent) => {
                    if (spaErr) {
                        res.writeHead(404, { "Content-Type": "text/plain" });
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
    console.log(`====================================================`);
    console.log(` MESH - Servidor Node.js activo en:`);
    console.log(` http://localhost:${PORT}`);
    console.log(` 100% JavaScript (HTML + CSS + JS con SQLite WASM)`);
    console.log(`====================================================`);
});
