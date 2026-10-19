/* =======================================================
   SEGURIDAD INFORMÁTICA & CIBERDEFENSA (MESH)
   Sin emojis - Con iconos vectoriales React-Icons
   y soporte total para navegación SPA y botón Atrás.
   ======================================================= */

function crearSeguridad() {
    const contenido = document.getElementById("contenido");
    if (!contenido) return;

    contenido.innerHTML = `
        <section class="seguridad">

            <div class="seguridad-intro">
                <span class="seccion-etiqueta">${icon('shield-check', 16)} Ciberdefensa y Privacidad</span>
                <h1>Seguridad Informática</h1>
                <p>
                    Conoce las principales amenazas del entorno digital, comprende cómo operan 
                    los ciberdelincuentes y domina las estrategias defensivas para blindar tus dispositivos, 
                    proteger tus datos personales y navegar con total tranquilidad.
                </p>
            </div>

            <div class="riesgos">

                <!-- CIBERACOSO -->
                <article class="riesgo">
                    <div>
                        <div class="riesgo-icono">
                            ${icon('shield-check', 36)}
                        </div>
                        <h2>Ciberacoso</h2>
                        <p>
                            Aprende qué es el ciberacoso escolar, cómo detectarlo a tiempo en redes sociales 
                            y videojuegos, y qué acciones legales y preventivas tomar para detenerlo.
                        </p>
                    </div>
                    <button onclick="navegar('seguridad/ciberacoso')">
                        ${icon('book-open', 15)} Aprender más
                        ${icon('arrow-right', 13)}
                    </button>
                </article>

                <!-- ESTAFAS -->
                <article class="riesgo">
                    <div>
                        <div class="riesgo-icono">
                            ${icon('alert-triangle', 36)}
                        </div>
                        <h2>Estafas en línea</h2>
                        <p>
                            Identifica trampas de phishing, mensajes fraudulentos de WhatsApp y SMS, 
                            sorteos engañosos y tiendas falsas diseñadas para robar tu dinero y cuentas.
                        </p>
                    </div>
                    <button onclick="navegar('seguridad/estafas')">
                        ${icon('book-open', 15)} Aprender más
                        ${icon('arrow-right', 13)}
                    </button>
                </article>

                <!-- ROBO DE INFORMACIÓN -->
                <article class="riesgo">
                    <div>
                        <div class="riesgo-icono">
                            ${icon('lock', 36)}
                        </div>
                        <h2>Robo de información</h2>
                        <p>
                            Descubre cómo los troyanos, keyloggers y redes Wi-Fi públicas inseguras 
                            capturan tus contraseñas privadas, y cómo aplicar el doble factor (2FA).
                        </p>
                    </div>
                    <button onclick="navegar('seguridad/informacion')">
                        ${icon('book-open', 15)} Aprender más
                        ${icon('arrow-right', 13)}
                    </button>
                </article>

                <!-- GROOMING -->
                <article class="riesgo">
                    <div>
                        <div class="riesgo-icono">
                            ${icon('user-x', 36)}
                        </div>
                        <h2>Grooming</h2>
                        <p>
                            Reconoce tácticas manipuladoras de adultos que ocultan su identidad en chats 
                            y juegos en línea, aprende a detectar las señales de alerta y cómo actuar.
                        </p>
                    </div>
                    <button onclick="navegar('seguridad/grooming')">
                        ${icon('book-open', 15)} Aprender más
                        ${icon('arrow-right', 13)}
                    </button>
                </article>

                <!-- ROBO DE IDENTIDAD -->
                <article class="riesgo">
                    <div>
                        <div class="riesgo-icono">
                            ${icon('user', 36)}
                        </div>
                        <h2>Robo de identidad</h2>
                        <p>
                            Aprende a prevenir la clonación de perfiles en Instagram y Facebook, 
                            el secuestro de cuentas de WhatsApp y el uso fraudulento de tus documentos.
                        </p>
                    </div>
                    <button onclick="navegar('seguridad/identidad')">
                        ${icon('book-open', 15)} Aprender más
                        ${icon('arrow-right', 13)}
                    </button>
                </article>

            </div>

        </section>
    `;
}

