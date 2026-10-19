@echo off
title Servidor MESH (JavaScript + SQLite)
color 0b
echo ========================================================
echo   INICIANDO PLATAFORMA MESH (JavaScript + SQLite)
echo   100%% HTML, CSS, JavaScript (Cero Python)
echo ========================================================
echo.
echo Iniciando servidor Node.js y conectando base de datos mesh.db...
start http://localhost:3000
node server.js
pause
