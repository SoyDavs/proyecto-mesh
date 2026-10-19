/* ==========================================
   REDES Y CABLEADO ESTRUCTURADO (MESH)
   Sin emojis - Con iconos vectoriales React-Icons
   y soporte total para navegación SPA y botón Atrás.
   ========================================== */

function crearRedes() {
    const contenido = document.getElementById("contenido");

    contenido.innerHTML = `
        <section class="redes">

            <div class="redes-intro">
                <span class="seccion-etiqueta">${icon('network', 16)} Infraestructura & Conectividad</span>
                <h1>Redes y Cableado</h1>
                <p>
                    Aprende cómo funcionan las redes informáticas, conoce los dispositivos 
                    de interconexión, comprende el direccionamiento IP y descubre cómo realizar 
                    correctamente el cableado estructurado bajo normas internacionales.
                </p>
            </div>

            <div class="temas-redes">

                <!-- TIPOS DE REDES -->
                <article class="tema-red">
                    <div>
                        <div class="tema-icono">
                            ${icon('globe', 36)}
                        </div>
                        <h2>Tipos de redes</h2>
                        <p>
                            Aprende sobre PAN, LAN, WLAN, MAN, WAN y el alcance geográfico de cada una.
                        </p>
                    </div>
                    <button onclick="navegar('redes/tipos')">
                        ${icon('book-open', 15)} Aprender más
                        ${icon('arrow-right', 13)}
                    </button>
                </article>

                <!-- DISPOSITIVOS -->
                <article class="tema-red">
                    <div>
                        <div class="tema-icono">
                            ${icon('switch', 36)}
                        </div>
                        <h2>Dispositivos de red</h2>
                        <p>
                            Conoce routers, switches, access points, módems y tarjetas de interfaz NIC.
                        </p>
                    </div>
                    <button onclick="navegar('redes/dispositivos')">
                        ${icon('book-open', 15)} Aprender más
                        ${icon('arrow-right', 13)}
                    </button>
                </article>

                <!-- DIRECCIONAMIENTO -->
                <article class="tema-red">
                    <div>
                        <div class="tema-icono">
                            ${icon('hash', 36)}
                        </div>
                        <h2>Direccionamiento IP</h2>
                        <p>
                            Comprende qué son las direcciones IP (IPv4 / IPv6), máscaras de subred y DNS.
                        </p>
                    </div>
                    <button onclick="navegar('redes/ip')">
                        ${icon('book-open', 15)} Aprender más
                        ${icon('arrow-right', 13)}
                    </button>
                </article>

                <!-- CONFIGURACIÓN -->
                <article class="tema-red">
                    <div>
                        <div class="tema-icono">
                            ${icon('settings', 36)}
                        </div>
                        <h2>Configuración de red</h2>
                        <p>
                            Aprende sobre DHCP, IPs estáticas, seguridad Wi-Fi (WPA3) y comandos de diagnóstico.
                        </p>
                    </div>
                    <button onclick="navegar('redes/configuracion')">
                        ${icon('book-open', 15)} Aprender más
                        ${icon('arrow-right', 13)}
                    </button>
                </article>

                <!-- MEDIOS -->
                <article class="tema-red">
                    <div>
                        <div class="tema-icono">
                            ${icon('wifi', 36)}
                        </div>
                        <h2>Medios de transmisión</h2>
                        <p>
                            Compara cables de par trenzado UTP, fibra óptica, cable coaxial y ondas de radio.
                        </p>
                    </div>
                    <button onclick="navegar('redes/medios')">
                        ${icon('book-open', 15)} Aprender más
                        ${icon('arrow-right', 13)}
                    </button>
                </article>

                <!-- CABLEADO -->
                <article class="tema-red">
                    <div>
                        <div class="tema-icono">
                            ${icon('plug', 36)}
                        </div>
                        <h2>Cableado estructurado</h2>
                        <p>
                            Aprende sobre cable UTP, conectores RJ45, herramientas y las normas T568A y T568B.
                        </p>
                    </div>
                    <button onclick="navegar('redes/cableado')">
                        ${icon('book-open', 15)} Aprender más
                        ${icon('arrow-right', 13)}
                    </button>
                </article>

            </div>

        </section>
    `;
}