/* =======================================================
   CONTENIDOS EDUCATIVOS DETALLADOS DE SEGURIDAD
   ======================================================= */

const informacionRiesgos = {

    /* ======================================
       CIBERACOSO (CYBERBULLYING)
       ====================================== */
    ciberacoso: {
        iconoKey: "shield-check",
        titulo: "Ciberacoso (Cyberbullying)",
        texto: `
            <titulo>Explicación:</titulo>
            <p>
                El ciberacoso es una forma de violencia psicológica e intimidación sostenida que se ejecuta 
                a través de canales digitales como redes sociales (Instagram, TikTok, X), servicios de mensajería instantánea 
                (WhatsApp, Telegram, Discord) o chats de videojuegos en línea (Roblox, Free Fire, Fortnite). 
                Consiste en el uso deliberado de la tecnología para herir, humillar, avergonzar, amenazar o excluir 
                a una persona de forma reiterada.
            </p>

            <titulo>Manifestaciones y conductas más comunes:</titulo>
            <ul>
                <li><strong>Exclusión digital deliberada:</strong> Expulsar o ignorar a un compañero de grupos de WhatsApp de la clase o de servidores de Discord para aislarlo socialmente y hacerle sentir rechazado.</li>
                <li><strong>Creación y viralización de stickers denigrantes:</strong> Tomar fotos o capturas de video sin autorización para editarlas con textos burlones, apodos hirientes o mensajes humillantes.</li>
                <li><strong>Doxing (Revelación de información privada):</strong> Publicar en foros o redes el número de teléfono, dirección de residencia, colegio o secretos privados de la víctima para promover ataques masivos.</li>
                <li><strong>Flaming y toxicidad en salas de juego:</strong> Insultos sistemáticos, sabotaje intencional de partidas y amenazas continuas por el chat de voz o texto hacia un jugador específico.</li>
                <li><strong>Páginas anónimas de confesiones y chismes:</strong> Cuentas creadas para lanzar calumnias, difamar o hacer encuestas degradantes sobre compañeros de clase.</li>
            </ul>

            <titulo>Consecuencias e impacto real:</titulo>
            <p>
                A diferencia del acoso tradicional en el patio escolar, el ciberacoso no se detiene al salir de clases: 
                sigue a la víctima a su hogar a través de la pantalla las 24 horas del día. La información en internet 
                se propaga a miles de personas en segundos y deja una <strong>huella digital imborrable</strong>. 
                Esto puede provocar ansiedad severa, aislamiento social, baja en el rendimiento escolar e incluso depresión. 
                Los espectadores que comparten, dan "me gusta" o se ríen de las agresiones también son corresponsables del daño.
            </p>

            <titulo>Protocolo de acción y defensa paso a paso:</titulo>
            <ul>
                <li><strong>No respondas con violencia ni insultos:</strong> Los acosadores buscan provocar una reacción emocional para alimentar el conflicto. Cortar el intercambio les quita poder.</li>
                <li><strong>Recolecta y preserva evidencia:</strong> Toma capturas de pantalla completas donde se aprecie claramente el número de teléfono, nombre de usuario, fecha, hora y el contenido de los mensajes antes de que sean eliminados.</li>
                <li><strong>Bloquea y reporta en la plataforma:</strong> Usa las herramientas de reporte nativas de WhatsApp, Discord, TikTok e Instagram para que los moderadores suspendan las cuentas agresoras.</li>
                <li><strong>Acude de inmediato a un adulto de confianza:</strong> Notifica la situación a tus padres, profesores u orientadores. En Colombia y a nivel internacional, el acoso escolar digital cuenta con protocolos de convivencia escolar de obligatorio cumplimiento y sanciones legales.</li>
            </ul>

            <titulo>Ejemplos de la vida cotidiana:</titulo>
            <ul class="lista-ejemplos">
                <li><span class="icono-ejemplo">${icon('smartphone', 16)}</span> <strong>Stickers no autorizados en el grupo del colegio:</strong> Varios estudiantes toman una foto de un compañero cuando se equivoca al responder en clase, le crean un sticker burlón y lo mandan repetidamente al grupo de WhatsApp cada vez que la persona escribe, impidiéndole participar.</li>
                <li><span class="icono-ejemplo">${icon('gamepad', 16)}</span> <strong>Acoso coordinado en Discord y salas de juego:</strong> Un grupo de jugadores en una partida clasificatoria abre el micrófono para insultar continuamente a un integrante, expulsarlo de la sala y luego llenar sus redes sociales con comentarios tóxicos para que deje de jugar.</li>
                <li><span class="icono-ejemplo">${icon('user-x', 16)}</span> <strong>Cuentas anónimas de "chismes escolares" en Instagram:</strong> Alguien crea un perfil falso bajo el nombre "Secretos del Colegio", sube historias falsas acusando a compañeros de situaciones comprometedoras y pide a los demás que voten o envíen más rumores en secreto.</li>
            </ul>
        `,
        video: "videos/ciberacoso.mp4"
    },

    /* ======================================
       ESTAFAS EN LÍNEA & PHISHING
       ====================================== */
    estafas: {
        iconoKey: "alert-triangle",
        titulo: "Estafas en Línea y Phishing",
        texto: `
            <titulo>Explicación:</titulo>
            <p>
                Una estafa en línea es cualquier engaño sistemático efectuado en medios digitales para manipular 
                psicológicamente a los usuarios y lograr que entreguen dinero, información confidencial, contraseñas 
                o datos bancarios. La técnica más frecuente es el <strong>Phishing (pesca digital)</strong>, en la cual 
                los atacantes suplantan la identidad de empresas confiables, marcas populares o autoridades oficiales 
                aprovechándose de la urgencia, el miedo o la codicia de la víctima.
            </p>

            <titulo>Principales modalidades de engaño digital:</titulo>
            <ul>
                <li><strong>Phishing por correo electrónico:</strong> Mensajes alarmistas que simulan provenir de Netflix, bancos, plataformas escolares o Google, advirtiendo sobre un supuesto bloqueo de cuenta si no haces clic en un enlace de verificación inmediato.</li>
                <li><strong>Smishing (Phishing vía SMS):</strong> Mensajes de texto que aseguran tener un paquete de compras retenido en la aduana, un cobro pendiente de mensajería o una infracción de tránsito inexistente con un enlace fraudulento para pagar.</li>
                <li><strong>Falsos generadores de monedas en videojuegos:</strong> Páginas que prometen "Generadores de Robux", "Pavos de Fortnite gratis" o "Diamantes de Free Fire" a cambio de iniciar sesión con tus credenciales de juego.</li>
                <li><strong>Tiendas virtuales fraudulentas:</strong> Perfiles en Instagram o páginas web que ofrecen consolas, tenis o smartphones con descuentos sospechosos del 80% y exigen pagos inmediatos mediante transferencias bancarias no reembolsables.</li>
                <li><strong>El falso familiar en apuros:</strong> Mensajes por WhatsApp desde números desconocidos que dicen: "Hola primo, cambié de número, se me averió el carro y necesito que me transfieras dinero urgente".</li>
            </ul>

            <titulo>Señales de alerta indispensables (Red Flags):</titulo>
            <p>
                Aprender a detectar las trampas es la mejor defensa. Desconfía siempre cuando se presenten:
            </p>
            <ul>
                <li><strong>Urgencia desmedida:</strong> Frases como "¡Tienes 15 minutos o tu cuenta será eliminada permanentemente!".</li>
                <li><strong>Direcciones web dudosas (URLs falsas):</strong> Dominios engañosos como <code>netflix-login-soporte.xyz</code> en lugar del sitio oficial <code>netflix.com</code>.</li>
                <li><strong>Solicitud de códigos de un solo uso (OTP):</strong> Ningún banco ni empresa seria te pedirá por chat los 6 dígitos que te llegan por SMS.</li>
                <li><strong>Precios ridículamente económicos o premios sin haber participado:</strong> Recuerda la regla de oro: si suena demasiado bueno para ser verdad, es una estafa.</li>
            </ul>

            <titulo>Medidas de prevención y ciberhigiene:</titulo>
            <ul>
                <li><strong>Escribe la dirección web manualmente:</strong> Jamás ingreses a tus cuentas haciendo clic en enlaces recibidos por mensaje o correo; abre el navegador y escribe la URL tú mismo.</li>
                <li><strong>Verifica el candado de seguridad y el dominio exacto:</strong> Revisa minuciosamente cómo está escrito el nombre de la página antes de escribir contraseñas.</li>
                <li><strong>Confirma por llamada telefónica:</strong> Si un amigo o familiar te escribe pidiendo dinero prestado por una emergencia, llámalo directamente por teléfono tradicional para verificar que sea él.</li>
            </ul>

            <titulo>Ejemplos de la vida cotidiana:</titulo>
            <ul class="lista-ejemplos">
                <li><span class="icono-ejemplo">${icon('dollar', 16)}</span> <strong>El sorteo de Pavos / Robux en YouTube y Discord:</strong> Un video muestra supuestos trucos para obtener monedas virtuales gratis. Al abrir el enlace, te pide ingresar tu usuario y contraseña de Roblox o Epic Games; tan pronto los escribes, los estafadores cambian el correo de recuperación y roban tu cuenta.</li>
                <li><span class="icono-ejemplo">${icon('alert-triangle', 16)}</span> <strong>El falso paquete retenido por SMS:</strong> Te llega un mensaje al celular diciendo: "Su paquete número CO-48201 tiene un problema de dirección, ingrese aquí para pagar $1.500 de flete y reprogramar entrega". Al hacer clic, abres una página clonada que roba los datos de tu tarjeta de crédito.</li>
                <li><span class="icono-ejemplo">${icon('lock', 16)}</span> <strong>La alerta falsa de infracción en Instagram:</strong> Recibes un mensaje directo de una cuenta llamada "Soporte Oficial Meta" que dice que infringiste derechos de autor en una publicación y que debes apelar en un formulario en línea; si pones tus datos, pierdes el acceso a tu perfil.</li>
            </ul>
        `,
        video: "videos/estafas.mp4"
    },

    /* ======================================
       ROBO DE INFORMACIÓN Y MALWARE
       ====================================== */
    informacion: {
        iconoKey: "lock",
        titulo: "Robo de Información y Malware",
        texto: `
            <titulo>Explicación:</titulo>
            <p>
                El robo de información digital ocurre cuando ciberdelincuentes o software no autorizado acceden, 
                copian o secuestran archivos personales, fotografías privadas, credenciales de inicio de sesión, 
                historiales de navegación o datos financieros sin el consentimiento del usuario. La principal vía de 
                infección es el <strong>Malware (software malicioso)</strong>, programas diseñados para operar en segundo 
                plano de forma oculta en computadoras y teléfonos inteligentes.
            </p>

            <titulo>Principales tipos de malware y amenazas:</titulo>
            <ul>
                <li><strong>Keyloggers (Registradores de teclado):</strong> Programas espía que graban en silencio cada tecla pulsada en la computadora o celular, capturando usuarios, contraseñas y números de tarjetas para enviárselos al atacante.</li>
                <li><strong>Troyanos y Cracks/Mods modificados:</strong> Archivos que simulan ser un juego completo, un parche de activación de Windows o un mod de Minecraft, pero que en secreto instalan puertas traseras (Backdoors) para controlar el dispositivo.</li>
                <li><strong>Infostealers y Spyware:</strong> Programas especializados en extraer las contraseñas guardadas en Google Chrome, las cookies de sesión activa y los historiales de búsqueda.</li>
                <li><strong>Ransomware (Secuestro de datos):</strong> Malware que bloquea y cifra todos los documentos, tareas y fotografías del disco duro, exigiendo un rescate monetario en criptomonedas para liberarlos.</li>
                <li><strong>Redes Wi-Fi públicas inseguras (Man-in-the-Middle):</strong> Conectarse a redes inalámbricas abiertas sin contraseña en cafeterías o parques permite que un atacante intercepte el tráfico de datos transmitido entre tu celular y los servidores web.</li>
            </ul>

            <titulo>Riesgos y consecuencias de la filtración:</titulo>
            <p>
                Las contraseñas robadas se compilan en bases de datos masivas que se venden o filtran en foros clandestinos 
                de la <strong>Dark Web</strong>. Los atacantes utilizan herramientas automáticas para probar esas mismas credenciales 
                en decenas de plataformas distintas (ataque de <em>Credential Stuffing</em>). Si utilizas la misma contraseña para todo, 
                la caída de una sola cuenta compromete toda tu vida digital.
            </p>

            <titulo>Estrategias de blindaje y prevención:</titulo>
            <ul>
                <li><strong>Descarga únicamente de repositorios oficiales:</strong> Evita enlaces de descarga de Mega, Mediafire o servidores de Discord que ofrezcan programas comerciales pirateados o mods sin verificar.</li>
                <li><strong>Activa la Autenticación de Dos Factores (2FA):</strong> Usar aplicaciones como Google Authenticator o Microsoft Authenticator añade una capa impenetrable: aunque conozcan tu contraseña, no podrán entrar sin el código temporal generado en tu teléfono.</li>
                <li><strong>Mantén el sistema operativo y navegador actualizados:</strong> Las actualizaciones corrigen parches y agujeros de seguridad críticos que el malware aprovecha para infiltrarse.</li>
                <li><strong>Aplica la regla de copias de seguridad 3-2-1:</strong> Ten 3 copias de tus archivos importantes, en 2 formatos o soportes distintos (disco externo y nube), con 1 copia guardada fuera de tu equipo habitual.</li>
            </ul>

            <titulo>Ejemplos de la vida cotidiana:</titulo>
            <ul class="lista-ejemplos">
                <li><span class="icono-ejemplo">${icon('cpu', 16)}</span> <strong>El mod o activador con troyano oculto:</strong> Un usuario busca en internet un activador gratuito de Office o un hack para tener ventaja en un videojuego. Al ejecutar el archivo <code>setup.exe</code>, el programa no abre nada, pero en segundo plano instala un infostealer que roba todas las cuentas guardadas en el navegador en menos de 10 segundos.</li>
                <li><span class="icono-ejemplo">${icon('wifi', 16)}</span> <strong>Conexión al Wi-Fi gratis del centro comercial:</strong> Mientras esperas en una plazoleta de comidas, te conectas a una red abierta llamada "Wi-Fi_Gratis_Mall". Un ciberdelincuente conectado a la misma red utiliza un analizador de paquetes para interceptar información enviada por aplicaciones sin cifrar.</li>
                <li><span class="icono-ejemplo">${icon('key', 16)}</span> <strong>Reutilizar la misma clave sencilla en todas las plataformas:</strong> Un estudiante usa <code>micolegio2024*</code> para su correo, Instagram, Steam y cuenta bancaria. Un sitio web menor de foros sufre una filtración y los atacantes usan esa misma combinación para acceder inmediatamente a su correo principal y cambiar todas sus contraseñas.</li>
            </ul>
        `,
        video: "videos/informacion.mp4"
    },

    /* ======================================
       GROOMING
       ====================================== */
    grooming: {
        iconoKey: "user-x",
        titulo: "Grooming (Acoso y Manipulación Digital)",
        texto: `
            <titulo>Explicación:</titulo>
            <p>
                El grooming es un delito grave consistente en una serie de acciones deliberadas y progresivas 
                de manipulación psicológica en las que un adulto oculta su verdadera identidad —haciéndose pasar 
                por un joven, adolescente o amigo comprensivo— para ganarse la confianza, afecto y empatía de un menor 
                de edad a través de canales digitales, con el objetivo de obtener material íntimo o cometer abuso y extorsión sexual.
            </p>

            <titulo>Las 4 fases típicas del proceso de Grooming:</titulo>
            <ul>
                <li><strong>1. Fase de Enganche y Amistad:</strong> El adulto ingresa a plataformas frecuentadas por jóvenes (Roblox, Discord, Free Fire, TikTok). Inicia conversaciones con halagos constantes, regalos de ítems virtuales, membresías o ayuda en juegos para crear un vínculo de simpatía.</li>
                <li><strong>2. Fase de Aislamiento y Secreto:</strong> Intenta convencer al menor de que sus padres o profesores "no lo comprenden de verdad". Solicita mudar la conversación a canales privados o aplicaciones de mensajes efímeros (Telegram, Snapchat) y exige mantener su amistad en secreto absoluto.</li>
                <li><strong>3. Fase de Solicitud de Contenido Íntimo:</strong> Introduce temas sexuales de forma gradual, normalizándolos y pidiendo fotografías, videos o encender la cámara web como supuesta "prueba de cariño, confianza o lealtad".</li>
                <li><strong>4. Fase de Chantaje y Coerción (Sextorsión):</strong> Una vez conseguida una sola fotografía comprometedora, la actitud cariñosa desaparece de golpe y se transforma en amenazas de enviar el material a sus padres, amigos o colegio si no accede a enviar más contenido o dinero.</li>
            </ul>

            <titulo>Banderas rojas y señales de alerta:</titulo>
            <p>
                Debes ponerte en alerta máxima ante cualquier contacto en internet que:
            </p>
            <ul>
                <li>Te pida guardar secretos frente a tu familia o amigos sobre sus conversaciones.</li>
                <li>Te regale skins, pases de batalla o dinero digital sin conocerte en persona.</li>
                <li>Insista en realizar videollamadas a solas en tu habitación con la luz apagada.</li>
                <li>Te haga sentir incómodo, culpable o amenace con hacerte daño emocional si dejas de responderle.</li>
            </ul>

            <titulo>Protocolo de protección y denuncia:</titulo>
            <ul>
                <li><strong>El menor de edad NUNCA tiene la culpa:</strong> Los adultos que realizan grooming son manipuladores expertos que se aprovechan de la confianza y buena fe. Si te encuentras en una situación así, no sientas miedo ni vergüenza: busca ayuda de inmediato.</li>
                <li><strong>No borres las conversaciones ni los chats:</strong> Los mensajes, audios y nombres de usuario constituyen la evidencia forense primordial para que las autoridades policiales rastreen la dirección IP del agresor.</li>
                <li><strong>Corta toda comunicación inmediatamente:</strong> Nunca cedas ante las amenazas ni envíes más fotos: ceder nunca detiene a un acosador, solo aumenta sus exigencias.</li>
                <li><strong>Comunícate con las líneas de ayuda oficiales:</strong> En Colombia puedes denunciar de forma anónima y segura ante el <strong>CAI Virtual de la Policía Nacional</strong> (ccp.policia.gov.co), la línea 106 del ICBF o la plataforma <em>Te Protejo</em> (teprotejo.org).</li>
            </ul>

            <titulo>Ejemplos de la vida cotidiana:</titulo>
            <ul class="lista-ejemplos">
                <li><span class="icono-ejemplo">${icon('headphones', 16)}</span> <strong>El "amigo" del servidor de Discord que regala Nitro:</strong> Un usuario desconocido en un servidor de videojuegos se muestra sumamente atento, te regala meses de Nitro y te pide que hablen por privado todas las noches. Poco a poco empieza a hacer preguntas sobre cómo te vistes y pide fotos personales a cambio de más regalos.</li>
                <li><span class="icono-ejemplo">${icon('user-x', 16)}</span> <strong>El falso reclutador de modelos juveniles en Instagram:</strong> Una cuenta con fotos profesionales contacta a una joven diciendo que tiene el perfil perfecto para una marca juvenil de ropa, pero que para la selección debe mandar fotos privadas en traje de baño sin avisar a sus padres para "no perder la oportunidad".</li>
                <li><span class="icono-ejemplo">${icon('alert-triangle', 16)}</span> <strong>La amenaza de difundir capturas manipuladas:</strong> Un usuario en una sala de chat grupal guarda una foto casual de tu perfil y te escribe diciendo que si no haces una videollamada con él, editará la foto para que parezca comprometedora y la mandará a los directivos de tu colegio.</li>
            </ul>
        `,
        video: "videos/grooming.mp4"
    },

    /* ======================================
       ROBO DE IDENTIDAD DIGITAL
       ====================================== */
    identidad: {
        iconoKey: "user",
        titulo: "Robo de Identidad Digital y Suplantación",
        texto: `
            <titulo>Explicación:</titulo>
            <p>
                El robo o suplantación de identidad digital ocurre cuando un tercero no autorizado se apropia ilícitamente 
                de los datos personales de un usuario (fotografías, nombre completo, número de documento de identidad, 
                perfiles en redes sociales o cuentas de mensajería) para hacerse pasar por él frente a amigos, familiares, 
                instituciones educativas o plataformas comerciales, actuando en su nombre sin su consentimiento.
            </p>

            <titulo>Modalidades más frecuentes de suplantación:</titulo>
            <ul>
                <li><strong>Secuestro de cuentas de WhatsApp:</strong> Mediante engaños telefónicos o mensajes urgentes, los ciberdelincuentes logran que la víctima les lea el código de 6 dígitos que llega por SMS al intentar registrar su número en otro dispositivo. Al tomar el control, escriben a todos sus contactos pidiendo dinero prestado por supuestas emergencias.</li>
                <li><strong>Clonación de perfiles en Instagram y TikTok:</strong> Descargan las fotos públicas de una persona, abren una cuenta con un nombre casi idéntico (agregando un punto o una letra extra) y envían solicitudes de amistad a todos sus seguidores para enviar enlaces con malware o pedir favores económicos.</li>
                <li><strong>Uso no autorizado de documentos de identidad:</strong> Fotografías de la cédula o tarjeta de identidad compartidas sin precaución son utilizadas para abrir líneas telefónicas pospago fraudulentas, solicitar créditos o cometer estafas en línea a nombre de la víctima.</li>
                <li><strong>Suplantación mediante inteligencia artificial (Deepfakes):</strong> Uso de herramientas de IA para clonar la voz de un familiar a partir de videos públicos y llamar a sus padres diciendo que se encuentra en una situación de peligro para exigir dinero.</li>
            </ul>

            <titulo>Impacto y perjuicios para la víctima:</titulo>
            <p>
                La suplantación puede generar graves pérdidas económicas a seres queridos que caen en el engaño, 
                dañar profundamente la reputación y relaciones personales si el impostor emite mensajes insultantes 
                o discriminatorios, y acarrear problemas legales serios si se realizan transacciones ilícitas 
                utilizando tus documentos oficiales.
            </p>

            <titulo>Medidas de protección y blindaje de identidad:</titulo>
            <ul>
                <li><strong>Activa el PIN de verificación en dos pasos en WhatsApp:</strong> En Ajustes > Cuenta > Verificación en dos pasos. Nadie podrá transferir tu número a otro celular sin ese código numérico secreto.</li>
                <li><strong>Configura tus redes sociales en modo privado:</strong> Evita que desconocidos puedan descargar tus fotos familiares, saber a qué colegio asistes o conocer los lugares que visitas habitualmente.</li>
                <li><strong>Nunca compartas fotos de documentos oficiales por chats abiertos:</strong> Si es indispensable enviar una copia para un trámite escolar, agrégale una marca de agua diagonal semitransparente con texto que diga "Copia exclusiva para matrícula escolar 2024".</li>
                <li><strong>Denuncia perfiles duplicados de inmediato:</strong> Alerta a tus conocidos a través de otros medios y usa la función de reporte "Denunciar > Se hace pasar por mí o por alguien que conozco" en la red social.</li>
            </ul>

            <titulo>Ejemplos de la vida cotidiana:</titulo>
            <ul class="lista-ejemplos">
                <li><span class="icono-ejemplo">${icon('smartphone', 16)}</span> <strong>El engaño del código de 6 dígitos de WhatsApp:</strong> Recibes una llamada de alguien que dice ser del soporte de la empresa telefónica avisando que tu línea será suspendida a menos que le confirmes un código que acaba de llegarte por SMS. Si se lo das, pierdes tu WhatsApp al instante y tus contactos reciben solicitudes de préstamos de dinero.</li>
                <li><span class="icono-ejemplo">${icon('dollar', 16)}</span> <strong>El perfil clonado en Instagram para pedir transferencias:</strong> Un desconocido descarga tus fotos, crea la cuenta <code>@tu_nombre_oficial1</code> y escribe a tus compañeros de salón diciendo: "Hola, cambié de cuenta porque la otra se me bloqueó; estoy en una clínica con mi mamá y no me pasa la tarjeta, ¿me transfieres $20.000 y te los pago mañana?".</li>
                <li><span class="icono-ejemplo">${icon('user', 16)}</span> <strong>El perfil falso para crear discordia en la escuela:</strong> Un agresor anónimo crea una cuenta con tu nombre y foto de perfil, agrega a tus profesores y compañeros, y comienza a publicar comentarios groseros y ofensivos para causarte sanciones disciplinarias en el colegio.</li>
            </ul>
        `,
        video: "videos/identidad.mp4"
    }

};

