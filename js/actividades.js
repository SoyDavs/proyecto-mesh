/* =======================================================
   ACTIVIDADES EDUCATIVAS INTERACTIVAS (MESH)
   Gamificado y diseñado para jóvenes de 15 años
   100% Vector React-Icons (Sin emojis) & Navegación SPA
   ======================================================= */

function crearActividades() {
    const contenido = document.getElementById("contenido");
    if (!contenido) return;

    const estudiante = typeof obtenerEstudianteActivo === "function" ? obtenerEstudianteActivo() : null;

    contenido.innerHTML = `
        <section class="actividades">

            <div class="actividades-intro">
                <div class="actividades-badge">
                    ${icon('gamepad', 18)}
                    <span>Simulador de Habilidades</span>
                </div>
                <h1>Zona de Desafíos</h1>
                <p>
                    Pon a prueba tus habilidades tecnológicas. Selecciona una misión, 
                    supera las preguntas interactivas y obtén una retroalimentación detallada 
                    de lo que te quedó bien y lo que te quedó mal.
                </p>
            </div>

            <!-- BANNER DE IDENTIFICACIÓN DE ESTUDIANTE -->
            ${estudiante ? `
                <div class="estudiante-sesion-banner">
                    <div class="estudiante-info-wrap">
                        <div class="estudiante-avatar-icon">
                            ${icon('user', 24)}
                        </div>
                        <div class="estudiante-datos">
                            <span class="nombre-tag">${estudiante.nombre}</span>
                            <div class="grado-correo-tag">
                                <span class="grado-pill">${estudiante.rol || estudiante.grado}</span>
                                <span>${estudiante.correo}</span>
                            </div>
                        </div>
                    </div>
                    <button class="btn-cerrar-sesion" onclick="cerrarSesionEstudiante()">
                        ${icon('x', 14)} Cerrar Sesión
                    </button>
                </div>

                ${((estudiante.rol && estudiante.rol.toLowerCase().includes('docente')) || (estudiante.grado && estudiante.grado.toLowerCase().includes('docente'))) ? `
                    <div class="docente-banner-actividades">
                        <div class="docente-banner-info">
                            <div class="docente-banner-icon">
                                ${icon('award', 28)}
                            </div>
                            <div class="docente-banner-text">
                                <h3>Panel de Supervisión para Docentes</h3>
                                <p>Identificado como Docente: consulta qué preguntas respondieron bien, cuántas mal y los porcentajes de éxito de tus estudiantes registrados.</p>
                            </div>
                        </div>
                        <button class="btn-ir-panel-docente" onclick="navegar('docente')">
                            ${icon('award', 16)} Ver Resultados de Estudiantes
                        </button>
                    </div>
                ` : ''}
            ` : `
                <div class="estudiante-aviso-bloqueo">
                    <div class="aviso-bloqueo-texto">
                        <div class="aviso-icono">${icon('shield-check', 30)}</div>
                        <div>
                            <strong>Registro de Usuario Requerido</strong>
                            <p>Para realizar las misiones evaluativas y registrar tus calificaciones, debes identificarte seleccionando si eres Estudiante, Docente o Invitado.</p>
                        </div>
                    </div>
                    <button class="btn-identificarse" onclick="abrirModalAuth('login')">
                        ${icon('user', 16)} Iniciar Sesión / Registrarse
                    </button>
                </div>
            `}

            <div class="categorias-actividades">

                <!-- SEGURIDAD -->
                <article class="actividad-card">
                    <div class="actividad-card-body">
                        <div class="actividad-icono-wrap">
                            ${icon('shield', 36)}
                        </div>
                        <h2>Seguridad Digital</h2>
                        <p>
                            Detecta phishing en Discord y Roblox, protégete de estafas, 
                            crea contraseñas imposibles de hackear y combate el ciberacoso.
                        </p>
                        <div class="actividad-tags">
                            <span class="act-tag">${icon('lock', 12)} Ciberdefensa</span>
                            <span class="act-tag">${icon('user-x', 12)} Phishing</span>
                        </div>
                    </div>
                    <button class="btn-iniciar-mision" onclick="navegar('actividades/seguridad')">
                        ${icon('zap', 18)}
                        <span>Iniciar Misión</span>
                    </button>
                </article>

                <!-- REDES -->
                <article class="actividad-card">
                    <div class="actividad-card-body">
                        <div class="actividad-icono-wrap">
                            ${icon('network', 36)}
                        </div>
                        <h2>Redes & Conectividad</h2>
                        <p>
                            Descubre cómo funciona el Wi-Fi, por qué ocurre el lag en tus partidas, 
                            para qué sirve tu IP y cómo viajan los paquetes en Internet.
                        </p>
                        <div class="actividad-tags">
                            <span class="act-tag">${icon('wifi', 12)} Wi-Fi</span>
                            <span class="act-tag">${icon('globe', 12)} WAN / LAN</span>
                        </div>
                    </div>
                    <button class="btn-iniciar-mision" onclick="navegar('actividades/redes')">
                        ${icon('zap', 18)}
                        <span>Iniciar Misión</span>
                    </button>
                </article>

                <!-- CABLEADO ESTRUCTURADO -->
                <article class="actividad-card">
                    <div class="actividad-card-body">
                        <div class="actividad-icono-wrap">
                            ${icon('cable', 36)}
                        </div>
                        <h2>Cableado Estructurado</h2>
                        <p>
                            Domina la norma T568B, el conector RJ45, herramientas de taller, 
                            categorías de cable UTP y técnicas para armar redes sin pérdidas.
                        </p>
                        <div class="actividad-tags">
                            <span class="act-tag">${icon('plug', 12)} Norma T568B</span>
                            <span class="act-tag">${icon('tool', 12)} Ponchado RJ45</span>
                        </div>
                    </div>
                    <button class="btn-iniciar-mision" onclick="navegar('actividades/cableado')">
                        ${icon('zap', 18)}
                        <span>Iniciar Misión</span>
                    </button>
                </article>

                <!-- CUESTIONARIO GENERAL 1 -->
                <article class="actividad-card">
                    <div class="actividad-card-body">
                        <div class="actividad-icono-wrap">
                            ${icon('file-text', 36)}
                        </div>
                        <h2>Cuestionario General 1</h2>
                        <p>
                            Evaluación integral que combina ciberdefensa, direccionamiento de red, 
                            protocolos y montaje de cableado. Preguntas teóricas y casos reales.
                        </p>
                        <div class="actividad-tags">
                            <span class="act-tag">${icon('layers', 12)} Nivel Mixto</span>
                            <span class="act-tag">${icon('check-circle', 12)} 10 Desafíos</span>
                        </div>
                    </div>
                    <button class="btn-iniciar-mision" onclick="navegar('actividades/general1')">
                        ${icon('zap', 18)}
                        <span>Iniciar Misión</span>
                    </button>
                </article>

                <!-- CUESTIONARIO GENERAL 2 -->
                <article class="actividad-card">
                    <div class="actividad-card-body">
                        <div class="actividad-icono-wrap">
                            ${icon('trophy', 36)}
                        </div>
                        <h2>Cuestionario General 2</h2>
                        <p>
                            Segunda prueba global con nuevos casos prácticos de la vida real, 
                            análisis de riesgos digitales y arquitectura física de telecomunicaciones.
                        </p>
                        <div class="actividad-tags">
                            <span class="act-tag">${icon('star', 12)} Desafío Maestro</span>
                            <span class="act-tag">${icon('check-circle', 12)} 10 Desafíos</span>
                        </div>
                    </div>
                    <button class="btn-iniciar-mision" onclick="navegar('actividades/general2')">
                        ${icon('zap', 18)}
                        <span>Iniciar Misión</span>
                    </button>
                </article>

            </div>

        </section>
    `;
}

/* =======================================================
   BANCO DE PREGUNTAS (CASOS DE LA VIDA REAL Y TEORÍA WEB)
   Sin emojis - Con retroalimentación pedagógica detallada
   ======================================================= */