const informacionRedes = {

    /* ======================================
       TIPOS DE REDES
       ====================================== */
    tipos: {
        iconoKey: "globe",
        titulo: "Tipos de Redes",
        texto: `
            <titulo>Explicación:</titulo>
            <p>
                Una red informática es un sistema interconectado de computadoras, servidores y dispositivos periféricos que se comunican entre sí para compartir información, recursos y servicios. Las redes permiten la transmisión instantánea de datos y se clasifican principalmente según su alcance territorial, su tecnología de conexión y su propósito.
            </p>

            <titulo>Clasificación según su alcance geográfico:</titulo>
            <ul>
                <li><strong>PAN (Personal Area Network):</strong> Red de área personal con un alcance de unos pocos metros alrededor de un usuario. Permite interconectar dispositivos cercanos como smartphones, tabletas, auriculares y relojes inteligentes (frecuentemente vía Bluetooth).</li>
                <li><strong>LAN (Local Area Network):</strong> Red de área local que abarca un espacio reducido y delimitado, como una casa, oficina o aula de informática. Se caracteriza por sus altas velocidades de transferencia y baja tasa de errores.</li>
                <li><strong>WLAN (Wireless Local Area Network):</strong> Es una versión inalámbrica de la red LAN que emplea señales de radiofrecuencia (Wi-Fi), facilitando la conectividad sin requerir cables físicos.</li>
                <li><strong>MAN (Metropolitan Area Network):</strong> Red de área metropolitana que cubre un área geográfica de tamaño intermedio, como un municipio, campus universitario o una ciudad entera, interconectando diversas redes LAN.</li>
                <li><strong>WAN (Wide Area Network):</strong> Red de área amplia que abarca extensas regiones geográficas, países o incluso continentes. El ejemplo más grande y representativo de red WAN es Internet.</li>
            </ul>

            <titulo>Importancia y ventajas:</titulo>
            <p>
                El uso de redes optimiza los costos operativos al compartir periféricos costosos (como impresoras o almacenamiento centralizado), permite el trabajo en equipo y colaborativo en tiempo real, agiliza la comunicación y facilita el acceso remoto a aplicaciones y servicios en la nube.
            </p>

            <titulo>Ejemplos de la vida cotidiana:</titulo>
            <ul class="lista-ejemplos">
                <li><span class="icono-ejemplo">${icon('headphones', 16)}</span> <strong>Escuchar música con audífonos Bluetooth (PAN):</strong> Cuando vinculas tus audífonos inalámbricos o tu reloj inteligente a tu teléfono celular a menos de 2 metros mientras haces ejercicio, estás utilizando una red de área personal.</li>
                <li><span class="icono-ejemplo">${icon('home', 16)}</span> <strong>El Wi-Fi de tu casa (WLAN / LAN):</strong> Cuando tu Smart TV, tu consola de videojuegos y los celulares de tu familia se conectan al módem de la sala para ver series o transmitirse fotos sin cables, todos forman una red de área local inalámbrica.</li>
                <li><span class="icono-ejemplo">${icon('printer', 16)}</span> <strong>Imprimir en el colegio o trabajo (LAN cableada):</strong> En una sala de sistemas o en una oficina, 25 computadoras pueden mandar trabajos a una misma impresora compartida a través de cables de red conectados a un switch, sin tener que pasar los archivos en una memoria USB.</li>
                <li><span class="icono-ejemplo">${icon('radio', 16)}</span> <strong>Cámaras de fotomultas y semáforos de la ciudad (MAN):</strong> El sistema central que sincroniza los semáforos de una ciudad o la red que interconecta todas las sedes de un banco o una universidad dentro del mismo municipio utiliza una red de área metropolitana.</li>
                <li><span class="icono-ejemplo">${icon('globe', 16)}</span> <strong>Ver series en Netflix y chatear por WhatsApp (WAN / Internet):</strong> Cuando juegas una partida online con amigos de otros países o miras una película alojada en servidores al otro lado del mundo, tus datos viajan por la red de área amplia más grande del planeta: Internet.</li>
            </ul>
        `,
        video: "videos/tipos.mp4"
    },

    /* ======================================
       DISPOSITIVOS DE RED
       ====================================== */
    dispositivos: {
        iconoKey: "switch",
        titulo: "Dispositivos de Red",
        texto: `
            <titulo>Explicación:</titulo>
            <p>
                Los dispositivos de red son equipos electrónicos de hardware especializados en interconectar los diferentes equipos terminales (computadoras, teléfonos, impresoras, servidores), administrando y encauzando el flujo de los paquetes de datos para que lleguen a su destino de manera óptima y segura.
            </p>

            <titulo>Principales dispositivos y sus funciones:</titulo>
            <ul>
                <li><strong>Router (Enrutador):</strong> Es el equipo inteligente que interconecta redes independientes (por ejemplo, tu red local con Internet). Lee las direcciones IP de origen y destino de cada paquete y determina cuál es la mejor ruta para enviarlo.</li>
                <li><strong>Switch (Conmutador):</strong> Es el nodo central en una red local (LAN). Recibe los datos y los envía exclusivamente al puerto donde se encuentra el equipo destinatario utilizando su dirección MAC física, evitando saturación y colisiones en la red.</li>
                <li><strong>Access Point (Punto de Acceso Inalámbrico):</strong> Extiende la conectividad de la red cableada emitiendo ondas de radio (Wi-Fi) para que los dispositivos móviles puedan conectarse sin necesidad de cables.</li>
                <li><strong>Módem:</strong> Realiza la modulación y demodulación de señales, transformando las señales del proveedor de servicios de internet (por cable coaxial, par de cobre o fibra) en datos digitales compatibles con la red local.</li>
                <li><strong>Tarjeta de red (NIC):</strong> Componente interno indispensable presente en cada computadora o dispositivo que le permite integrarse físicamente a la red a través de un puerto Ethernet RJ45 o por antena Wi-Fi.</li>
            </ul>

            <titulo>Importancia en la infraestructura:</titulo>
            <p>
                La correcta selección e integración de los dispositivos de red previene cuellos de botella en la transmisión, asegura una baja latencia en videollamadas o juegos, y permite segmentar la red para mayor seguridad y control de acceso.
            </p>

            <titulo>Ejemplos de la vida cotidiana:</titulo>
            <ul class="lista-ejemplos">
                <li><span class="icono-ejemplo">${icon('router', 16)}</span> <strong>El router de tu sala (Router doméstico):</strong> Es la caja que instala tu empresa de internet en tu hogar; recibe las solicitudes de tu celular, busca el camino más rápido en Internet para cargar tus videos de TikTok o YouTube y te devuelve la información.</li>
                <li><span class="icono-ejemplo">${icon('gamepad', 16)}</span> <strong>Un torneo de videojuegos en un cibercafé (Switch):</strong> En una sala de juegos con 20 computadoras, todas se conectan con cables a un switch. El switch reparte los paquetes del juego al instante directamente a la máquina de cada jugador sin que se mezclen ni se ralentice la partida.</li>
                <li><span class="icono-ejemplo">${icon('wifi', 16)}</span> <strong>El Wi-Fi de un centro comercial o aeropuerto (Access Point):</strong> Esos platillos circulares blancos instalados en los techos de centros comerciales, hoteles o universidades son puntos de acceso que permiten que cientos de personas caminen por los pasillos manteniendo señal Wi-Fi constante.</li>
                <li><span class="icono-ejemplo">${icon('zap', 16)}</span> <strong>El convertidor de señal de la calle (Módem):</strong> El aparato donde se conecta el cable negro o el fino cable amarillo de fibra óptica que baja desde el poste de la calle; convierte esa señal óptica o electromagnética en datos digitales que tus aparatos pueden entender.</li>
                <li><span class="icono-ejemplo">${icon('monitor', 16)}</span> <strong>El conector trasero de tu consola PlayStation o PC (Tarjeta de red):</strong> Cuando tu Wi-Fi falla y conectas un cable de red directo a la parte trasera de tu consola o portátil, la tarjeta de red interna procesa la conexión para eliminar el retraso (lag) y descargar tus juegos a toda velocidad.</li>
            </ul>
        `,
        video: "videos/dispositivos.mp4"
    },

    /* ======================================
       DIRECCIONAMIENTO IP
       ====================================== */
    ip: {
        iconoKey: "hash",
        titulo: "Direccionamiento IP",
        texto: `
            <titulo>Explicación:</titulo>
            <p>
                Una dirección IP (Internet Protocol) es una dirección numérica y lógica asignada a cada equipo o interfaz conectada a una red que utilice el protocolo IP. Funciona exactamente igual que una dirección postal o un número telefónico, haciendo posible que los paquetes de datos identifiquen el origen y el destino exactos de cada mensaje.
            </p>

            <titulo>Conceptos fundamentales:</titulo>
            <ul>
                <li><strong>IPv4 vs IPv6:</strong> IPv4 utiliza 32 bits divididos en 4 octetos decimales separados por puntos (ejemplo: <code>192.168.1.15</code>), ofreciendo cerca de 4.300 millones de direcciones. Debido al crecimiento masivo de dispositivos conectados, se diseñó IPv6, que emplea 128 bits expresados en 8 grupos hexadecimales (ejemplo: <code>2001:0db8:85a3::8a2e:0370:7334</code>), garantizando direcciones prácticamente ilimitadas.</li>
                <li><strong>IP Pública vs IP Privada:</strong> La IP privada se usa para identificar a cada dispositivo dentro de tu red doméstica o local (como <code>192.168.1.X</code> o <code>10.0.0.X</code>). La IP pública es asignada por tu proveedor de Internet (ISP) y representa a toda tu red ante el mundo en Internet.</li>
                <li><strong>Máscara de subred:</strong> Indica qué segmento de la dirección IP pertenece a la red y qué parte identifica al equipo (host) en particular (comúnmente <code>255.255.255.0</code> en redes de clase C).</li>
                <li><strong>Puerta de enlace (Default Gateway):</strong> Es la dirección IP asignada a la interfaz local del router, la cual sirve como punto de salida para que los equipos locales se comuniquen con el exterior.</li>
                <li><strong>DNS (Sistema de Nombres de Dominio):</strong> Es la guía telefónica de Internet; traduce nombres que las personas recuerdan fácilmente (como <code>www.google.com</code>) a direcciones IP numéricas que las computadoras comprenden.</li>
            </ul>

            <titulo>Importancia:</titulo>
            <p>
                El direccionamiento IP es el pilar de la conectividad moderna. Sin él, sería imposible dirigir paquetes de datos a través de miles de rutas intermedias hasta llegar al destinatario correcto sin pérdidas ni confusiones.
            </p>

            <titulo>Ejemplos de la vida cotidiana:</titulo>
            <ul class="lista-ejemplos">
                <li><span class="icono-ejemplo">${icon('smartphone', 16)}</span> <strong>El pedido de comida a domicilio (La IP como dirección postal):</strong> Si pides una pizza por una app de domicilios, el repartidor necesita tu dirección exacta para no entregársela al vecino equivocado. Cuando tocas un video en Instagram, tu celular envía su dirección IP para que el servidor sepa con exactitud a qué teléfono devolver el video.</li>
                <li><span class="icono-ejemplo">${icon('server', 16)}</span> <strong>La portería y los apartamentos de un conjunto (IP Pública vs Privada):</strong>
                    <ul>
                        <li>La <strong>IP Pública</strong> es la dirección de la portería del edificio hacia la calle (ej. Calle 50 # 12-34); es una sola y representa a toda tu casa en Internet.</li>
                        <li>La <strong>IP Privada</strong> es el número de cada apartamento dentro del edificio (Apto 101, Apto 202, como <code>192.168.1.5</code> para tu celular y <code>192.168.1.8</code> para tu Smart TV), permitiendo que el router sepa a qué pantalla específica mandar cada serie o canción.</li>
                    </ul>
                </li>
                <li><span class="icono-ejemplo">${icon('book-open', 16)}</span> <strong>La agenda de contactos de tu celular (Servidor DNS):</strong> Nadie memoriza números de teléfono de 10 dígitos para cada amigo; simplemente buscas "Mamá" o "Santiago" y el celular marca el número. El DNS hace lo mismo: cuando escribes <code>youtube.com</code> en el navegador, el DNS traduce ese nombre a su número IP real (ej. <code>142.250.190.46</code>).</li>
                <li><span class="icono-ejemplo">${icon('arrow-right', 16)}</span> <strong>La puerta principal de tu casa (Puerta de Enlace / Gateway):</strong> Para moverte de tu habitación a la cocina te quedas dentro de casa, pero si quieres salir a la calle debes cruzar obligatoriamente la puerta principal. La puerta de enlace (la IP de tu router, comúnmente <code>192.168.1.1</code>) es esa puerta por donde tus mensajes salen hacia el resto de Internet.</li>
            </ul>
        `,
        video: "videos/dirrecciones.mp4"
    },

    /* ======================================
       CONFIGURACIÓN DE UNA RED
       ====================================== */
    configuracion: {
        iconoKey: "settings",
        titulo: "Configuración de una Red",
        texto: `
            <titulo>Explicación:</titulo>
            <p>
                La configuración de una red es el proceso de establecer los parámetros lógicos, de seguridad y de comunicación necesarios para que los dispositivos puedan interactuar entre sí, acceder a Internet y compartir recursos de manera fluida y protegida.
            </p>

            <titulo>Aspectos y parámetros clave:</titulo>
            <ul>
                <li><strong>Asignación DHCP vs IP Estática:</strong> El protocolo DHCP asigna dinámicamente direcciones IP, máscaras y DNS a cada equipo que se conecta a la red de forma automática. La IP estática o fija se configura manualmente en dispositivos que deben mantener siempre la misma dirección, como servidores, impresoras de red y cámaras IP.</li>
                <li><strong>Configuración del Router y Wi-Fi:</strong> Incluye configurar el SSID (nombre público de la red Wi-Fi), seleccionar el canal y frecuencia (2.4 GHz o 5 GHz), y definir un cifrado seguro (como WPA2-PSK o WPA3-Personal) con una contraseña robusta.</li>
                <li><strong>Servidores DNS y Puerta de Enlace:</strong> Configuración de la IP de la puerta de enlace (normalmente 192.168.1.1 o 192.168.0.1) y de servidores DNS rápidos y confiables (como Google <code>8.8.8.8</code> o Cloudflare <code>1.1.1.1</code>).</li>
                <li><strong>Comandos de verificación y diagnóstico en terminal:</strong>
                    <ul>
                        <li><code>ipconfig</code> (en Windows) o <code>ip a</code> (en Linux): Muestra los datos de red configurados en tu equipo.</li>
                        <li><code>ping [IP o dominio]</code>: Envía paquetes de prueba ICMP para verificar si un host remoto responde y medir el tiempo de respuesta en milisegundos.</li>
                        <li><code>tracert [IP o dominio]</code>: Traza y muestra todos los saltos de router que realiza un paquete para llegar a su destino.</li>
                    </ul>
                </li>
            </ul>

            <titulo>Buenas prácticas de seguridad:</titulo>
            <p>
                Cambiar de inmediato la contraseña predeterminada de administración del router, deshabilitar la función WPS si no se utiliza, aislar la red de invitados y mantener actualizado el firmware del fabricante.
            </p>

            <titulo>Ejemplos de la vida cotidiana:</titulo>
            <ul class="lista-ejemplos">
                <li><span class="icono-ejemplo">${icon('smartphone', 16)}</span> <strong>Llegar a la casa de un amigo y pedir la clave del Wi-Fi (DHCP automático):</strong> Tan pronto escribes la contraseña, tu celular se conecta y navega al instante. No tuviste que configurar nada porque el router ejecutó el protocolo DHCP y le asignó a tu celular una dirección IP libre en menos de 1 segundo.</li>
                <li><span class="icono-ejemplo">${icon('printer', 16)}</span> <strong>La impresora o cámara de seguridad que nunca se desconecta (IP Estática):</strong> Si la impresora de tu casa o colegio cambiara de IP cada vez que se reinicia el router, tendrías que volver a buscarla y configurarla en cada PC. Al asignarle una IP estática o fija (como <code>192.168.1.200</code>), cualquier celular o computadora siempre sabe exactamente dónde encontrarla.</li>
                <li><span class="icono-ejemplo">${icon('zap', 16)}</span> <strong>Saber por qué el videojuego online tiene "lag" (Comando Ping):</strong> Cuando juegas Free Fire, Fortnite o Valorant y sientes que los personajes se congelan o tus disparos tardan en registrar, estás sufriendo de latencia alta. Al abrir la terminal y escribir <code>ping google.com</code>, si el resultado dice 18 ms tu conexión es perfecta; si dice 350 ms significa que hay problemas o alguien en casa está saturando el internet.</li>
                <li><span class="icono-ejemplo">${icon('lock', 16)}</span> <strong>Evitar que los vecinos se cuelguen de tu internet (Seguridad WPA3 y SSID):</strong> Los routers nuevos vienen con nombres genéricos y contraseñas débiles. Al entrar a la configuración (<code>192.168.1.1</code>), le cambias el nombre a tu red (ej. "Familia_Perez_5G"), eliges seguridad WPA2 o WPA3 y pones una contraseña compleja para que nadie use tu internet sin permiso.</li>
            </ul>
        `,
        video: "videos/configuracion.mp4"
    },

    /* ======================================
       MEDIOS DE TRANSMISIÓN
       ====================================== */
    medios: {
        iconoKey: "wifi",
        titulo: "Medios de Transmisión",
        texto: `
            <titulo>Explicación:</titulo>
            <p>
                Los medios de transmisión son los soportes físicos o electromagnéticos a través de los cuales viaja la información entre el emisor y el receptor en una red de datos. La información puede transmitirse en forma de impulsos eléctricos, ondas electromagnéticas o pulsos luminosos.
            </p>

            <titulo>Clasificación de los medios:</titulo>
            <ul>
                <li><strong>Medios Guiados (Por cable):</strong>
                    <ul>
                        <li><strong>Cable de Par Trenzado (UTP / STP / FTP):</strong> Es el medio más utilizado en redes LAN. Los cables UTP constan de 4 pares de hilos de cobre trenzados entre sí para atenuar las interferencias electromagnéticas. Se terminan con conectores RJ45 y alcanzan velocidades desde 100 Mbps (Cat 5) hasta 10 Gbps (Cat 6A/7).</li>
                        <li><strong>Fibra Óptica:</strong> Conduce pulsos de luz generados por láseres o diodos a través de filamentos de vidrio o silicio ultradelgados. Es completamente inmune al ruido electromagnético, ofrece velocidades sumamente altas y permite cubrir distancias de decenas de kilómetros sin pérdida de señal.</li>
                        <li><strong>Cable Coaxial:</strong> Formado por un núcleo de cobre central rodeado por un material aislante y una malla de apantallamiento. Se utilizó históricamente en redes Ethernet antiguas y ampliamente en redes de televisión y módems de banda ancha.</li>
                    </ul>
                </li>
                <li><strong>Medios No Guiados (Inalámbricos):</strong>
                    <ul>
                        <li><strong>Ondas de Radio (Wi-Fi):</strong> Permiten la transmisión omnidireccional a través del aire, brindando gran movilidad y flexibilidad en casas, oficinas y espacios públicos.</li>
                        <li><strong>Microondas Terrestres y Enlaces Satelitales:</strong> Utilizados para comunicaciones punto a punto en largas distancias o para interconectar sedes remotas donde tender cables no es viable económicamente.</li>
                        <li><strong>Bluetooth e Infrarrojo:</strong> Medios de corto alcance ideados para la interconexión de periféricos personales con bajo consumo de batería.</li>
                    </ul>
                </li>
            </ul>

            <titulo>Criterios de elección:</titulo>
            <p>
                Al diseñar una red se debe evaluar el ancho de banda requerido, la distancia geográfica que debe cubrirse, la inmunidad requerida frente a ruidos electromagnéticos, el costo económico de instalación y la necesidad de movilidad del usuario final.
            </p>

            <titulo>Ejemplos de la vida cotidiana:</titulo>
            <ul class="lista-ejemplos">
                <li><span class="icono-ejemplo">${icon('gamepad', 16)}</span> <strong>Conectar tu consola o PC con cable UTP en lugar de Wi-Fi:</strong> Jugar por Wi-Fi puede causar subidas de ping o desconexiones cuando alguien enciende el microondas o abre un video pesado. Al conectar un cable de red azul o gris (UTP) directo del router a tu PC o consola, la señal viaja por cobre puro sin interferencias ni lag.</li>
                <li><span class="icono-ejemplo">${icon('zap', 16)}</span> <strong>Descargar juegos de 80 GB en minutos con Fibra Óptica:</strong> La fibra óptica usa pulsos de luz dentro de hilos de vidrio tan finos como un cabello humano. Gracias a esto, planes de fibra de 300 o 500 Megas permiten descargar películas 4K o actualizaciones de videojuegos pesados en cuestión de minutos, sin que la lluvia o las tormentas eléctricas afecten la señal.</li>
                <li><span class="icono-ejemplo">${icon('wifi', 16)}</span> <strong>Ver TikTok o reels acostado en tu cama (Wi-Fi):</strong> Las ondas de radio del Wi-Fi atraviesan paredes para que puedas moverte libremente por tu casa, acostarte en el sofá o cocinar mientras escuchas música en tu teléfono sin estar amarrado a ningún cable.</li>
                <li><span class="icono-ejemplo">${icon('monitor', 16)}</span> <strong>El cable negro atornillado detrás del televisor (Cable Coaxial):</strong> El cable redondo y grueso con un alambre rígido de cobre en el centro y una rosca metálica que se conecta a tu decodificador de televisión por cable o televisión satelital es un cable coaxial.</li>
            </ul>
        `,
        video: "videos/transmicion.mp4"
    },

    /* ======================================
       CABLEADO ESTRUCTURADO
       ====================================== */
    cableado: {
        iconoKey: "plug",
        titulo: "Cableado Estructurado",
        texto: `
            <titulo>Explicación:</titulo>
            <p>
                El cableado estructurado es un método estandarizado e integral para el diseño e instalación de infraestructura de telecomunicaciones en edificios residenciales, comerciales e institucionales. Organiza los cables de red, conectores, tomas de pared y paneles de distribución de forma modular, permitiendo transportar señales de voz, datos, video y seguridad con máxima confiabilidad y facilidad de administración.
            </p>

            <titulo>Normas estándar de terminación (ANSI/TIA/EIA-568):</titulo>
            <p>
                Para garantizar la interoperabilidad universal de los 8 hilos de colores de un cable UTP dentro del conector RJ45, se definen dos códigos de conexión:
            </p>
            <ul>
                <li><strong>Norma T568A:</strong> Orden de los pines (1 al 8): Blanco/Verde, Verde, Blanco/Naranja, Azul, Blanco/Azul, Naranja, Blanco/Marrón, Marrón.</li>
                <li><strong>Norma T568B:</strong> Orden de los pines (1 al 8): Blanco/Naranja, Naranja, Blanco/Verde, Azul, Blanco/Azul, Verde, Blanco/Marrón, Marrón. (Es la norma estándar más extendida y utilizada globalmente).</li>
                <li><strong>Cable Directo (Straight-Through):</strong> Mismo estándar en ambos extremos (por ejemplo, T568B a T568B). Se emplea para conectar dispositivos de diferente tipo (como una PC a un Switch, o un Switch a un Router).</li>
                <li><strong>Cable Cruzado (Crossover):</strong> Un extremo bajo T568A y el otro bajo T568B. Se usaba tradicionalmente para conectar equipos de la misma naturaleza entre sí (como PC a PC o Switch a Switch).</li>
            </ul>

            <titulo>Componentes y herramientas de trabajo:</titulo>
            <ul>
                <li><strong>Componentes del sistema:</strong> Cable UTP (Cat 5e o Cat 6), conectores macho RJ45, jacks modulares hembra de pared, paneles de parcheo (Patch Panels), racks o gabinetes de comunicaciones, organizadores horizontales y canaletas plásticas o metálicas.</li>
                <li><strong>Herramientas profesionales indispensables:</strong>
                    <ul>
                        <li><strong>Pinza Ponchadora (Crimpadora):</strong> Prensa mecánicamente las cuchillas de contacto del conector RJ45 sobre los 8 hilos conductores y fija la funda del cable.</li>
                        <li><strong>Pelacables de red:</strong> Retira con precisión la funda protectora externa del cable UTP sin cortar ni dañar el aislamiento de los hilos internos.</li>
                        <li><strong>Herramienta de impacto (Impact Tool):</strong> Inserta y corta a ras los conductores en los contactos de los jacks de pared y patch panels.</li>
                        <li><strong>Probador de cable (Tester):</strong> Dispositivo electrónico con LEDs que verifica la continuidad hilo por hilo y comprueba si no existen cruces, cortes o cortocircuitos.</li>
                    </ul>
                </li>
            </ul>

            <titulo>Ventajas del cableado estructurado:</titulo>
            <p>
                Garantiza que la red funcione a su velocidad nominal sin interferencias, reduce los costos de mantenimiento a largo plazo, facilita la detección y corrección rápida de fallas y simplifica futuras ampliaciones de la infraestructura.
            </p>

            <titulo>Ejemplos de la vida cotidiana:</titulo>
            <ul class="lista-ejemplos">
                <li><span class="icono-ejemplo">${icon('plug', 16)}</span> <strong>Tomas de red en la pared como los enchufes de luz:</strong> En lugar de tener cables de 15 metros cruzando los pasillos de la casa o la oficina donde la gente tropieza, se golpean con puertas o los muerden las mascotas, el cableado viaja oculto dentro de canaletas en la pared hasta una toma fija (Jack RJ45). Solo conectas un cable corto desde tu mesa a la pared y listo.</li>
                <li><span class="icono-ejemplo">${icon('tool', 16)}</span> <strong>Crear tu propio cable de red a la medida para tu habitación:</strong> Si tu cuarto está en el segundo piso y quieres llevar internet desde el módem del primer piso, compras 20 metros de cable UTP y dos fichas RJ45. Pelas las puntas, ordenas los cables con la norma T568B (Blanco/Naranja, Naranja, Blanco/Verde, Azul...), los introduces en el conector, aprietas con la ponchadora y pruebas con el tester que los 8 bombillos LED alumbren en orden del 1 al 8.</li>
                <li><span class="icono-ejemplo">${icon('server', 16)}</span> <strong>El cuarto de servidores de un hospital o banco (Racks y Patch Panels):</strong> En un hospital con cientos de computadoras de médicos y equipos de rayos X, si los cables estuvieran enredados sin orden y una máquina se desconectara, tardarían horas en encontrar el cable dañado. Con cableado estructurado, cada cable tiene una etiqueta numerada (ej. "Urgencias - Cama 4") conectada al patch panel central, permitiendo reparar cualquier avería en 2 minutos.</li>
            </ul>
        `,
        video: "videos/cableado.mp4"
    }

};