/* =======================================================
   MOSTRAR VISTA DETALLADA DEL RIESGO / TEMA
   ======================================================= */

function mostrarRiesgo(tipo) {
    const riesgo = informacionRiesgos[tipo];
    if (!riesgo) {
        navegar("seguridad");
        return;
    }

    const contenido = document.getElementById("contenido");
    if (!contenido) return;

    contenido.innerHTML = `
        <section class="seguridad">

            <div class="seguridad-detalle">

                <div class="riesgo-icono">
                    ${icon(riesgo.iconoKey || 'shield-check', 45)}
                </div>

                <h1>
                    ${riesgo.titulo}
                </h1>

                <div class="contenido-info">
                    <div>
                        ${riesgo.texto}
                    </div>
                </div>

                <!-- VIDEO EDUCATIVO -->
                <div class="video-seguridad">
                    <h2>
                        ${icon('video', 24)} Video Explicativo: ${riesgo.titulo}
                    </h2>

                    <video controls preload="metadata">
                        <source src="${riesgo.video}" type="video/mp4">
                        Tu navegador no puede reproducir este video.
                    </video>
                </div>

                <!-- BOTONES DE RETORNO Y AVANCE -->
                <div class="seguridad-acciones-volver">
                    <button class="btn-volver" onclick="volverA('seguridad')">
                        ${icon('arrow-left', 16)} Volver a Seguridad
                    </button>
                    <button class="btn-volver btn-accion-siguiente" onclick="navegar('actividades/seguridad')">
                        ${icon('gamepad', 16)} Poner a prueba en Actividades
                        ${icon('arrow-right', 14)}
                    </button>
                </div>

            </div>

        </section>
    `;
}