const preguntas = {

    /* ===================================================
       SEGURIDAD DIGITAL (12 PREGUNTAS)
       =================================================== */
    seguridad: [
        {
            contexto: "Caso Real: Redes Sociales & Discord",
            pregunta: "Te llega un mensaje en Discord o WhatsApp diciendo: '¡Felicidades! Ganaste una tarjeta de $100 dólares o skins legendarias gratis. Entra a este enlace e inicia sesión con tu cuenta: robIox-login.xyz'. ¿Qué deberías hacer?",
            opciones: [
                "Entrar rápido antes de que se acabe la promoción",
                "Ingresar mi correo y contraseña para reclamar el premio",
                "Sospechar de phishing: no abrir el enlace y bloquear al remitente",
                "Reenviarlo a todos mis amigos para que también ganen"
            ],
            correcta: 2,
            explicacion: "¡Es una trampa de Phishing! Los atacantes clonan páginas famosas con premios falsos para robarte la cuenta. Las plataformas oficiales nunca regalan cosas pidiéndote tu clave en enlaces extraños."
        },
        {
            contexto: "Caso Real: Creación de Cuentas & Acceso",
            pregunta: "Estás creando la clave para tu cuenta de videojuegos o correo personal. ¿Cuál de estas opciones te protege de verdad contra hackers?",
            opciones: [
                "Tu apodo o fecha de nacimiento (ej: Juan2009)",
                "12345678 o password",
                "Una combinación de más de 10 caracteres con letras mayúsculas, minúsculas, números y símbolos (ej: C0n3x!0n$2026)",
                "La misma contraseña corta que usas en todas tus redes sociales"
            ],
            correcta: 2,
            explicacion: "Las contraseñas robustas combinan mayúsculas, minúsculas, números y símbolos. Usar fechas o la misma clave en todos lados facilita que un hacker acceda a todas tus cuentas a la vez mediante ataques de diccionario o fuerza bruta."
        },
        {
            contexto: "Caso Real: Convivencia Digital",
            pregunta: "En un grupo del colegio empiezan a compartir fotos privadas y stickers burlones de un compañero sin su permiso, insultándolo repetidamente. ¿Qué situación es esta?",
            opciones: [
                "Solo es humor pesado y no tiene consecuencias",
                "Ciberacoso (Cyberbullying): una agresión digital sistemática que daña la integridad y salud mental",
                "Un fallo técnico de la aplicación de mensajería",
                "Un virus informático que altera las imágenes"
            ],
            correcta: 1,
            explicacion: "El ciberacoso no es un juego; es una agresión que daña la reputación y la salud emocional de la víctima. Lo correcto es no viralizar el contenido, apoyar a la persona afectada y avisar a un adulto o directiva escolar."
        },
        {
            contexto: "Caso Real: Riesgos en Línea",
            pregunta: "Un desconocido en una partida online te regala pases de batalla caros, te dice que es tu 'mejor amigo' y luego te pide tu WhatsApp y fotos íntimas pidiéndote 'que sea nuestro secreto'. ¿A qué riesgo te estás enfrentando?",
            opciones: [
                "A una oportunidad genial para ganar amigos en internet",
                "A Grooming: manipulación de un adulto hacia un menor con fines de abuso",
                "A un error de emparejamiento del juego",
                "A un patrocinio oficial de esports"
            ],
            correcta: 1,
            explicacion: "El Grooming ocurre cuando un adulto se gana tu confianza regalándote cosas y luego exige fotos o secretos. ¡Nunca compartas fotos privadas ni datos personales, bloquea de inmediato y avisa a tus padres o profesores!"
        },
        {
            contexto: "Caso Real: Descargas & Piratería",
            pregunta: "Ves un video en redes con un enlace para descargar un juego de pago 'totalmente gratis con hacks ilimitados'. ¿Cuál es el peligro real?",
            opciones: [
                "Que el juego sea aburrido",
                "Que el archivo contenga software malicioso (Malware/Troyano) diseñado para robar tus fotos, contraseñas o espiar tu cámara",
                "Que el juego se descargue demasiado rápido",
                "Ninguno, todo lo que sale en redes es seguro"
            ],
            correcta: 1,
            explicacion: "Los juegos 'pirateados' o 'hacks' casi siempre esconden troyanos o virus espía para tomar el control de tu teléfono o PC y robar tus sesiones abiertas."
        },
        {
            contexto: "Teoría Web: Tríada CIA de la Seguridad",
            pregunta: "En el módulo de ciberdefensa del sitio web se enseña la 'Tríada CIA', el pilar fundamental de la seguridad informática. ¿Cuáles son sus tres principios y qué garantizan?",
            opciones: [
                "Conexión, Internet y Antivirus: mantener la velocidad del Wi-Fi estable",
                "Confidencialidad, Integridad y Disponibilidad: que solo personas autorizadas accedan a los datos, que la información no sea alterada y que los servicios estén accesibles cuando se requieran",
                "Cuentas, Identidad y Autenticación: memorizar contraseñas complejas sin cambiarlas",
                "Cortafuegos, IP y Almacenamiento: bloquear páginas de juegos en el navegador"
            ],
            correcta: 1,
            explicacion: "La Tríada CIA es la base universal de la ciberseguridad: Confidencialidad (privacidad de los datos), Integridad (información exacta sin modificaciones no autorizadas) y Disponibilidad (sistemas operativos y funcionales para los usuarios legítimos)."
        },
        {
            contexto: "Caso Real: Secuestro de Cuenta de WhatsApp",
            pregunta: "Un supuesto amigo de tu salón te escribe por WhatsApp diciendo: 'Hola, por error envié un código de 6 dígitos a tu número por SMS, ¿me lo puedes reenviar urgente?'. ¿Qué está ocurriendo en realidad?",
            opciones: [
                "Tu amigo realmente cometió un error y debes enviarle el código de inmediato",
                "Un ciberdelincuente hackeó la cuenta de tu amigo y está intentando registrar tu propio WhatsApp en su teléfono usando tu código de confirmación",
                "Es una notificación oficial del soporte técnico de WhatsApp regalando saldo",
                "El teléfono de tu amigo se quedó sin memoria y necesita compartir almacenamiento"
            ],
            correcta: 1,
            explicacion: "¡Es una de las estafas más comunes! El atacante instala WhatsApp con tu número y solicita el SMS de verificación. Si se lo mandas, perderás el acceso a tu cuenta y los estafadores le pedirán dinero prestado a tus contactos suplantándote."
        },
        {
            contexto: "Teoría Web: Clasificación de Malware",
            pregunta: "De acuerdo con el módulo teórico de anatomía del malware en Aprende, ¿cuál es la diferencia principal entre un Troyano y un Ransomware?",
            opciones: [
                "El troyano se disfraza de programa legítimo para abrir puertas traseras, mientras que el ransomware cifra/bloquea tus archivos y exige un rescate económico",
                "El troyano solo daña la pantalla y el ransomware borra la memoria RAM del equipo",
                "El ransomware es un programa antivirus oficial y el troyano es un tipo de cable de red",
                "Ambos son exactamente lo mismo y se eliminan simplemente reiniciando el computador"
            ],
            correcta: 0,
            explicacion: "El Troyano aparenta ser un juego o aplicación inofensiva para infiltrar espías o puertas traseras, mientras que el Ransomware secuestra y encripta tus fotos y documentos personales, dejando una nota extorsiva exigiendo un rescate."
        },
        {
            contexto: "Caso Real: Conexión en Redes Wi-Fi Públicas",
            pregunta: "Estás en una cafetería o centro comercial y te conectas a una red Wi-Fi abierta sin contraseña llamada 'Wi-Fi_Gratis_Mall'. Decides entrar a tu cuenta bancaria o ingresar tu tarjeta de crédito. ¿Por qué esto es muy riesgoso?",
            opciones: [
                "Porque la batería del celular se descargará mucho más rápido de lo habitual",
                "Porque un atacante conectado a la misma red puede interceptar el tráfico no cifrado mediante un ataque Man-in-the-Middle (hombre en el medio) y robar tus credenciales",
                "Porque el centro comercial te cobrará automáticamente por cada mega descargado",
                "Porque la pantalla táctil de tu teléfono dejará de responder"
            ],
            correcta: 1,
            explicacion: "En redes Wi-Fi abiertas cualquiera puede espiar los paquetes de datos que viajan por el aire (ataque Man-in-the-Middle o sniffer). Para hacer compras o transacciones sensibles, usa tus datos móviles o una red privada virtual (VPN)."
        },
        {
            contexto: "Teoría Web: Autenticación de Dos Factores (2FA)",
            pregunta: "¿Por qué activar la Autenticación de Dos Factores (2FA) mediante una aplicación autenticadora (como Google Authenticator) es mucho más seguro que usar únicamente una contraseña tradicional?",
            opciones: [
                "Porque acelera la velocidad de descarga en tus videojuegos favoritos",
                "Porque aunque un hacker descubra o filtre tu contraseña en internet, no podrá ingresar sin el código temporal generado en tu teléfono físico",
                "Porque elimina la necesidad de recordar cualquier tipo de correo electrónico",
                "Porque hace que tu cuenta sea invisible para los administradores del juego"
            ],
            correcta: 1,
            explicacion: "El 2FA exige dos factores independientes: 'algo que sabes' (tu contraseña) y 'algo que tienes' (tu teléfono con el código dinámico). Aunque un atacante obtenga tu clave en una filtración masiva, sin tu dispositivo físico no podrá entrar."
        },
        {
            contexto: "Caso Real: Privacidad de Fotos & Metadatos EXIF",
            pregunta: "Un usuario sube a una red social pública una foto tomada desde la ventana de su habitación, y minutos después un desconocido publica en los comentarios la dirección exacta de su casa. ¿Cómo pudo averiguar su ubicación?",
            opciones: [
                "Adivinó por el color de las paredes de la habitación",
                "La fotografía original contenía metadatos EXIF con las coordenadas GPS exactas grabadas por la cámara del teléfono",
                "Un satélite militar lo estaba rastreando en tiempo real",
                "La aplicación de la cámara tiene un micrófono que dijo su dirección en voz alta"
            ],
            correcta: 1,
            explicacion: "Las fotos tomadas con teléfonos inteligentes suelen guardar metadatos EXIF que incluyen fecha, modelo del dispositivo y coordenadas de geolocalización GPS. Compartir fotos sin desactivar la ubicación permite a extraños hacer Doxing y ubicar tu domicilio."
        },
        {
            contexto: "Teoría Web: Principios de Ingeniería Social",
            pregunta: "En el módulo de ingeniería social del sitio web se explica cómo los atacantes manipulan la psicología humana. ¿Cuáles son los dos detonantes psicológicos más usados en ataques de phishing?",
            opciones: [
                "La pereza y el aburrimiento extremo",
                "La sensación de falsa urgencia ('¡Tu cuenta será cerrada en 5 minutos!') y la apelación a una supuesta autoridad ('Soporte Oficial / Policía')",
                "El humor y los chistes en foros públicos",
                "La paciencia y las conversaciones largas durante meses"
            ],
            correcta: 1,
            explicacion: "Los ciberdelincuentes explotan la urgencia ('actúa ya o perderás tu cuenta') y la falsa autoridad ('somos el equipo de seguridad de Instagram') para que entres en pánico y no te detengas a analizar con calma la trampa."
        }
    ],

    /* ===================================================
       REDES & CONECTIVIDAD (12 PREGUNTAS)
       =================================================== */
    redes: [
        {
            contexto: "Caso Real: Gaming & Rendimiento",
            pregunta: "En una sala de videojuegos o colegio con 20 computadoras, todas se conectan por cable a una caja que reparte los paquetes del juego a cada máquina sin que se crucen ni haya lag. ¿Qué dispositivo es?",
            opciones: [
                "Un Switch (Conmutador de red)",
                "Un Teclado mecánico",
                "Un Disco duro externo",
                "Un Altavoz Bluetooth"
            ],
            correcta: 0,
            explicacion: "El Switch es el corazón de una red local (LAN). Conecta múltiples equipos y envía los datos directamente al puerto del destinatario usando su dirección física MAC, evitando colisiones y que la red se sature."
        },
        {
            contexto: "Caso Real: Dispositivos Personales",
            pregunta: "Estás en el gimnasio o en el autobús escuchando música en tus audífonos inalámbricos conectados a tu celular por Bluetooth. ¿Qué tipo de red estás usando?",
            opciones: [
                "WAN (Red de Área Mundial)",
                "PAN (Red de Área Personal)",
                "MAN (Red Metropolitana)",
                "LAN cableada"
            ],
            correcta: 1,
            explicacion: "¡PAN (Personal Area Network)! Cubre distancias muy cortas (pocos metros) y se utiliza para conectar tus dispositivos personales cercanos como audífonos, smartwatches y celulares."
        },
        {
            contexto: "Caso Real: Conectividad en Casa",
            pregunta: "En una casa con 5 celulares, 2 consolas y 1 Smart TV, ¿cómo sabe el router a cuál pantalla específica mandarle el video que tú estás viendo en YouTube?",
            opciones: [
                "Porque adivina por el color del teléfono",
                "Porque cada dispositivo tiene asignada una Dirección IP única dentro de la red local",
                "Porque todos los videos se transmiten a todas las pantallas a la vez",
                "Por la marca del televisor"
            ],
            correcta: 1,
            explicacion: "Cada dispositivo tiene una Dirección IP privada única (ej: 192.168.1.15). Funciona como el casillero o número de tu casa, asegurando que tus paquetes de datos lleguen solo a tu pantalla."
        },
        {
            contexto: "Caso Real: Navegación Web",
            pregunta: "Tú escribes 'instagram.com' en tu navegador y no te tienes que aprender de memoria números raros como '157.240.22.174'. ¿Qué servicio de red traduce ese nombre a su IP numérica?",
            opciones: [
                "El Servidor DNS (Sistema de Nombres de Dominio)",
                "El ventilador del procesador",
                "El cable de poder",
                "La memoria RAM"
            ],
            correcta: 0,
            explicacion: "El DNS es como la agenda de contactos de Internet. En milisegundos convierte nombres fáciles como 'instagram.com' en la dirección IP numérica que las computadoras y servidores entienden."
        },
        {
            contexto: "Caso Real: Conexión Global",
            pregunta: "Estás jugando una partida online con un amigo de España y otro de México en servidores ubicados en Estados Unidos. ¿Qué red hace posible esta conexión intercontinental?",
            opciones: [
                "Una red PAN de Bluetooth",
                "Una red WAN (Wide Area Network / Internet global)",
                "Una red LAN de salón",
                "Una conexión infrarroja"
            ],
            correcta: 1,
            explicacion: "Internet es la red WAN más grande del planeta. Conecta países y continentes a través de cables submarinos de fibra óptica y satélites a velocidades impresionantes."
        },
        {
            contexto: "Teoría Web: Topologías de Red",
            pregunta: "En el sitio web se explican las topologías de red. Si en una sala de informática se corta el cable de red de una computadora y las demás 29 computadoras siguen funcionando normalmente con Internet, ¿qué topología se está usando?",
            opciones: [
                "Topología en Bus, porque los cables son independientes",
                "Topología en Estrella, porque cada equipo tiene su propio cable directo conectado al Switch central",
                "Topología en Anillo, porque el testigo salta los cables rotos",
                "Topología en Cascada lineal sin switches"
            ],
            correcta: 1,
            explicacion: "En la topología en Estrella (el estándar moderno), cada equipo tiene un enlace punto a punto con un nodo central (Switch). Si un cable se daña, solo esa máquina pierde conexión sin interrumpir el resto de la red."
        },
        {
            contexto: "Caso Real: Lag en Partidas & Conectividad",
            pregunta: "Estás jugando un torneo competitivo en línea y sufres constantes tirones de lag ('ping spike' de 300ms) y pérdida de paquetes mientras usas Wi-Fi a través de tres paredes. Tu hermano conecta su PC con un cable Ethernet y juega a 25ms estables. ¿Por qué el cable supera al Wi-Fi?",
            opciones: [
                "Porque los cables de cobre absorben la electricidad de la casa para acelerar la tarjeta de video",
                "Porque la conexión por cable Ethernet no sufre por interferencias de radio, paredes, microondas ni congestión del espectro inalámbrico",
                "Porque el Wi-Fi solo funciona de noche",
                "Porque el cable Ethernet tiene más colores en su cubierta plástica"
            ],
            correcta: 1,
            explicacion: "Las ondas de radio del Wi-Fi chocan contra paredes y sufren interferencias electromagnéticas con otros routers y electrodomésticos. El cable de red Ethernet transmite los paquetes por hilos de cobre trenzados con mínima latencia y cero pérdidas de paquetes."
        },
        {
            contexto: "Teoría Web: Protocolos TCP vs UDP",
            pregunta: "De acuerdo con el módulo de protocolos de Internet en Aprende, ¿por qué los videojuegos en línea y las videollamadas en directo prefieren utilizar el protocolo UDP en lugar de TCP?",
            opciones: [
                "Porque UDP no exige confirmación de entrega ni reenvía paquetes perdidos, priorizando la máxima velocidad y menor retraso en tiempo real",
                "Porque TCP está prohibido en servidores de videojuegos",
                "Porque UDP comprime los gráficos 3D en la memoria RAM del servidor",
                "Porque TCP solo funciona en computadoras con cables de fibra óptica"
            ],
            correcta: 0,
            explicacion: "TCP es confiable: verifica que cada paquete llegue en orden y si uno se pierde lo reenvía (ideal para archivos o páginas web). UDP prioriza la velocidad: envía los datos de inmediato sin esperar confirmación, ideal para streaming y shooters donde un paquete viejo ya no sirve."
        },
        {
            contexto: "Caso Real: Seguridad Web (HTTP vs HTTPS)",
            pregunta: "Entras a una tienda en línea y en la barra de direcciones del navegador ves una advertencia roja: 'No seguro - http://tienda-ofertas.com'. ¿Qué significa que use HTTP en lugar de HTTPS?",
            opciones: [
                "Significa que la página web carga al doble de velocidad",
                "Significa que los datos viajan en texto plano sin cifrar, por lo que cualquier intermediario en la red puede leer tu contraseña o datos bancarios",
                "Significa que la tienda solo acepta pagos en efectivo",
                "Significa que el navegador web necesita reiniciarse"
            ],
            correcta: 1,
            explicacion: "HTTPS utiliza cifrado SSL/TLS (puerto 443) para encriptar los datos entre tu navegador y el servidor. En HTTP común, la información viaja en texto plano y cualquier persona con acceso al router o a la red puede interceptarla."
        },
        {
            contexto: "Teoría Web: Modelo OSI y Capas",
            pregunta: "En el Modelo OSI de 7 capas explicado en Aprende, ¿en qué capa operan los Routers que deciden la mejor ruta para enviar paquetes a través de Internet usando direcciones IP?",
            opciones: [
                "Capa 1: Física (cables y señales eléctricas)",
                "Capa 3: Red (direccionamiento lógico IP y enrutamiento)",
                "Capa 7: Aplicación (navegadores y clientes de correo)",
                "Capa 5: Sesión (control de diálogos)"
            ],
            correcta: 1,
            explicacion: "Los Routers son dispositivos de Capa 3 (Capa de Red). Su función principal es leer las direcciones IP de origen y destino para conmutar y enrutar paquetes a través de diferentes redes del mundo."
        },
        {
            contexto: "Teoría Web: Direccionamiento IPv4 vs IPv6",
            pregunta: "¿Por qué la industria de redes mundial está migrando del protocolo IPv4 al nuevo protocolo IPv6?",
            opciones: [
                "Porque IPv4 se quedó sin direcciones disponibles (solo permitía unos 4.300 millones de IPs de 32 bits), mientras que IPv6 ofrece prácticamente infinitas direcciones de 128 bits",
                "Porque IPv4 no permitía ver videos en resolución 4K",
                "Porque los cables de fibra óptica son incompatibles con IPv4",
                "Porque las direcciones IPv4 solo funcionaban en computadoras portátiles"
            ],
            correcta: 0,
            explicacion: "IPv4 usa 32 bits y genera un máximo de 4.294.967.296 direcciones. Con miles de millones de teléfonos, consolas, relojes inteligentes y sensores IoT, las IPs se agotaron. IPv6 usa 128 bits, ofreciendo 340 sextillones de direcciones únicas."
        },
        {
            contexto: "Caso Real: Asignación de IP en Casa (DHCP)",
            pregunta: "Llega un amigo a tu casa con su teléfono, le das la clave del Wi-Fi y en 2 segundos ya tiene Internet sin que nadie tenga que configurar números manualmente. ¿Qué servicio del router le otorgó automáticamente su IP, máscara y DNS?",
            opciones: [
                "El Servidor DHCP (Protocolo de Configuración Dinámica de Host)",
                "El Bluetooth del televisor",
                "La memoria caché del navegador",
                "El botón de encendido del módem"
            ],
            correcta: 0,
            explicacion: "El protocolo DHCP (Dynamic Host Configuration Protocol) es el encargado de prestarle automáticamente una dirección IP libre, la puerta de enlace y los servidores DNS a cualquier dispositivo nuevo que se conecte a la red."
        }
    ],

    /* ===================================================
       CABLEADO ESTRUCTURADO (10 PREGUNTAS)
       =================================================== */
    cableado: [
        {
            contexto: "Caso Real: Componentes de Red",
            pregunta: "Vas a conectar tu computadora gamer o consola directamente al router con un cable de red de cobre para no sufrir por el Wi-Fi. ¿Cómo se llama el conector transparente de 8 pines que va en la punta?",
            opciones: [
                "Conector RJ45",
                "Conector HDMI",
                "Conector USB-C",
                "Jack de audio 3.5mm"
            ],
            correcta: 0,
            explicacion: "El conector RJ45 es el estándar universal para cables de red Ethernet de par trenzado (UTP). Sus 8 pines metálicos transmiten los impulsos eléctricos de tus datos."
        },
        {
            contexto: "Teoría Web: Código de Colores Norma T568B",
            pregunta: "Vas a ponchar un cable de red con la norma más utilizada a nivel mundial: la norma T568B. ¿Cuáles son los dos primeros hilos con los que debes iniciar de izquierda a derecha?",
            opciones: [
                "Blanco/Naranja y Naranja",
                "Azul y Blanco/Azul",
                "Blanco/Verde y Verde",
                "Marrón y Blanco/Marrón"
            ],
            correcta: 0,
            explicacion: "La norma T568B inicia con: 1. Blanco/Naranja, 2. Naranja, 3. Blanco/Verde, 4. Azul, 5. Blanco/Azul, 6. Verde, 7. Blanco/Marrón y 8. Marrón."
        },
        {
            contexto: "Caso Real: Herramientas de Taller",
            pregunta: "Ya ordenaste los 8 hilitos de colores en el conector RJ45. ¿Con qué herramienta debes apretar fuertemente para fijar las cuchillas a los cables de cobre?",
            opciones: [
                "Una pinza ponchadora o crimpadora para RJ45",
                "Un martillo común",
                "Una tijera de papel",
                "Un destornillador de estrella"
            ],
            correcta: 0,
            explicacion: "La ponchadora o crimpadora ejerce la presión exacta para que las cuchillas doradas del conector muerdan el cobre de cada hilo y fijen la cubierta protectora del cable."
        },
        {
            contexto: "Teoría Web: Velocidad & Tecnología (Fibra Óptica)",
            pregunta: "¿Por qué las conexiones modernas de internet de 500 o 1000 Megas utilizan cables de Fibra Óptica en lugar de cables de cobre tradicionales para llegar a las casas?",
            opciones: [
                "Porque la fibra óptica es más pesada",
                "Porque transmite datos mediante pulsos de luz a velocidades extremas y no sufre por interferencias eléctricas",
                "Porque la fibra óptica funciona sin electricidad ni routers",
                "Porque los cables de cobre están prohibidos por la ley"
            ],
            correcta: 1,
            explicacion: "La fibra óptica conduce pulsos de luz por hilos de vidrio finísimos. Permite velocidades gigantescas a lo largo de kilómetros sin degradarse por ruidos eléctricos ni tormentas."
        },
        {
            contexto: "Caso Real: Diagnóstico & Pruebas",
            pregunta: "Acabas de armar tu cable de red para tu habitación. Antes de pasarlo por la pared, ¿con qué aparato verificas que los 8 hilos transmitan correctamente del pin 1 al 8?",
            opciones: [
                "Con un probador o tester de cables de red con luces LED secuenciales",
                "Mirándolo a contraluz con una lupa",
                "Midiéndolo con una regla de 30 cm",
                "Probándolo con una pila de 9V directamente"
            ],
            correcta: 0,
            explicacion: "El tester de red envía una señal secuencial por cada pin. Si los LEDs del 1 al 8 se encienden en orden en ambos extremos, ¡el cable quedó perfecto y listo para usar!"
        },
        {
            contexto: "Teoría Web: Cable Directo vs Cable Cruzado",
            pregunta: "¿Cuál es la diferencia en el conexionado entre un cable de red Directo (Patch Cord) y un cable Cruzado (Crossover)?",
            opciones: [
                "El cable directo tiene la misma norma (ej: T568B en ambos extremos) para conectar un PC a un Switch, mientras que el cruzado tiene T568A en una punta y T568B en la otra para conectar dos PCs directamente entre sí",
                "El cable directo transmite electricidad y el cruzado transmite únicamente sonido",
                "El cable directo solo mide 1 metro y el cruzado mide más de 100 metros",
                "No existe diferencia, son exactamente iguales en su armado interno"
            ],
            correcta: 0,
            explicacion: "El cable directo usa la misma norma en ambos lados (T568B a T568B) para conectar dispositivos de diferente tipo (PC a Switch). El cable cruzado invierte los pines de transmisión y recepción (T568A a T568B) para conectar dos equipos del mismo tipo directamente."
        },
        {
            contexto: "Caso Real: Longitud Máxima de Cable UTP",
            pregunta: "Estás diseñando la red cableada de un colegio y necesitas conectar una cámara de seguridad en el patio trasero con el switch del centro de cómputo. ¿Cuál es la distancia máxima recomendada para un cable de par trenzado UTP sin perder señal?",
            opciones: [
                "Hasta 100 metros de longitud máxima",
                "Hasta 1.000 metros (1 kilómetro)",
                "Máximo 10 metros",
                "No tiene límite de distancia"
            ],
            correcta: 0,
            explicacion: "Según los estándares de cableado estructurado TIA/EIA-568, la longitud máxima certificada para un canal de cable UTP de cobre es de 100 metros (90m de cable horizontal + 10m de cables de parcheo). Para distancias superiores se debe emplear fibra óptica."
        },
        {
            contexto: "Teoría Web: Categorías de Cable UTP (Cat6 vs Cat5e)",
            pregunta: "En una instalación profesional moderna se recomienda usar cable de red Categoría 6 (Cat6) en lugar de Cat5e. ¿Cuál es la principal ventaja técnica?",
            opciones: [
                "Cat6 soporta velocidades de hasta 10 Gigabits por segundo (10 Gbps) y cuenta con un separador de plástico central que reduce la diafonía o interferencia entre pares",
                "Cat6 no necesita conectores RJ45 y funciona por magnetismo",
                "Cat6 es de plástico transparente y brilla en la oscuridad",
                "Cat6 funciona sin conectarse al módem"
            ],
            correcta: 0,
            explicacion: "El cable Cat6 opera a frecuencias de hasta 250 MHz, soportando 10 Gbps a distancias cortas y reduciendo significativamente el 'Crosstalk' (interferencia electromagnética mutua entre los hilos de cobre) gracias a su núcleo separador cruciforme."
        },
        {
            contexto: "Caso Real: Armario de Comunicaciones (Rack)",
            pregunta: "Visitas el centro de cómputo de un hospital y observas un armario metálico cerrado con ventiladores, luces parpadeantes y cientos de cables peinados y rotulados. ¿Cómo se llama este elemento central?",
            opciones: [
                "Rack o Gabinete de Comunicaciones con Patch Panels",
                "Refrigerador de componentes",
                "Caja de fusibles hogareña",
                "Transformador de alta tensión eléctrica"
            ],
            correcta: 0,
            explicacion: "El Rack o gabinete de telecomunicaciones aloja de forma segura, ordenada y ventilada los switches, servidores, routers, UPS y paneles de parcheo (Patch Panels), facilitando la gestión y mantenimiento de toda la infraestructura de red."
        },
        {
            contexto: "Caso Real: Pelado y Armado de Cable UTP",
            pregunta: "Al preparar un cable UTP para colocarle el conector RJ45, ¿por qué es un error grave destrenzar los hilitos de cobre más de 1.3 centímetros (media pulgada)?",
            opciones: [
                "Porque al destrenzar de más los hilos quedan expuestos a interferencias electromagnéticas (diafonía) y el cable no entrará bien protegido bajo la pestaña del conector RJ45",
                "Porque el cobre se oxida en 5 segundos si toca el aire",
                "Porque los colores de los cables se mezclan y cambian de tono",
                "Porque el switch detecta que el cable es largo y se apaga"
            ],
            correcta: 0,
            explicacion: "El trenzado helicoidal de los pares de hilos es el secreto físico que cancela el ruido y las interferencias externas. Destrenzar demasiado el cable degrada la velocidad de transmisión y debilita la fijación mecánica dentro del conector RJ45."
        }
    ],

    /* ===================================================
       CUESTIONARIO GENERAL 1 (10 PREGUNTAS MIXTAS)
       Longitud homogénea de opciones - Sin pistas visuales
       =================================================== */
    general1: [
        {
            contexto: "Caso Real: Espionaje Visual (Shoulder Surfing)",
            pregunta: "Estás en el transporte público o cafetería escolar y notas que alguien mira disimuladamente tu pantalla mientras ingresas tu clave bancaria o PIN. ¿Qué técnica está aplicando?",
            opciones: [
                "Ataque de diccionario digital mediante programas de fuerza bruta automatizada",
                "Espionaje visual de hombro para capturar credenciales en persona directamente",
                "Infección silenciosa por virus troyano remoto dentro del dispositivo móvil",
                "Interceptación de radiofrecuencia inalámbrica en antenas locales de telefonía"
            ],
            correcta: 1,
            explicacion: "El 'Shoulder Surfing' (mirar por encima del hombro) es una técnica física de ingeniería social donde un atacante observa directamente la pantalla o teclado de su víctima para memorizar contraseñas, patrones de desbloqueo o códigos bancarios."
        },
        {
            contexto: "Caso Real: Conflicto de Direcciones IP",
            pregunta: "En una sala de cómputo dos computadoras tienen asignada manualmente la misma IP (192.168.1.50) y ninguna puede navegar en Internet. ¿Cuál es el motivo técnico de esta falla?",
            opciones: [
                "Se produjo un conflicto de IP porque cada nodo exige una dirección única",
                "El cable de red de cobre sufrió un recalentamiento por exceso de tráfico",
                "El servidor DNS borró automáticamente los archivos de ambas computadoras",
                "La tarjeta de red inalámbrica bloqueó las señales por falta de corriente"
            ],
            correcta: 0,
            explicacion: "En cualquier red TCP/IP, cada dispositivo conectado debe tener una dirección IP lógica única e irrepetible. Si dos equipos comparten la misma dirección IP, el switch y el router no saben a cuál entregar los paquetes y ambos pierden la comunicación."
        },
        {
            contexto: "Caso Real: Instalación de Roseta de Red",
            pregunta: "Un instalador coloca una roseta con conector hembra RJ45 empotrada en la pared de una oficina. ¿Cómo se llama técnicamente este módulo donde se conectan los 8 hilos del cable?",
            opciones: [
                "Conector macho blindado para terminales de fibra óptica de larga distancia",
                "Adaptador divisor de corriente eléctrica para puertos de audio analógicos",
                "Módulo Jack Keystone para conexiones de red estructurada fija de pared",
                "Transformador de frecuencia para repetidores de señal inalámbrica en malla"
            ],
            correcta: 2,
            explicacion: "El módulo Jack Keystone es el conector hembra estándar de pared en el cableado estructurado. Se fija en placas o canaletas y permite que los usuarios conecten su patch cord desde su escritorio a la red institucional."
        },
        {
            contexto: "Teoría Web: Principio de Menor Privilegio",
            pregunta: "En ciberdefensa corporativa se aplica estrictamente el 'Principio de Menor Privilegio'. ¿En qué consiste esta regla de seguridad digital para proteger las computadoras?",
            opciones: [
                "Obligar a todos los empleados a cambiar de contraseña cada dos horas al día",
                "Desconectar todos los computadores de la red local al terminar cada jornada",
                "Bloquear de forma permanente el acceso a todas las plataformas de chat web",
                "Brindar a cada usuario únicamente los permisos indispensables para su labor"
            ],
            correcta: 3,
            explicacion: "El Principio de Menor Privilegio (Principle of Least Privilege) dicta que un usuario o programa solo debe poseer los accesos mínimos estrictamente necesarios para su trabajo. Así, si una cuenta se infecta, el malware no podrá destruir el sistema entero."
        },
        {
            contexto: "Teoría Web: Función de la Máscara de Subred",
            pregunta: "Toda configuración de red incluye una dirección IP y una Máscara de Subred (ejemplo: 255.255.255.0). ¿Cuál es la función fundamental de la máscara en una conexión de red?",
            opciones: [
                "Multiplicar la velocidad del ancho de banda contratado por el usuario local",
                "Determinar qué parte de la IP identifica la red y cuál a los equipos unidos",
                "Encriptar los archivos confidenciales que viajan por el cable de red central",
                "Asignar contraseñas automáticas a todos los routers de la comunidad escolar"
            ],
            correcta: 1,
            explicacion: "La máscara de subred delimita qué porción de los 32 bits de una dirección IP pertenece a la red (identificador de subred) y qué porción corresponde a los dispositivos individuales (hosts), permitiendo al router saber si el destino es local o externo."
        },
        {
            contexto: "Teoría Web: Código de Colores Norma T568A",
            pregunta: "Aunque la norma T568B es la más popular, en telecomunicaciones también existe la norma T568A. ¿Con qué dos hilos de color inicia el conector RJ45 según la norma T568A?",
            opciones: [
                "Inicia exactamente con el par de hilos Blanco/Naranja y Naranja",
                "Inicia exactamente con el par de hilos Blanco/Azul y el hilo Azul",
                "Inicia exactamente con el par de hilos Blanco/Verde y el hilo Verde",
                "Inicia exactamente con el par de hilos Blanco/Marrón y color Marrón"
            ],
            correcta: 2,
            explicacion: "La norma T568A comienza con: 1. Blanco/Verde, 2. Verde, 3. Blanco/Naranja, 4. Azul, 5. Blanco/Azul, 6. Naranja, 7. Blanco/Marrón y 8. Marrón. Cambia los pares verde y naranja respecto a la norma T568B."
        },
        {
            contexto: "Caso Real: Ataque por Dispositivo Físico (Baiting)",
            pregunta: "Encuentras una memoria USB abandonada en el pasillo de tu colegio con una etiqueta atractiva que dice 'Exámenes_2026.pdf'. ¿Por qué es muy peligroso conectarla a tu computador?",
            opciones: [
                "La memoria borrará de inmediato la tarjeta de video de tu equipo portátil",
                "Puede ejecutar scripts automáticos para infectar tu PC con malware espía",
                "El conector USB quemará la pantalla táctil por sobrecarga térmica masiva",
                "El computador perderá la licencia oficial del sistema operativo instalado"
            ],
            correcta: 1,
            explicacion: "Este ataque se llama 'Baiting' (cebo). Los atacantes dejan memorias USB infectadas a propósito en lugares concurridos esperando que la curiosidad lleve a alguien a conectarla, infectando el equipo con spyware o ransomware de forma automática."
        },
        {
            contexto: "Caso Real: Frecuencias Wi-Fi (2.4 GHz vs 5 GHz)",
            pregunta: "Tu router hogareño emite dos redes Wi-Fi diferentes: una banda de 2.4 GHz y otra banda de 5 GHz. ¿Cuál es la principal ventaja técnica de conectarse a la banda de 5 GHz?",
            opciones: [
                "Atraviesa muchas más paredes de concreto y alcanza distancias kilométricas",
                "Funciona sin necesidad de conectarse a la corriente eléctrica de la casa",
                "Permite navegar de forma totalmente anónima sin dejar ningún tipo de rastro",
                "Brinda mayor velocidad de datos con menos interferencia a corta distancia"
            ],
            correcta: 3,
            explicacion: "La banda de 5 GHz ofrece canales más amplios, velocidades de descarga superiores y menor congestión electromagnética, siendo ideal para streaming y gaming cerca del router, aunque su alcance es menor que el de 2.4 GHz."
        },
        {
            contexto: "Caso Real: Mantenimiento de Cableado Físico",
            pregunta: "Al pasar un cable de red por una tubería de metal, la chaqueta plástica exterior se rompe y los hilos de cobre tocan la tubería. ¿Qué problema provocará esta avería física?",
            opciones: [
                "Provocará cortocircuitos y fallas graves por ruido electromagnético",
                "Hará que los videos descargados se reproduzcan en blanco y negro hoy",
                "Aumentará la velocidad de transmisión al hacer contacto a tierra fija",
                "Cambiará de forma permanente la dirección MAC de la computadora local"
            ],
            correcta: 0,
            explicacion: "Si la cubierta del cable UTP se rompe y los hilos de cobre tocan elementos metálicos o humedad, se generan cortocircuitos, pérdida de paquetes masiva y aterrizajes de señal que degradan o interrumpen totalmente el enlace de red."
        },
        {
            contexto: "Teoría Web: Cifrado Asimétrico y Llaves",
            pregunta: "En el módulo de ciberdefensa se explica el cifrado asimétrico usado en firmas digitales y certificados SSL. ¿Cómo opera este mecanismo criptográfico para proteger datos?",
            opciones: [
                "Utiliza una sola contraseña secreta compartida por todos los usuarios de la red",
                "Emplea un par de llaves: una pública para cifrar y otra privada para descifrar",
                "Transforma los caracteres de texto en imágenes sin requerir claves matemáticas",
                "Guarda los datos en un servidor desconectado para evitar accesos remotos en línea"
            ],
            correcta: 1,
            explicacion: "La criptografía asimétrica utiliza un par matemático de llaves: la llave pública (que se comparte libremente para que cualquiera te envíe datos cifrados) y la llave privada (que solo el dueño posee para descifrarlos y firmar digitalmente)."
        }
    ],

    /* ===================================================
       CUESTIONARIO GENERAL 2 (10 PREGUNTAS MIXTAS)
       Longitud homogénea de opciones - Sin pistas visuales
       =================================================== */
    general2: [
        {
            contexto: "Caso Real: Estafas por Mensajería (Smishing)",
            pregunta: "Recibes un mensaje de texto SMS diciendo: 'Su paquete de mensajería fue retenido por falta de pago. Ingrese sus datos aquí: correos-falsos.link'. ¿Qué amenaza representa?",
            opciones: [
                "Es un mensaje oficial enviado por la empresa de paquetería para ayudarte",
                "Es un ataque de Smishing diseñado para robar datos bancarios de tarjetas",
                "Es una notificación automática de actualización de la memoria del teléfono",
                "Es un error del operador móvil que confundió el número de teléfono celular"
            ],
            correcta: 1,
            explicacion: "El 'Smishing' es el phishing ejecutado a través de SMS. Los delincuentes envían alertas de paquetes ficticios o multas para alarmar al usuario e inducirlo a ingresar su tarjeta de crédito en sitios fraudulentos."
        },
        {
            contexto: "Caso Real: Puerta de Enlace (Default Gateway)",
            pregunta: "Una computadora de oficina puede ver las impresoras de la red local pero no logra cargar ninguna página de Internet. El técnico detecta que falta el Default Gateway. ¿Qué es este componente?",
            opciones: [
                "Es el cable principal de fibra óptica que conecta el monitor con la torre fija",
                "Es un programa antivirus instalado en la memoria temporal de la computadora",
                "Es la dirección IP del router que permite salir de la red local hacia Internet",
                "Es el nombre de usuario asignado por el fabricante del sistema operativo actual"
            ],
            correcta: 2,
            explicacion: "La puerta de enlace predeterminada (Default Gateway) es la dirección IP del router local. Cuando un equipo quiere enviar paquetes a una dirección fuera de su propia red (como Internet), se los entrega al Gateway para que los enrute."
        },
        {
            contexto: "Caso Real: Tipos de Cable Blindado (STP / FTP)",
            pregunta: "En una fábrica con motores industriales de alto voltaje que generan chispas y ruido eléctrico intenso, ¿qué tipo de cable de red se debe instalar para evitar interferencias?",
            opciones: [
                "Cable de red blindado (STP o FTP) con lámina metálica protectora",
                "Cable telefónico simple de dos hilos sin ningún tipo de blindaje",
                "Cable de audio común con conectores dorados para sonido estéreo",
                "Cable de corriente eléctrica recubierto con cinta aislante negra"
            ],
            correcta: 0,
            explicacion: "En entornos con alta interferencia electromagnética (EMI) se utiliza cable STP (Shielded Twisted Pair) o FTP (Foiled Twisted Pair), cuya malla o lámina de aluminio blindada apantalla los hilos de cobre evitando que el ruido distorsione los datos."
        },
        {
            contexto: "Teoría Web: Ataques de Denegación de Servicio (DDoS)",
            pregunta: "Un grupo de cibercriminales infecta miles de dispositivos con malware para saturar simultáneamente un servidor de videojuegos con peticiones falsas. ¿Cómo se denomina este ataque?",
            opciones: [
                "Ataque de fuerza bruta local para adivinar contraseñas de correos",
                "Ataque de ingeniería inversa para modificar el código fuente del juego",
                "Ataque DDoS o Denegación de Servicio Distribuida mediante botnets",
                "Infección pasiva por gusanos informáticos en memorias portátiles USB"
            ],
            correcta: 2,
            explicacion: "Un ataque DDoS (Distributed Denial of Service) utiliza una red de equipos zombis infectados (botnet) para bombardear un servidor con millones de solicitudes falsas hasta agotar sus recursos y dejarlo fuera de servicio para usuarios legítimos."
        },
        {
            contexto: "Teoría Web: Dirección MAC vs Dirección IP",
            pregunta: "Toda tarjeta de red posee una Dirección MAC y una Dirección IP. ¿Cuál es la diferencia fundamental entre ambos identificadores dentro de una red de computadoras?",
            opciones: [
                "La MAC solo funciona con internet satelital y la IP con cables submarinos hoy",
                "La MAC cambia cada vez que se reinicia el PC y la IP permanece congelada aquí",
                "La MAC almacena los archivos personales y la IP administra el antivirus local",
                "La MAC es una dirección física fija de fábrica y la IP es lógica y variable"
            ],
            correcta: 3,
            explicacion: "La dirección MAC (Media Access Control) es un identificador físico de 48 bits grabado en el hardware por el fabricante (Capa 2), mientras que la dirección IP es un identificador lógico asignado por la red que puede cambiar según la ubicación (Capa 3)."
        },
        {
            contexto: "Teoría Web: Fibra Óptica Monomodo vs Multimodo",
            pregunta: "Para conectar dos sedes universitarias separadas por 15 kilómetros de distancia a través de la ciudad, ¿qué tipo de fibra óptica debe seleccionarse para el enlace?",
            opciones: [
                "Fibra Óptica Monomodo porque transmite mediante luz láser a grandes distancias",
                "Fibra Óptica Multimodo porque tiene un núcleo mucho más grueso para distancias",
                "Cable de cobre tradicional UTP categoría 5e porque no requiere repetidores hoy",
                "Cable coaxial antiguo de televisión porque soporta mejor la luz solar directa"
            ],
            correcta: 0,
            explicacion: "La Fibra Monomodo (Single-Mode) posee un núcleo diminuto (9 micras) y utiliza luz láser, evitando la dispersión modal y permitiendo recorrer decenas de kilómetros sin pérdida de señal, a diferencia de la Multimodo que se usa en distancias cortas (centros de datos)."
        },
        {
            contexto: "Caso Real: Vishing con Voces Clonadas (IA)",
            pregunta: "Una persona recibe una llamada donde escucha la voz idéntica de su hermano pidiéndole transferir dinero urgente por una emergencia médica ficticia. ¿Qué técnica tecnológica se utilizó?",
            opciones: [
                "Fallo técnico de cruce de líneas analógicas en la central de telefonía",
                "Ataque de spyware que grabó llamadas telefónicas privadas del año pasado",
                "Ataque de Vishing apoyado en clonación de voz por Inteligencia Artificial",
                "Infección por virus troyano que modificó el tono del altavoz del teléfono"
            ],
            correcta: 2,
            explicacion: "El 'Vishing' (Voice Phishing) moderno utiliza modelos de Inteligencia Artificial para clonar la voz de personas a partir de audios cortos de redes sociales, generando llamadas de extorsión ultra-realistas que engañan a los familiares."
        },
        {
            contexto: "Caso Real: Diagnóstico con Comando PING",
            pregunta: "Un administrador de red abre la consola del sistema y ejecuta la instrucción 'ping 8.8.8.8' para revisar su conexión. ¿Qué mide y verifica exactamente esta herramienta?",
            opciones: [
                "Mide la temperatura interna de la tarjeta madre y la velocidad del ventilador",
                "Verifica cuántos virus informáticos están activos en la memoria del equipo hoy",
                "Elimina automáticamente los archivos temporales y optimiza el registro windows",
                "Mide el tiempo de respuesta (latencia) y comprueba conectividad con el host"
            ],
            correcta: 3,
            explicacion: "El comando PING envía paquetes de eco ICMP al destino y mide el tiempo que tardan en regresar (en milisegundos). Permite saber si el equipo de destino está vivo y accesible en la red, y si hay pérdida de paquetes."
        },
        {
            contexto: "Caso Real: Falla en Conexión por Pin 1 Roto",
            pregunta: "Al fabricar un cable de red y probarlo en el tester de LEDs, la luz del Pin 1 permanece apagada en el receptor. ¿Qué consecuencia directa tendrá este fallo en el cable?",
            opciones: [
                "El cable funcionará normalmente pero emitirá un zumbido audible en la sala",
                "El cable no transmitirá datos correctamente o sufrirá cortes permanentes",
                "El cable invertirá los colores de los videos mostrados en el monitor activo",
                "El switch se apagará de forma automática para proteger la red de incendios"
            ],
            correcta: 1,
            explicacion: "En redes Ethernet Fast Ethernet (100Base-TX) y Gigabit (1000Base-T), el Pin 1 (Blanco/Naranja en T568B o Blanco/Verde en T568A) es un hilo de transmisión vital. Si está roto o no hace contacto, la tarjeta no podrá sincronizar el enlace y no habrá conexión."
        },
        {
            contexto: "Teoría Web: Huella Digital Pasiva en Internet",
            pregunta: "De acuerdo con el módulo de privacidad digital del sitio web, ¿cuál de las siguientes acciones genera tu 'Huella Digital Pasiva' mientras navegas por la red?",
            opciones: [
                "Los comentarios y fotografías personales que publicas voluntariamente en la web",
                "La recolección silenciosa de tu dirección IP y páginas visitadas con cookies",
                "Los correos electrónicos que redactas y envías directamente a tus profesores",
                "Las compras en tiendas virtuales donde ingresas tu nombre y dirección postal"
            ],
            correcta: 1,
            explicacion: "La huella digital pasiva se recopila sin que el usuario participe conscientemente: incluye tu dirección IP, resolución de pantalla, cookies de seguimiento y tiempo de permanencia en páginas. La huella activa son las publicaciones y fotos que tú subes voluntariamente."
        }
    ]

};

