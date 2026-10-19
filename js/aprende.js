/* =======================================================
   MÓDULO APRENDE (MESH)
   Fundamentos Teóricos Avanzados: Ciberseguridad & Redes
   Temas 100% exclusivos y complementarios (sin repetir los
   módulos prácticos de Seguridad y Redes)
   100% Vector React-Icons (Sin emojis) & Navegación SPA
   ======================================================= */

function crearAprende() {
    const contenido = document.getElementById("contenido");
    if (!contenido) return;

    contenido.innerHTML = `
        <section class="aprende">

            <div class="aprende-intro">
                <span class="seccion-etiqueta">${icon('book-open', 16)} Módulo Teórico Fundamental</span>
                <h1>Aprende</h1>
                <p>
                    Profundiza en los conceptos esenciales de la informática moderna. 
                    Explora lecciones teóricas exclusivas y complementarias estructuradas 
                    para transformar tu comprensión de la ciberdefensa y la arquitectura de redes.
                </p>
            </div>

            <div class="categorias-aprende">

                <!-- CATEGORÍA 1: SEGURIDAD INFORMÁTICA -->
                <article class="categoria-aprende">
                    <div class="categoria-icono">
                        ${icon('shield-check', 38)}
                    </div>

                    <h2>Seguridad Informática</h2>
                    <p>
                        Descubre cómo la criptografía moderna, los firewalls, el hacking ético 
                        y las tecnologías sin contraseñas (Passkeys) blindan la infraestructura digital mundial.
                    </p>

                    <div class="temas-preview-header">
                        <span>${icon('layers', 14)} 4 Temas exclusivos:</span>
                    </div>

                    <ul class="lista-temas">
                        <li onclick="navegar('aprende/seguridad/criptografia')" title="Estudiar este tema">
                            <span class="tema-li-left">${icon('lock', 16)} Criptografía y cifrado de datos</span>
                            <span class="tema-li-arrow">${icon('arrow-right', 13)}</span>
                        </li>
                        <li onclick="navegar('aprende/seguridad/hacking-etico')" title="Estudiar este tema">
                            <span class="tema-li-left">${icon('shield', 16)} Hacking ético & equipos de ciberdefensa</span>
                            <span class="tema-li-arrow">${icon('arrow-right', 13)}</span>
                        </li>
                        <li onclick="navegar('aprende/seguridad/firewalls')" title="Estudiar este tema">
                            <span class="tema-li-left">${icon('layers', 16)} Firewalls y detección de intrusos (IDS/IPS)</span>
                            <span class="tema-li-arrow">${icon('arrow-right', 13)}</span>
                        </li>
                        <li onclick="navegar('aprende/seguridad/autenticacion-avanzada')" title="Estudiar este tema">
                            <span class="tema-li-left">${icon('key', 16)} Passkeys, biometría y bóvedas digitales</span>
                            <span class="tema-li-arrow">${icon('arrow-right', 13)}</span>
                        </li>
                    </ul>

                    <button class="btn-comenzar-leccion" onclick="navegar('aprende/seguridad')">
                        ${icon('book-open', 16)} Comenzar Lección Completa
                        ${icon('arrow-right', 14)}
                    </button>
                </article>

                <!-- CATEGORÍA 2: REDES Y CONECTIVIDAD -->
                <article class="categoria-aprende">
                    <div class="categoria-icono">
                        ${icon('network', 38)}
                    </div>

                    <h2>Redes de Computación</h2>
                    <p>
                        Aprende la arquitectura interna de las telecomunicaciones: el modelo OSI en 7 capas, 
                        topologías en malla (Mesh), puertos TCP vs UDP y túneles seguros VPN.
                    </p>

                    <div class="temas-preview-header">
                        <span>${icon('layers', 14)} 4 Temas exclusivos:</span>
                    </div>

                    <ul class="lista-temas">
                        <li onclick="navegar('aprende/redes/modelo-osi')" title="Estudiar este tema">
                            <span class="tema-li-left">${icon('layers', 16)} El Modelo OSI y arquitectura TCP/IP</span>
                            <span class="tema-li-arrow">${icon('arrow-right', 13)}</span>
                        </li>
                        <li onclick="navegar('aprende/redes/topologias')" title="Estudiar este tema">
                            <span class="tema-li-left">${icon('network', 16)} Topologías de red: El origen de MESH</span>
                            <span class="tema-li-arrow">${icon('arrow-right', 13)}</span>
                        </li>
                        <li onclick="navegar('aprende/redes/protocolos')" title="Estudiar este tema">
                            <span class="tema-li-left">${icon('cpu', 16)} Puertos de red y protocolos: TCP vs UDP</span>
                            <span class="tema-li-arrow">${icon('arrow-right', 13)}</span>
                        </li>
                        <li onclick="navegar('aprende/redes/vpn')" title="Estudiar este tema">
                            <span class="tema-li-left">${icon('globe', 16)} Redes Privadas Virtuales (VPN) & túneles</span>
                            <span class="tema-li-arrow">${icon('arrow-right', 13)}</span>
                        </li>
                    </ul>

                    <button class="btn-comenzar-leccion" onclick="navegar('aprende/redes')">
                        ${icon('book-open', 16)} Comenzar Lección Completa
                        ${icon('arrow-right', 14)}
                    </button>
                </article>

            </div>

        </section>
    `;
}