function mostrarTemaRed(tipo) {
    const tema = informacionRedes[tipo];
    if (!tema) {
        navegar("redes");
        return;
    }

    const contenido = document.getElementById("contenido");

    contenido.innerHTML = `
        <section class="redes">

            <div class="redes-detalle">

                <div class="tema-icono">
                    ${icon(tema.iconoKey || 'network', 45)}
                </div>

                <h1>
                    ${tema.titulo}
                </h1>

                <div class="contenido-info">
                    <div>
                        ${tema.texto}
                    </div>
                </div>

                <div class="video-redes">
                    <h2>${icon('video', 24)} Video Explicativo: ${tema.titulo}</h2>

                    <video controls preload="metadata">
                        <source src="${tema.video}" type="video/mp4">
                        Tu navegador no puede reproducir este video.
                    </video>
                </div>

                <div class="redes-acciones-volver">
                    <button class="btn-volver" onclick="volverA('redes')">
                        ${icon('arrow-left', 16)} Volver a Redes
                    </button>
                    <button class="btn-volver btn-accion-siguiente" onclick="navegar('actividades')">
                        ${icon('gamepad', 16)} Poner a prueba en Actividades
                        ${icon('arrow-right', 14)}
                    </button>
                </div>

            </div>

        </section>
    `;
}