/* =======================================================
   ESTADO DEL QUIZ INTERACTIVO
   ======================================================= */

let quizEstado = {
    tipo: "",
    titulo: "",
    preguntas: [],
    indice: 0,
    respuestas: [],
    detalles: [],
    puntos: 0,
    porcentaje: 0,
    filtroRevision: "todas",
    alertaPendiente: null
};

function iniciarQuiz(tipo) {
    // VERIFICACIÓN DE ESTUDIANTE: DEBE ESTAR REGISTRADO O AUTENTICADO
    const estudiante = typeof obtenerEstudianteActivo === "function" ? obtenerEstudianteActivo() : null;
    if (!estudiante) {
        if (typeof abrirModalAuth === "function") {
            abrirModalAuth("login", tipo);
        }
        return;
    }

    const titulos = {
        seguridad: "Misión: Ciberdefensa y Seguridad",
        redes: "Desafío: Redes & Conectividad",
        cableado: "Taller: Cableado & Conectividad",
        general1: "Cuestionario General 1 (Misión Mixta)",
        general2: "Cuestionario General 2 (Desafío Maestro)"
    };

    const lista = preguntas[tipo] || [];
    if (!lista.length) return;

    // Sincronizar hash con la ruta si no coincide
    const hashEsperado = "#actividades/" + tipo;
    if (window.location.hash !== hashEsperado) {
        window.location.hash = hashEsperado;
        return; // hashchange activará procesarRuta y volverá a llamar iniciarQuiz
    }

    quizEstado = {
        tipo: tipo,
        titulo: titulos[tipo] || `Actividad de ${tipo}`,
        preguntas: lista,
        indice: 0,
        respuestas: new Array(lista.length).fill(null),
        detalles: [],
        puntos: 0,
        porcentaje: 0,
        filtroRevision: "todas",
        alertaPendiente: null
    };

    renderizarPreguntaInteractivo();
}