/* =======================================================
   BANCO ESTRUCTURADO DE CONTENIDOS Y TEMAS DETALLADOS
   ======================================================= */

const catalogoAprende = {

    /* ===================================================
       CATEGORÍA: SEGURIDAD INFORMÁTICA (TEMAS TEÓRICOS)
       =================================================== */
    seguridad: {
        categoriaTitulo: "Seguridad Informática",
        categoriaSubtitulo: "Conceptos teóricos avanzados: criptografía, defensa perimetral, pentesting y tecnologías biométricas.",
        iconoKey: "shield-check",
        temas: [
            {
                id: "criptografia",
                titulo: "Criptografía y Cifrado de Datos",
                icono: "lock",
                tag: "Cifrado & Privacidad",
                resumen: "Las matemáticas detrás de la privacidad digital. Aprende cómo el cifrado simétrico, asimétrico y el cifrado de extremo a extremo transforman mensajes en códigos indescifrables.",
                concepto: `
                    <p>
                        La <strong>criptografía</strong> es la disciplina científica que utiliza algoritmos matemáticos para transformar información legible (texto plano) en una secuencia de caracteres incomprensible (texto cifrado), asegurando que solo quien posea la clave correcta pueda leerla.
                    </p>
                    <p>
                        Existen dos pilares criptográficos esenciales en la tecnología actual:
                    </p>
                    <ul>
                        <li><strong>Cifrado Simétrico (AES-256):</strong> Emplea la misma clave secreta tanto para cifrar como para descifrar la información. Es extremadamente veloz y eficiente, utilizándose para proteger discos duros completos y bases de datos masivas.</li>
                        <li><strong>Cifrado Asimétrico (RSA / Curvas Elípticas):</strong> Utiliza un par de claves matemáticamente enlazadas: una <em>clave pública</em> (que cualquiera puede conocer y usar para enviarte datos cifrados) y una <em>clave privada</em> (secreta y personal, que solo tú posees para descifrar los mensajes recibidos).</li>
                    </ul>
                    <p>
                        El estándar más riguroso en comunicaciones es el <strong>Cifrado de Extremo a Extremo (E2EE)</strong>: las llaves de descifrado se generan y guardan exclusivamente en los teléfonos de los usuarios. Ni los proveedores de internet, ni los operadores telefónicos, ni los servidores centrales de la aplicación pueden descifrar las conversaciones.
                    </p>
                `,
                ejemplo: "Cuando envías un mensaje confidencial por WhatsApp o Signal a un compañero, tu teléfono lo cifra usando la clave pública de tu amigo. Si un atacante intercepta los paquetes en el aire mediante una antena Wi-Fi, solo verá una maraña ilegible de símbolos aleatorios como 'x9#Lk!72@q'. Solo el dispositivo de tu amigo posee la clave privada física capaz de descifrar el mensaje.",
                buenasPracticas: [
                    "Elige siempre plataformas de mensajería que implementen cifrado de extremo a extremo (E2EE) verificado por auditorías de código abierto.",
                    "Activa el cifrado de disco completo (BitLocker en Windows o FileVault en macOS) en tus computadoras portátiles para que nadie pueda leer tus archivos si te roban el equipo.",
                    "Comprueba los certificados de seguridad en tu navegador: el protocolo HTTPS asegura que tus contraseñas viajen cifradas mediante TLS hasta el servidor.",
                    "Nunca guardes copias de tus claves privadas o llaves de recuperación en notas sin cifrar ni en correos electrónicos abiertos."
                ],
                conceptoClave: "El cifrado de extremo a extremo (E2EE) garantiza que la información solo exista en forma legible en los extremos de la comunicación (el emisor y el receptor); en todo el trayecto intermedio, es un secreto indescifrable."
            },
            {
                id: "hacking-etico",
                titulo: "Hacking Ético y Equipos de Ciberdefensa",
                icono: "shield",
                tag: "Auditoría & Pentesting",
                resumen: "El arte de la defensa proactiva. Descubre cómo los hackers de sombrero blanco identifican brechas de seguridad antes de que los ciberdelincuentes puedan explotarlas.",
                concepto: `
                    <p>
                        El <strong>hacking ético</strong> consiste en aplicar las mismas herramientas, metodologías y conocimientos técnicos que emplean los atacantes maliciosos, pero de forma legal, autorizada y con el objetivo de detectar vulnerabilidades para corregirlas antes de que ocurra un desastre.
                    </p>
                    <p>
                        En la industria de la ciberseguridad, los especialistas se clasifican según su propósito y ética:
                    </p>
                    <ul>
                        <li><strong>Sombrero Blanco (White Hat):</strong> Hackers éticos y auditores de seguridad que trabajan bajo contratos legales para proteger a empresas, bancos y gobiernos.</li>
                        <li><strong>Sombrero Negro (Black Hat):</strong> Criminales informáticos que violan sistemas para robar datos, extorsionar o causar interrupciones no autorizadas.</li>
                        <li><strong>Red Team (Equipo Ofensivo):</strong> Especialistas contratados para simular un ataque cibernético realista contra una organización, probando la resistencia de sus defensas.</li>
                        <li><strong>Blue Team (Equipo Defensivo):</strong> Los guardianes que monitorean la red las 24 horas, detectan anomalías y contienen los ataques en tiempo real.</li>
                    </ul>
                    <p>
                        Muchas empresas globales financian programas de <strong>Bug Bounty (Recompensas por vulnerabilidades)</strong>, donde invitan a estudiantes e investigadores de todo el mundo a encontrar fallas en sus plataformas a cambio de reconocimientos públicos y recompensas económicas.
                    </p>
                `,
                ejemplo: "Un joven estudiante de 16 años descubre una falla en el sistema de inicio de sesión de una aplicación educativa que permitiría consultar calificaciones ajenas. En lugar de abusar del error, elabora un informe técnico formal siguiendo las normas de Divulgación Responsable (Responsible Disclosure). La institución repara el fallo en 48 horas y otorga al estudiante una certificación de mérito en ciberdefensa.",
                buenasPracticas: [
                    "Practica tus habilidades de auditoría exclusivamente en plataformas de entrenamiento legal y controlado como TryHackMe, Hack The Box o laboratorios locales virtuales.",
                    "Nunca intentes escanear puertos ni probar vulnerabilidades en sitios web o redes ajenas sin una autorización legal previa por escrito; realizarlo sin permiso constituye un delito penal.",
                    "Aprende fundamentos de lenguajes como Python y domina los comandos de terminal en Linux para comprender cómo funcionan las herramientas de auditoría.",
                    "Sigue estrictamente las políticas de divulgación responsable cuando encuentres un error de seguridad en cualquier plataforma."
                ],
                conceptoClave: "La diferencia fundamental entre un criminal cibernético y un hacker ético radica en la autorización, la ética y el propósito: los hackers éticos usan su conocimiento para proteger y fortalecer a la sociedad digital."
            },
            {
                id: "firewalls",
                titulo: "Firewalls y Sistemas de Detección (IDS/IPS)",
                icono: "layers",
                tag: "Defensa Perimetral",
                resumen: "La aduana digital de las redes. Aprende cómo los muros de fuego analizan cada paquete de datos entrante y saliente para bloquear accesos no autorizados.",
                concepto: `
                    <p>
                        Un <strong>Firewall (Cortafuegos)</strong> es un dispositivo de hardware o una aplicación de software que se ubica en el perímetro de una red para inspeccionar y filtrar todo el tráfico de datos que entra y sale, decidiendo si permite o bloquea cada paquete según un conjunto estricto de reglas de seguridad.
                    </p>
                    <p>
                        La evolución de la defensa perimetral incluye tecnologías avanzadas:
                    </p>
                    <ul>
                        <li><strong>Filtrado de Paquetes con Estado (Stateful Inspection):</strong> El firewall no solo lee las IPs y puertos, sino que recuerda si una conexión saliente fue solicitada legítimamente por un usuario antes de permitir la entrada de la respuesta exterior.</li>
                        <li><strong>Sistemas de Detección de Intrusos (IDS):</strong> Actúan como sensores de alarma silenciosos que analizan los patrones de tráfico buscando firmas de ataques conocidos o anomalías estadísticas, notificando de inmediato a los administradores.</li>
                        <li><strong>Sistemas de Prevención de Intrusos (IPS):</strong> A diferencia del IDS (que solo avisa), el IPS está colocado en línea con el tráfico y tiene la capacidad de cortar la conexión maliciosa y bloquear la IP atacante en milisegundos.</li>
                    </ul>
                `,
                ejemplo: "Un software no autorizado instalado en tu computadora intenta abrir silenciosamente una conexión hacia un servidor desconocido a través del puerto 4444 para transmitir tus archivos. El Firewall del sistema operativo detecta que ese puerto no tiene autorización de salida, corta la comunicación al instante y genera un registro de seguridad para advertirte.",
                buenasPracticas: [
                    "Mantén siempre activado el Firewall integrado en tu sistema operativo (Windows Defender Firewall, ufw o iptables en Linux).",
                    "Aplica el principio de 'Denegación por Defecto': bloquea todas las conexiones entrantes excepto aquellas que sean estrictamente necesarias y conocidas.",
                    "Configura tu router para que no responda a solicitudes de eco ICMP (Ping) desde internet, haciendo que tu conexión sea invisible ante escaneos masivos de atacantes.",
                    "Revisa y depura periódicamente las listas de aplicaciones permitidas en tu firewall para revocar accesos a programas que ya no utilizas."
                ],
                conceptoClave: "El principio de 'Denegación por Defecto' es la regla de oro en ciberdefensa: bloquear absolutamente todo el tráfico entrante a menos que exista una regla explícita que demuestre que es seguro y necesario."
            },
            {
                id: "autenticacion-avanzada",
                titulo: "Passkeys, Biometría y Bóvedas de Seguridad",
                icono: "key",
                tag: "Identidad & Cero Contraseñas",
                resumen: "El futuro de la autenticación ya está aquí. Descubre cómo las llaves criptográficas (Passkeys) y la biometría eliminan las contraseñas débiles y hacen imposible el phishing.",
                concepto: `
                    <p>
                        Durante décadas, las <strong>contraseñas escritas</strong> han sido el eslabón más vulnerable de la seguridad digital: las personas eligen palabras cortas, fáciles de adivinar o repiten la misma contraseña en decenas de sitios web, facilitando que una sola filtración comprometa toda su vida digital.
                    </p>
                    <p>
                        La industria tecnológica ha desarrollado alternativas de nueva generación para reemplazar las contraseñas:
                    </p>
                    <ul>
                        <li><strong>Passkeys (Llaves de paso - Estándar FIDO2):</strong> Es un estándar criptográfico respaldado por Apple, Google y Microsoft que elimina las contraseñas. Al iniciar sesión, tu dispositivo utiliza una llave privada local protegida por hardware que firma un desafío matemático único.</li>
                        <li><strong>Inmunidad total al Phishing:</strong> Una Passkey está matemáticamente vinculada al dominio web legítimo (ej. <code>google.com</code>). Si caes por engaño en una página clonada falsa (ej. <code>google-login-soporte.xyz</code>), la Passkey no responderá porque detecta que el dominio no coincide, haciendo imposible que te roben las credenciales.</li>
                        <li><strong>Bóvedas de Contraseñas (Password Managers):</strong> Aplicaciones cifradas de alta seguridad que generan y almacenan contraseñas aleatorias de 25 caracteres para cada cuenta, requiriendo memorizar solo una frase maestra de acceso.</li>
                    </ul>
                `,
                ejemplo: "En lugar de memorizar una contraseña larga o esperar un código SMS que puede ser interceptado, abres tu cuenta en tu consola o computadora y aparece una solicitud en tu teléfono. Pones tu huella dactilar o Face ID y entras de inmediato: no escribiste ninguna clave, no hubo nada que un atacante pudiera espiar y la sesión se autenticó con criptografía militar.",
                buenasPracticas: [
                    "Activa Passkeys como método preferido en todas las cuentas que ya lo admitan (Google, GitHub, Nintendo, PlayStation, WhatsApp, TikTok).",
                    "Utiliza un gestor de contraseñas confiable y de reputación probada (como Bitwarden) para no reutilizar contraseñas en cuentas antiguas.",
                    "Configura siempre métodos de respaldo físicos o llaves de seguridad de hardware (como YubiKeys) para cuentas de importancia crítica.",
                    "Evita depender de mensajes SMS como segundo factor de verificación, prefiriendo aplicaciones de autenticación TOTP o Passkeys."
                ],
                conceptoClave: "Las Passkeys son inmunes al phishing por diseño: no existe ninguna contraseña que un estafador pueda engañarte para que le entregues, ya que la llave privada nunca abandona tu dispositivo físico."
            }
        ]
    },

    /* ===================================================
       CATEGORÍA: REDES Y CONECTIVIDAD (TEMAS TEÓRICOS)
       =================================================== */
    redes: {
        categoriaTitulo: "Redes de Computación",
        categoriaSubtitulo: "Arquitectura profunda: Modelo OSI, topologías en malla (Mesh), puertos lógicos y túneles seguros VPN.",
        iconoKey: "network",
        temas: [
            {
                id: "modelo-osi",
                titulo: "El Modelo OSI y la Arquitectura TCP/IP",
                icono: "layers",
                tag: "Arquitectura & Capas",
                resumen: "El mapa universal de las telecomunicaciones. Comprende cómo viaja un dato desde que tocas la pantalla de tu aplicación hasta que se convierte en pulsos electromagnéticos.",
                concepto: `
                    <p>
                        El <strong>Modelo OSI (Open Systems Interconnection)</strong> es un marco conceptual estandarizado por la ISO que divide el complejo proceso de comunicación en red en <strong>7 capas jerárquicas independientes</strong>, permitiendo que computadoras de diferentes marcas y sistemas operativos se comuniquen sin problemas:
                    </p>
                    <ul>
                        <li><strong>Capa 7 - Aplicación:</strong> La interfaz directa con los programas del usuario (HTTP, HTTPS, DNS, clientes de correo).</li>
                        <li><strong>Capa 6 - Presentación:</strong> Traduce, comprime y cifra la información para que sea legible entre sistemas heterogéneos (formato JSON, JPEG, SSL/TLS).</li>
                        <li><strong>Capa 5 - Sesión:</strong> Establece, administra y cierra las conexiones y diálogos continuos entre las aplicaciones de ambos extremos.</li>
                        <li><strong>Capa 4 - Transporte:</strong> Segmenta los datos y garantiza su entrega fiable o veloz mediante protocolos como <strong>TCP</strong> o <strong>UDP</strong>.</li>
                        <li><strong>Capa 3 - Red:</strong> Determina la mejor ruta para los paquetes a través de diferentes redes utilizando el <strong>Direccionamiento IP</strong> (Routers).</li>
                        <li><strong>Capa 2 - Enlace de Datos:</strong> Empaqueta la información en tramas físicas e identifica los equipos locales mediante su <strong>Dirección MAC</strong> (Switches).</li>
                        <li><strong>Capa 1 - Física:</strong> Transmite los bits puros en forma de pulsos eléctricos, señales de luz infrarroja o radiofrecuencia a través de cables o el aire.</li>
                    </ul>
                    <p>
                        A través del proceso de <strong>Encapsulamiento</strong>, cada capa descendente envuelve los datos agregando su propio encabezado técnico (Header) con la información de control necesaria, hasta que el receptor invierte el proceso (desencapsulamiento).
                    </p>
                `,
                ejemplo: "Cuando pulsas 'Enviar' en un chat: la Capa 7 toma tu texto, la Capa 6 lo cifra, la Capa 4 lo divide en segmentos TCP numerados, la Capa 3 le coloca tu IP de origen y la de destino, la Capa 2 le adjunta la dirección MAC de la tarjeta de red, y la Capa 1 lo convierte en pulsos de luz en tu fibra óptica. En el receptor, cada capa retira su encabezado hasta mostrarte el mensaje intacto.",
                buenasPracticas: [
                    "Aplica el modelo OSI para solucionar fallas técnicas: comienza siempre revisando la Capa 1 Física (¿está el cable conectado y con los LEDs encendidos?) antes de buscar errores en el software de la Capa 7.",
                    "Recuerda que los switches estándar operan en la Capa 2 (tramas y direcciones MAC), mientras que los routers operan en la Capa 3 (paquetes y direcciones IP).",
                    "Comprende que si una capa inferior falla (por ejemplo, corte del cable de fibra en Capa 1), ninguna de las capas superiores podrá funcionar."
                ],
                conceptoClave: "La modularidad del modelo OSI es su mayor fortaleza: si el medio físico cambia de cable de cobre a fibra óptica (Capa 1), las aplicaciones como tu navegador web (Capa 7) continúan funcionando exactamente igual sin requerir ningún cambio."
            },
            {
                id: "topologias",
                titulo: "Topologías de Red: El Origen de MESH",
                icono: "network",
                tag: "Diseño & Tolerancia a Fallas",
                resumen: "La arquitectura geométrica de las redes. Descubre por qué la topología en Malla (Mesh) —nombre de nuestra plataforma— es el diseño más indestructible del planeta.",
                concepto: `
                    <p>
                        La <strong>topología de red</strong> describe la distribución geométrica y estructural mediante la cual se interconectan los diferentes nodos (computadoras, servidores, impresoras y enrutadores) de una infraestructura de comunicación.
                    </p>
                    <p>
                        Las principales topologías que han marcado la historia de las redes son:
                    </p>
                    <ul>
                        <li><strong>Topología en Malla (MESH):</strong> Cada nodo está interconectado con múltiples o con todos los demás nodos de la red. Si un enlace físico o un servidor se cae o se corta, los datos encuentran instantáneamente rutas alternativas para llegar a su destino. Es la arquitectura de máxima redundancia sobre la cual está construida la infraestructura troncal de Internet.</li>
                        <li><strong>Topología en Estrella (Star):</strong> Todos los dispositivos se conectan a un conmutador central (Switch). Si un cable individual se rompe, solo ese equipo pierde comunicación, pero el resto de la red sigue operando con total normalidad. Es el estándar dominante en oficinas y hogares.</li>
                        <li><strong>Topología en Bus:</strong> Todos los equipos compartían un único cable troncal continuo. Si el cable se cortaba en cualquier punto, toda la red se paralizaba (arquitectura histórica ya obsoleta).</li>
                        <li><strong>Topología en Anillo (Ring):</strong> Los datos viajaban en un único sentido formando un bucle cerrado. Si una computadora intermedia fallaba, se interrumpía la circulación completa del token.</li>
                        <li><strong>Topología en Árbol (Tree) e Híbrida:</strong> Combina múltiples redes en estrella organizadas de forma jerárquica para conectar edificios enteros en campus universitarios.</li>
                    </ul>
                `,
                ejemplo: "En los sistemas modernos de Wi-Fi MESH para hogares grandes, colocas tres puntos de acceso inteligentes en diferentes pisos. A diferencia de los repetidores antiguos que creaban redes separadas con cortes de señal, la red en malla crea un tejido invisible continuo: te desplazas por toda la casa y tu celular salta automáticamente al nodo más cercano sin perder un solo milisegundo de tu llamada o juego online.",
                buenasPracticas: [
                    "Diseña redes de área local empresariales utilizando topología en estrella jerárquica con enlaces troncales redundantes entre conmutadores principales.",
                    "Instala sistemas Wi-Fi Mesh para residencias o escuelas con paredes gruesas de concreto para erradicar zonas muertas de señal.",
                    "Garantiza redundancia crítica en centros de datos contando con múltiples rutas físicas de enlace hacia distintos proveedores de internet (Dual WAN en malla)."
                ],
                conceptoClave: "La topología en Malla (Mesh) ofrece la máxima tolerancia a fallas conocida: ningún nodo es un punto único de falla, ya que siempre existen múltiples caminos alternativos para que los datos alcancen su destino."
            },
            {
                id: "protocolos",
                titulo: "Puertos de Red y Protocolos: TCP vs UDP",
                icono: "cpu",
                tag: "Transporte & Puertos Lógicos",
                resumen: "¿Por qué el streaming y los videojuegos online usan UDP mientras las páginas web usan TCP? Conoce cómo viajan los paquetes y el propósito de los números de puerto.",
                concepto: `
                    <p>
                        En la Capa de Transporte, las computadoras necesitan saber exactamente a qué aplicación deben entregar cada paquete que reciben. Para ello existen los <strong>puertos lógicos</strong>, numerados del <strong>0 al 65.535</strong>:
                    </p>
                    <ul>
                        <li><strong>Puerto 80:</strong> Protocolo HTTP (Navegación web sin cifrado).</li>
                        <li><strong>Puerto 443:</strong> Protocolo HTTPS (Navegación web segura y cifrada con TLS).</li>
                        <li><strong>Puerto 53:</strong> Protocolo DNS (Resolución de nombres de dominio a direcciones IP).</li>
                        <li><strong>Puerto 22:</strong> Protocolo SSH (Administración remota segura por línea de comandos).</li>
                        <li><strong>Puerto 21:</strong> Protocolo FTP (Transferencia tradicional de archivos).</li>
                    </ul>
                    <p>
                        Dependiendo de la prioridad de la aplicación, se eligen dos protocolos de transporte con filosofías opuestas:
                    </p>
                    <ul>
                        <li><strong>TCP (Transmission Control Protocol):</strong> Orientado a conexión y 100% fiable. Realiza un 'saludo de tres vías' (Three-Way Handshake) antes de transmitir, numera cada paquete y, si alguno se extravía en la red, exige su retransmisión obligatoria. Es ideal para páginas web, correos y transferencias bancarias donde no puede faltar ni un solo byte.</li>
                        <li><strong>UDP (User Datagram Protocol):</strong> No orientado a conexión y ultra veloz. Dispara los paquetes a toda velocidad sin esperar confirmaciones ni retransmitir nada. Si un paquete se pierde, se descarta para no causar retrasos (lag). Es el rey indiscutible de las partidas multijugador online, videollamadas y transmisiones en vivo.</li>
                    </ul>
                `,
                ejemplo: "Cuando juegas una partida competitiva de Valorant o Free Fire y sufres una pérdida del 1% de paquetes, el juego utiliza UDP: no va a congelar la imagen para pedirte el paquete viejo de hace medio segundo, sino que prefiere saltar directamente a tu posición actual sin retrasos. En cambio, cuando descargas una foto o un documento escolar, se usa TCP: si faltara un solo paquete de datos, el archivo quedaría completamente dañado e ilegible.",
                buenasPracticas: [
                    "Identifica qué puertos específicos requiere cada aplicación antes de abrir puertos (Port Forwarding) en el router para alojar servidores de juegos.",
                    "Nunca dejes abiertos hacia internet puertos inseguros o heredados sin cifrado (como Telnet 23 o RDP 3389 sin protección VPN).",
                    "Aprende a usar herramientas de diagnóstico en terminal como <code>netstat -an</code> para inspeccionar qué puertos están escuchando activamente en tu equipo."
                ],
                conceptoClave: "TCP prioriza la confiabilidad absoluta y la integridad de los datos a costa de mayor latencia, mientras que UDP prioriza la velocidad inmediata y el tiempo real a costa de tolerar pequeñas pérdidas de paquetes."
            },
            {
                id: "vpn",
                titulo: "Redes Privadas Virtuales (VPN) y Teletrabajo",
                icono: "globe",
                tag: "Túneles & Conectividad Remota",
                resumen: "Conecta dos puntos remotos a través de un túnel invisible y cifrado en internet. Descubre cómo operan las VPNs corporativas y la protección de la privacidad.",
                concepto: `
                    <p>
                        Una <strong>VPN (Virtual Private Network)</strong> es una tecnología de red que permite extender de forma segura una red local privada a través de una red pública no confiable como Internet, creando un canal de comunicación protegido denominado <strong>túnel cifrado</strong>.
                    </p>
                    <p>
                        El funcionamiento técnico de un túnel VPN comprende los siguientes pasos:
                    </p>
                    <ul>
                        <li><strong>Encapsulamiento y Cifrado:</strong> Cada paquete de datos generado por tu computadora es cifrado y colocado dentro de otro paquete IP estándar antes de salir a internet.</li>
                        <li><strong>Tránsito Protegido:</strong> Si un proveedor de internet o un atacante en la red intercepta el tráfico, solo verá paquetes cifrados dirigiéndose a la dirección IP del servidor VPN, sin poder conocer el contenido ni los destinos reales.</li>
                        <li><strong>Desencapsulamiento:</strong> El servidor VPN descifra los paquetes y los entrega al destino final; ante el sitio web receptor, la petición parece originarse en la IP y ubicación del servidor VPN.</li>
                    </ul>
                    <p>
                        En el ámbito profesional, las VPNs corporativas permiten que empleados remotos se conecten a la red interna de su empresa desde cualquier parte del mundo, accediendo a servidores de archivos y bases de datos con la misma seguridad que si estuvieran físicamente en la oficina.
                    </p>
                `,
                ejemplo: "Un ingeniero médico trabaja desde su casa y necesita ingresar a la base de datos interna de historias clínicas de un hospital. Si intentara conectarse directamente por la web pública, el servidor rechazaría la conexión por seguridad. Al iniciar su cliente VPN con autenticación de dos factores, se crea un túnel seguro que transporta virtualmente su computadora dentro de la red local del hospital.",
                buenasPracticas: [
                    "Desconfía de servicios de VPN comerciales 'gratuitos' para smartphones: muchas de estas empresas monetizan su operación registrando y vendiendo los hábitos de navegación de sus usuarios.",
                    "Si buscas privacidad personal, opta por proveedores de VPN que cuenten con auditorías independientes de su política de 'Cero Registros' (No-Logs Policy).",
                    "Utiliza protocolos VPN modernos y eficientes como <strong>WireGuard</strong> u <strong>OpenVPN</strong> sobre cifrado AES-256.",
                    "Ten en cuenta que una VPN cifra tu tráfico contra intermediarios en la red, pero no te protege si descargas un troyano o entregas voluntariamente tus credenciales en un sitio web de phishing."
                ],
                conceptoClave: "Una VPN no crea un cable físico nuevo: utiliza la infraestructura pública ordinaria de Internet pero construye un túnel matemático impenetrable alrededor de tus paquetes de datos para que viajen completamente a salvo de miradas indiscretas."
            }
        ]
    }

};