/* =======================================================
   RENDERIZAR PREGUNTA ACTIVA (PASO A PASO)
   ======================================================= */

function renderizarPreguntaInteractivo() {
    const contenido = document.getElementById("contenido");
    if (!contenido) return;

    const total = quizEstado.preguntas.length;
    const actual = quizEstado.indice;
    const pregunta = quizEstado.preguntas[actual];
    const respondidas = quizEstado.respuestas.filter(r => r !== null && r !== undefined).length;
    const todasRespondidas = respondidas === total;
    const progreso = Math.round(((actual + 1) / total) * 100);
    const letras = ["A", "B", "C", "D"];

    contenido.innerHTML = `
        <section class="actividades">

            <div class="quiz-interactivo">

                <!-- ENCABEZADO GAMIFICADO -->
                <div class="quiz-header-gamer">
                    <div class="quiz-meta-info">
                        <span class="quiz-tipo-tag">
                            ${icon('gamepad', 14)}
                            ${quizEstado.titulo}
                        </span>
                        <span class="quiz-contador">Pregunta <strong>${actual + 1}</strong> de ${total}</span>
                    </div>

                    <div class="progreso-barra-container">
                        <div class="progreso-barra-fill" style="width: ${progreso}%"></div>
                    </div>

                    <div class="quiz-stats-row">
                        <span class="stat-badge ${todasRespondidas ? 'completo' : ''}">
                            ${todasRespondidas ? icon('check-circle', 14) : icon('file-text', 14)}
                            ${todasRespondidas ? '¡Todas contestadas! (Listo para entregar)' : `Respondidas: ${respondidas}/${total}`}
                        </span>
                        ${!todasRespondidas ? `
                            <span class="stat-badge pendientes-badge">
                                ${icon('alert-circle', 14)}
                                Faltan ${total - respondidas} por contestar
                            </span>
                        ` : `
                            <span class="stat-badge streak">
                                ${icon('flame', 14)}
                                Nivel Completo
                            </span>
                        `}
                    </div>
                </div>

                <!-- TARJETA DE PREGUNTA -->
                <div class="tarjeta-pregunta-activa">

                    <!-- ALERTA SI SE INTENTÓ ENTREGAR SIN COMPLETAR TODAS LAS PREGUNTAS -->
                    ${quizEstado.alertaPendiente ? `
                        <div class="alerta-incompleto" role="alert">
                            <div class="alerta-icono">
                                ${icon('alert-triangle', 24)}
                            </div>
                            <div class="alerta-texto">
                                <strong>¡No puedes entregar la actividad todavía!</strong>
                                <p>
                                    Debes responder todas las preguntas obligatoriamente antes de poder entregar y calificar la misión.
                                    Aún tienes <strong>${quizEstado.alertaPendiente.totalFaltantes}</strong> ${quizEstado.alertaPendiente.totalFaltantes === 1 ? 'pregunta pendiente' : 'preguntas pendientes'}: 
                                    <strong>${quizEstado.alertaPendiente.lista.map(n => 'Pregunta ' + n).join(', ')}</strong>.
                                    Te hemos llevado a la primera pregunta sin responder.
                                </p>
                            </div>
                        </div>
                    ` : ''}

                    <div class="pregunta-contexto-tag">
                        ${icon('layers', 13)}
                        <span>${pregunta.contexto}</span>
                    </div>

                    <h2 class="pregunta-titulo">
                        ${pregunta.pregunta}
                    </h2>

                    <!-- OPCIONES INTERACTIVAS -->
                    <div class="opciones-interactivas">
                        ${pregunta.opciones.map((opcion, i) => {
                            const esSeleccionada = quizEstado.respuestas[actual] === i;
                            return `
                                <button type="button" 
                                        class="opcion-gamer-btn ${esSeleccionada ? 'seleccionada' : ''}"
                                        onclick="seleccionarOpcionQuiz(${i})">
                                    <span class="opcion-letra">${letras[i]}</span>
                                    <span class="opcion-texto">${opcion}</span>
                                    <span class="opcion-check">${esSeleccionada ? icon('check', 16) : ''}</span>
                                </button>
                            `;
                        }).join('')}
                    </div>

                    <!-- SELECTOR RÁPIDO DE PREGUNTAS (BULLETS) -->
                    <div class="selector-preguntas">
                        ${quizEstado.preguntas.map((p, i) => {
                            const esActiva = i === actual;
                            const estaRespondida = quizEstado.respuestas[i] !== null && quizEstado.respuestas[i] !== undefined;
                            return `
                                <button type="button" 
                                        class="bullet-pregunta ${esActiva ? 'activa' : ''} ${estaRespondida ? 'respondida' : ''}"
                                        onclick="saltarAPregunta(${i})" 
                                        title="Pregunta ${i + 1} (${estaRespondida ? 'Respondida' : 'Pendiente'})">
                                    ${i + 1}
                                </button>
                            `;
                        }).join('')}
                    </div>

                </div>

                <!-- BOTONES DE NAVEGACIÓN -->
                <div class="quiz-navegacion">

                    <button class="btn-quiz btn-secundario" 
                            onclick="anteriorPregunta()" 
                            ${actual === 0 ? 'disabled style="opacity: 0.35; cursor: not-allowed;"' : ''}>
                        ${icon('arrow-left', 16)} Anterior
                    </button>

                    ${actual < total - 1 ? `
                        <button class="btn-quiz btn-primario" onclick="siguientePregunta()">
                            Siguiente ${icon('arrow-right', 16)}
                        </button>
                    ` : ''}

                    <!-- BOTÓN ENTREGAR ACTIVIDAD: BLOQUEADO SI FALTAN PREGUNTAS -->
                    ${actual === total - 1 || todasRespondidas ? `
                        <button class="btn-quiz btn-finalizar ${!todasRespondidas ? 'bloqueado' : ''}" 
                                onclick="finalizarQuizInteractivo()"
                                title="${!todasRespondidas ? `Debes responder las ${total - respondidas} preguntas faltantes para poder entregar` : 'Entregar y calificar actividad'}">
                            ${todasRespondidas ? icon('trophy', 18) : icon('alert-circle', 16)}
                            <span>${todasRespondidas ? 'Entregar y Ver Resultados' : `Entregar (${respondidas}/${total} respondidas)`}</span>
                        </button>
                    ` : ''}

                    <button class="btn-quiz btn-salir" onclick="volverA('actividades')">
                        ${icon('x', 16)} Salir
                    </button>

                </div>

            </div>

        </section>
    `;
}

function seleccionarOpcionQuiz(indiceOpcion) {
    quizEstado.respuestas[quizEstado.indice] = indiceOpcion;

    // Actualizar estado de preguntas pendientes si la alerta estaba visible
    const sinResponder = [];
    quizEstado.preguntas.forEach((_, i) => {
        if (quizEstado.respuestas[i] === null || quizEstado.respuestas[i] === undefined) {
            sinResponder.push(i + 1);
        }
    });

    if (sinResponder.length === 0) {
        quizEstado.alertaPendiente = null;
    } else if (quizEstado.alertaPendiente) {
        quizEstado.alertaPendiente = {
            totalFaltantes: sinResponder.length,
            lista: sinResponder
        };
    }

    renderizarPreguntaInteractivo();
}

function siguientePregunta() {
    if (quizEstado.indice < quizEstado.preguntas.length - 1) {
        quizEstado.indice++;
        renderizarPreguntaInteractivo();
    }
}

function anteriorPregunta() {
    if (quizEstado.indice > 0) {
        quizEstado.indice--;
        renderizarPreguntaInteractivo();
    }
}

function saltarAPregunta(index) {
    if (index >= 0 && index < quizEstado.preguntas.length) {
        quizEstado.indice = index;
        renderizarPreguntaInteractivo();
    }
}