/* =======================================================
   RENDERIZAR LECCIÓN CON MENÚ INTERACTIVO DE TEMAS
   ======================================================= */

function mostrarLeccion(categoria, subtemaId = null) {
    const categoriaData = catalogoAprende[categoria];
    if (!categoriaData) {
        navegar("aprende");
        return;
    }

    const temas = categoriaData.temas;
    const totalTemas = temas.length;

    // Buscar tema activo o seleccionar el primero por defecto
    let indiceActual = 0;
    if (subtemaId) {
        const indiceEncontrado = temas.findIndex(t => t.id === subtemaId);
        if (indiceEncontrado !== -1) {
            indiceActual = indiceEncontrado;
        }
    }
    const temaActivo = temas[indiceActual];

    const contenido = document.getElementById("contenido");
    if (!contenido) return;

    contenido.innerHTML = `
        <section class="aprende">

            <div class="leccion-container">

                <!-- ENCABEZADO DE LA LECCIÓN -->
                <div class="leccion-header-gamer">
                    <div class="leccion-breadcrumbs">
                        <button class="breadcrumb-link" onclick="navegar('aprende')">
                            ${icon('book-open', 14)} Aprende
                        </button>
                        <span class="separador">/</span>
                        <span class="actual">${categoriaData.categoriaTitulo}</span>
                    </div>

                    <div class="leccion-titulo-fila">
                        <div class="leccion-icono-grande">
                            ${icon(categoriaData.iconoKey, 38)}
                        </div>
                        <div>
                            <h1>${categoriaData.categoriaTitulo}</h1>
                            <p>${categoriaData.categoriaSubtitulo}</p>
                        </div>
                    </div>
                </div>

                <!-- MENÚ INTERACTIVO DE TEMAS -->
                <div class="menu-temas-wrapper">
                    <div class="menu-temas-header">
                        <span class="menu-temas-label">
                            ${icon('layers', 16)}
                            Menú de Temas de esta Sección
                        </span>
                        <span class="menu-temas-contador">
                            ${indiceActual + 1} de ${totalTemas} temas
                        </span>
                    </div>

                    <div class="menu-temas-grid">
                        ${temas.map((tema, index) => {
                            const esActivo = index === indiceActual;
                            return `
                                <button class="btn-tema-nav ${esActivo ? 'activo' : ''}" 
                                        onclick="navegar('aprende/${categoria}/${tema.id}')"
                                        title="${tema.titulo}">
                                    <div class="btn-tema-top">
                                        <div class="btn-tema-icono">
                                            ${icon(tema.icono, 18)}
                                        </div>
                                        <span class="btn-tema-num">Tema 0${index + 1}</span>
                                        ${esActivo ? `<span class="btn-tema-badge-activo">${icon('check', 11)} Activo</span>` : ''}
                                    </div>
                                    <div class="btn-tema-info">
                                        <span class="btn-tema-titulo">${tema.titulo}</span>
                                    </div>
                                </button>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- CONTENIDO DEL TEMA ACTIVO -->
                <article class="tema-detalle-card">

                    <!-- CABECERA DEL TEMA -->
                    <div class="tema-header">
                        <div class="tema-tag-wrap">
                            <span class="tema-tag-pill">${temaActivo.tag}</span>
                            <span class="tema-orden-badge">Tema ${indiceActual + 1} de ${totalTemas}</span>
                        </div>
                        <h2>${temaActivo.titulo}</h2>
                        <p class="tema-resumen-destacado">${temaActivo.resumen}</p>
                    </div>

                    <!-- BLOQUE 1: EXPLICACIÓN CONCEPTUAL -->
                    <div class="tema-seccion-bloque">
                        <h3>
                            ${icon('book-open', 20)}
                            Fundamentos y Conceptos Esenciales
                        </h3>
                        <div class="tema-cuerpo-texto">
                            ${temaActivo.concepto}
                        </div>
                    </div>

                    <!-- BLOQUE 2: EJEMPLO DE LA VIDA COTIDIANA -->
                    <div class="tema-seccion-bloque ejemplo-cotidiano">
                        <h3>
                            ${icon('zap', 20)}
                            Caso Práctico en la Vida Real
                        </h3>
                        <p>${temaActivo.ejemplo}</p>
                    </div>

                    <!-- BLOQUE 3: BUENAS PRÁCTICAS Y CONSEJOS -->
                    <div class="tema-seccion-bloque">
                        <h3>
                            ${icon('check-circle', 20)}
                            Buenas Prácticas y Consejos Clave
                        </h3>
                        <ul class="lista-buenas-practicas">
                            ${temaActivo.buenasPracticas.map(bp => `
                                <li>
                                    <span class="bp-icono">${icon('check', 14)}</span>
                                    <span>${bp}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>

                    <!-- BLOQUE 4: SABÍAS QUE / CONCEPTO CLAVE -->
                    <div class="tema-seccion-bloque tip-clave">
                        <div class="tip-clave-header">
                            ${icon('lightbulb', 18)}
                            <strong>Concepto Clave para Recordar</strong>
                        </div>
                        <p>${temaActivo.conceptoClave}</p>
                    </div>

                    <!-- NAVEGACIÓN RÁPIDA ENTRE TEMAS (ANTERIOR / SIGUIENTE) -->
                    <div class="tema-paginacion-bar">
                        ${indiceActual > 0 ? `
                            <button class="btn-nav-tema anterior" onclick="navegar('aprende/${categoria}/${temas[indiceActual - 1].id}')">
                                ${icon('arrow-left', 16)}
                                <span>Tema anterior: <strong>${temas[indiceActual - 1].titulo}</strong></span>
                            </button>
                        ` : `<div></div>`}

                        ${indiceActual < totalTemas - 1 ? `
                            <button class="btn-nav-tema siguiente" onclick="navegar('aprende/${categoria}/${temas[indiceActual + 1].id}')">
                                <span>Siguiente tema: <strong>${temas[indiceActual + 1].titulo}</strong></span>
                                ${icon('arrow-right', 16)}
                            </button>
                        ` : `
                            <button class="btn-nav-tema finalizar-modulo" onclick="navegar('actividades/${categoria}')">
                                <span>${icon('trophy', 16)} ¡Lección completa! Ir a Actividades</span>
                                ${icon('arrow-right', 16)}
                            </button>
                        `}
                    </div>

                </article>

                <!-- BOTONES GLOBALES INFERIORES -->
                <div class="leccion-acciones">
                    <button class="btn-volver" onclick="navegar('aprende')">
                        ${icon('arrow-left', 16)} Volver a Módulos de Aprende
                    </button>
                    ${categoria === 'seguridad' ? `
                        <button class="btn-volver btn-accion-siguiente" onclick="navegar('seguridad')">
                            ${icon('shield', 16)} Ver Casos en Seguridad
                            ${icon('arrow-right', 14)}
                        </button>
                    ` : `
                        <button class="btn-volver btn-accion-siguiente" onclick="navegar('redes')">
                            ${icon('network', 16)} Ver Laboratorio de Redes
                            ${icon('arrow-right', 14)}
                        </button>
                    `}
                </div>

            </div>

        </section>
    `;
}