/* =======================================================
   CALCULAR Y MOSTRAR RESULTADOS DETALLADOS
   (LO QUE QUEDÓ BIEN Y LO QUE QUEDÓ MAL)
   ======================================================= */

function finalizarQuizInteractivo() {
    const total = quizEstado.preguntas.length;

    // VALIDACIÓN ESTRICTA: NO SE PUEDE ENTREGAR SI NO SE CONTESTARON TODAS LAS PREGUNTAS
    const sinResponder = [];
    quizEstado.preguntas.forEach((_, i) => {
        if (quizEstado.respuestas[i] === null || quizEstado.respuestas[i] === undefined) {
            sinResponder.push(i + 1);
        }
    });

    if (sinResponder.length > 0) {
        // Bloquear entrega y mostrar alerta
        quizEstado.alertaPendiente = {
            totalFaltantes: sinResponder.length,
            lista: sinResponder
        };
        // Saltar automáticamente a la primera pregunta sin responder
        quizEstado.indice = sinResponder[0] - 1;
        renderizarPreguntaInteractivo();
        return;
    }

    // SI TODAS ESTÁN RESPONDIDAS, PROCEDER A LA CALIFICACIÓN
    quizEstado.alertaPendiente = null;
    let puntos = 0;
    const detalles = [];

    quizEstado.preguntas.forEach((pregunta, i) => {
        const seleccionada = quizEstado.respuestas[i];
        const esCorrecta = seleccionada === pregunta.correcta;
        if (esCorrecta) puntos++;

        detalles.push({
            indice: i,
            contexto: pregunta.contexto,
            pregunta: pregunta.pregunta,
            opciones: pregunta.opciones,
            seleccionada: seleccionada,
            correcta: pregunta.correcta,
            esCorrecta: esCorrecta,
            explicacion: pregunta.explicacion
        });
    });

    quizEstado.puntos = puntos;
    quizEstado.porcentaje = Math.round((puntos / total) * 100);
    quizEstado.detalles = detalles;
    quizEstado.filtroRevision = "todas";

    // GUARDAR CALIFICACIÓN EN EL HISTORIAL DEL ESTUDIANTE
    if (typeof guardarResultadoQuizEstudiante === "function") {
        guardarResultadoQuizEstudiante(quizEstado.tipo, puntos, total, quizEstado.porcentaje, detalles);
    }

    renderizarResultadosRevision();
}

function renderizarResultadosRevision() {
    const contenido = document.getElementById("contenido");
    if (!contenido) return;

    const total = quizEstado.preguntas.length;
    const puntos = quizEstado.puntos;
    const fallos = total - puntos;
    const porcentaje = quizEstado.porcentaje;
    const filtro = quizEstado.filtroRevision;
    const estudiante = typeof obtenerEstudianteActivo === "function" ? obtenerEstudianteActivo() : null;

    // Rango y medalla según rendimiento (con vector icons)
    let rangoInfo = {
        iconoNombre: "trophy",
        titulo: "RANGO LEGENDARIO: HACKER ÉTICO PRO",
        mensaje: "¡Excelente! Demostraste un dominio total de los conceptos tecnológicos.",
        clase: "rango-oro"
    };

    if (porcentaje < 60) {
        rangoInfo = {
            iconoNombre: "shield",
            titulo: "NIVEL: APRENDIZ EN ENTRENAMIENTO",
            mensaje: "Buen intento. Revisa detalladamente las correcciones abajo para que aprendas de tus errores y superes el desafío.",
            clase: "rango-bronce"
        };
    } else if (porcentaje < 80) {
        rangoInfo = {
            iconoNombre: "zap",
            titulo: "NIVEL: TÉCNICO AVANZADO",
            mensaje: "¡Muy buen desempeño! Estás cerca de la perfección. Repasa lo que te quedó mal abajo.",
            clase: "rango-plata"
        };
    } else if (porcentaje < 100) {
        rangoInfo = {
            iconoNombre: "star",
            titulo: "NIVEL: EXPERTO EN TECNOLOGÍA",
            mensaje: "¡Excelente puntuación! Casi perfecto, tienes un criterio digital muy sólido.",
            clase: "rango-oro"
        };
    }

    // Filtrar detalles según pestaña activa
    const detallesFiltrados = quizEstado.detalles.filter(item => {
        if (filtro === "bien") return item.esCorrecta;
        if (filtro === "mal") return !item.esCorrecta;
        return true;
    });

    contenido.innerHTML = `
        <section class="actividades">

            <div class="resultado-dashboard">

                <!-- ENCABEZADO DE RESULTADOS -->
                <div class="resultado-header-gamer">
                    <div class="trofeo-icono">
                        ${icon(rangoInfo.iconoNombre, 48)}
                    </div>
                    <div class="rango-badge ${rangoInfo.clase}">
                        ${rangoInfo.titulo}
                    </div>
                    <h2>${rangoInfo.mensaje}</h2>
                    ${estudiante ? `
                        <div style="margin-top: 14px; display: inline-flex; align-items: center; gap: 8px; background: rgba(0, 139, 139, 0.22); border: 1px solid rgba(0, 229, 229, 0.35); padding: 8px 18px; border-radius: 20px; font-size: 14px; color: #cbd5e1;">
                            ${icon('user', 15)}
                            <span>Calificación registrada para: <strong style="color: #ffffff;">${estudiante.nombre}</strong> <span class="grado-pill" style="margin-left: 6px;">${estudiante.rol || estudiante.grado}</span></span>
                        </div>
                    ` : ''}
                </div>

                <!-- RESUMEN DE PUNTUACIÓN -->
                <div class="stats-grid-gamer">

                    <div class="stat-card total">
                        <div class="stat-numero">${porcentaje}%</div>
                        <div class="stat-etiqueta">Puntuación Total</div>
                    </div>

                    <div class="stat-card aciertos">
                        <div class="stat-numero">
                            ${icon('check-circle', 22, 'color-exito')} 
                            <span>${puntos}</span>
                        </div>
                        <div class="stat-etiqueta">Lo que te quedó BIEN</div>
                    </div>

                    <div class="stat-card fallos">
                        <div class="stat-numero">
                            ${icon('x-circle', 22, 'color-error')} 
                            <span>${fallos}</span>
                        </div>
                        <div class="stat-etiqueta">Lo que te quedó MAL</div>
                    </div>

                </div>

                <!-- SECCIÓN DE REVISIÓN PEDAGÓGICA -->
                <div class="revision-contenedor">

                    <div class="revision-titulo-barra">
                        <h3>
                            ${icon('file-text', 20)}
                            Retroalimentación pregunta por pregunta
                        </h3>
                        <p>Descubre en qué acertaste y aprende la razón técnica de cada respuesta:</p>
                    </div>

                    <!-- BOTONES DE FILTRO -->
                    <div class="revision-filtros">
                        <button class="filtro-btn ${filtro === 'todas' ? 'activo' : ''}" 
                                onclick="cambiarFiltroRevision('todas')">
                            ${icon('layers', 15)} Ver Todas (${total})
                        </button>
                        <button class="filtro-btn bien ${filtro === 'bien' ? 'activo' : ''}" 
                                onclick="cambiarFiltroRevision('bien')">
                            ${icon('check', 15)} Lo que te quedó bien (${puntos})
                        </button>
                        <button class="filtro-btn mal ${filtro === 'mal' ? 'activo' : ''}" 
                                onclick="cambiarFiltroRevision('mal')">
                            ${icon('x', 15)} Lo que te quedó mal (${fallos})
                        </button>
                    </div>

                    <!-- LISTA DE PREGUNTAS DETALLADAS -->
                    <div class="lista-revision-preguntas">
                        ${detallesFiltrados.length === 0 ? `
                            <div class="sin-elementos-filtro">
                                ${filtro === 'mal' 
                                    ? `${icon('trophy', 24)} ¡Felicitaciones! No tuviste ningún error en esta actividad.` 
                                    : 'No hay elementos en esta categoría.'}
                            </div>
                        ` : ''}

                        ${detallesFiltrados.map(item => {
                            const respuestaUsuario = item.seleccionada !== null 
                                ? item.opciones[item.seleccionada] 
                                : "Sin responder";
                            const respuestaCorrecta = item.opciones[item.correcta];

                            if (item.esCorrecta) {
                                return `
                                    <article class="card-revision acierto">
                                        <div class="revision-card-header">
                                            <span class="badge-veredicto bien">
                                                ${icon('check-circle', 16)} ¡TE QUEDÓ BIEN!
                                            </span>
                                            <span class="revision-tag">${item.contexto}</span>
                                        </div>

                                        <h4 class="pregunta-revision-texto">
                                            ${item.indice + 1}. ${item.pregunta}
                                        </h4>

                                        <div class="respuesta-caja tu-respuesta correcta">
                                            <span class="caja-label">Tu respuesta:</span>
                                            <strong>${respuestaUsuario}</strong>
                                            <span class="icono-check">${icon('check', 16)}</span>
                                        </div>

                                        <div class="explicacion-caja">
                                            <div class="explicacion-header">
                                                ${icon('lightbulb', 16)}
                                                <strong>¿Por qué es correcta?</strong>
                                            </div>
                                            <p>${item.explicacion}</p>
                                        </div>
                                    </article>
                                `;
                            } else {
                                return `
                                    <article class="card-revision fallo">
                                        <div class="revision-card-header">
                                            <span class="badge-veredicto mal">
                                                ${icon('x-circle', 16)} TE QUEDÓ MAL
                                            </span>
                                            <span class="revision-tag">${item.contexto}</span>
                                        </div>

                                        <h4 class="pregunta-revision-texto">
                                            ${item.indice + 1}. ${item.pregunta}
                                        </h4>

                                        <div class="respuesta-caja tu-respuesta incorrecta">
                                            <span class="caja-label">Tu respuesta elegida:</span>
                                            <span>${respuestaUsuario}</span>
                                            <span class="icono-cross">${icon('x', 14)} Incorrecta</span>
                                        </div>

                                        <div class="respuesta-caja respuesta-esperada">
                                            <span class="caja-label">La respuesta correcta era:</span>
                                            <strong>${respuestaCorrecta}</strong>
                                            <span class="icono-check">${icon('check', 16)}</span>
                                        </div>

                                        <div class="explicacion-caja">
                                            <div class="explicacion-header">
                                                ${icon('lightbulb', 16)}
                                                <strong>Explicación para aprender:</strong>
                                            </div>
                                            <p>${item.explicacion}</p>
                                        </div>
                                    </article>
                                `;
                            }
                        }).join('')}
                    </div>

                </div>

                <!-- BOTONES DE ACCIÓN FINAL -->
                <div class="acciones-finales-quiz">
                    <button class="btn-quiz btn-primario" onclick="iniciarQuiz('${quizEstado.tipo}')">
                        ${icon('refresh', 16)} Intentar nuevamente
                    </button>

                    <button class="btn-quiz btn-secundario" onclick="navegar('actividades')">
                        ${icon('book-open', 16)} Elegir otra actividad
                    </button>

                    ${quizEstado.tipo === 'general1' || quizEstado.tipo === 'general2' ? `
                        <button class="btn-quiz btn-link-seccion" onclick="navegar('aprende')">
                            ${icon('layers', 16)} Repasar Módulos de Aprende
                        </button>
                    ` : quizEstado.tipo === 'redes' || quizEstado.tipo === 'cableado' ? `
                        <button class="btn-quiz btn-link-seccion" onclick="navegar('redes')">
                            ${icon('network', 16)} Repasar en sección Redes
                        </button>
                    ` : `
                        <button class="btn-quiz btn-link-seccion" onclick="navegar('seguridad')">
                            ${icon('shield', 16)} Repasar en sección Seguridad
                        </button>
                    `}
                </div>

            </div>

        </section>
    `;
}

function cambiarFiltroRevision(filtro) {
    quizEstado.filtroRevision = filtro;
    renderizarResultadosRevision();
}

/* Compatibilidad si se llama función antigua */
function calificarQuiz(tipo) {
    finalizarQuizInteractivo();
}