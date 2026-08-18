document.addEventListener("DOMContentLoaded", () => {
    
    // Pantalla de Inicio / Landing Intro
    const pantallaInicio = document.getElementById("pantalla-inicio");
    const canvasIntro = document.getElementById('canvas-intro');
    
    const sonidoBoot = new Audio('Sounds/Pantalla-inicio.wav'); 
    sonidoBoot.volume = 0.8;

    if (pantallaInicio) {
        let manejarResizeIntro;

        pantallaInicio.addEventListener("click", () => {
            sonidoBoot.currentTime = 0; 
            sonidoBoot.play().catch(e => console.log(e));

            pantallaInicio.classList.add("oculta");
            
            setTimeout(() => {
                pantallaInicio.remove(); 
                if (manejarResizeIntro) {
                    window.removeEventListener('resize', manejarResizeIntro);
                }
            }, 1000); 
        });

        if (canvasIntro) {
            const ctxIntro = canvasIntro.getContext('2d');
            canvasIntro.width = window.innerWidth;
            canvasIntro.height = window.innerHeight;

            let particulasIntro = [];
            let mouseIntro = { x: null, y: null };

            pantallaInicio.addEventListener('mousemove', (e) => {
                mouseIntro.x = e.clientX;
                mouseIntro.y = e.clientY;
            });

            class NodoIntro {
                constructor() {
                    this.x = Math.random() * canvasIntro.width;
                    this.y = Math.random() * canvasIntro.height;
                    this.size = Math.random() * 1.5 + 1;
                    this.speedX = (Math.random() * 2) - 1;
                    this.speedY = (Math.random() * 2) - 1;
                }
                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;
                    if (this.x > canvasIntro.width || this.x < 0) this.speedX = -this.speedX;
                    if (this.y > canvasIntro.height || this.y < 0) this.speedY = -this.speedY;
                }
                draw() {
                    ctxIntro.fillStyle = 'rgba(56, 189, 248, 0.7)';
                    ctxIntro.beginPath();
                    ctxIntro.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctxIntro.fill();
                }
            }

            function initIntro() {
                particulasIntro = [];
                let cantidad = (canvasIntro.height * canvasIntro.width) / 10000;
                for (let i = 0; i < cantidad; i++) {
                    particulasIntro.push(new NodoIntro());
                }
            }

            function animarIntro() {
                if (!document.getElementById("pantalla-inicio")) return; 
                
                ctxIntro.clearRect(0, 0, canvasIntro.width, canvasIntro.height);
                
                for (let i = 0; i < particulasIntro.length; i++) {
                    particulasIntro[i].update();
                    particulasIntro[i].draw();
                    
                    if (mouseIntro.x != null) {
                        let dxMouse = particulasIntro[i].x - mouseIntro.x;
                        let dyMouse = particulasIntro[i].y - mouseIntro.y;
                        let distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
                        
                        if (distMouse < 150) {
                            ctxIntro.beginPath();
                            ctxIntro.strokeStyle = `rgba(56, 189, 248, ${1 - distMouse/150})`;
                            ctxIntro.lineWidth = 1;
                            ctxIntro.moveTo(particulasIntro[i].x, particulasIntro[i].y);
                            ctxIntro.lineTo(mouseIntro.x, mouseIntro.y);
                            ctxIntro.stroke();
                        }
                    }
                }
                requestAnimationFrame(animarIntro);
            }

            manejarResizeIntro = () => {
                if (canvasIntro && document.getElementById("pantalla-inicio")) {
                    canvasIntro.width = window.innerWidth;
                    canvasIntro.height = window.innerHeight;
                    initIntro();
                }
            };

            window.addEventListener('resize', manejarResizeIntro);

            initIntro();
            animarIntro();
        }
    }
   
    // Linterna de Fondo
    const bgFlashlight = document.getElementById("bg-flashlight");
    
    document.addEventListener("mousemove", (e) => {
        bgFlashlight.style.setProperty("--bg-x", `${e.clientX}px`);
        bgFlashlight.style.setProperty("--bg-y", `${e.clientY}px`);
    });

    // Control de Sonidos
    const sonidoTheme = new Audio('Sounds/Modo.wav');
    sonidoTheme.volume = 1;
    const sonidoSubir = new Audio('Sounds/Subida.wav');
    sonidoSubir.volume = 0.5;

    const btnMute = document.getElementById("btn-mute");
    const iconoMute = btnMute.querySelector("i");
    
    let isMuted = localStorage.getItem("portfolio_muted") === "true";
    if (isMuted) {
        iconoMute.classList.replace("fa-volume-up", "fa-volume-mute");
    }

    btnMute.addEventListener("click", () => {
        // Se eliminó la reproducción del sonidoBotonMute aquí
        isMuted = !isMuted;
        localStorage.setItem("portfolio_muted", isMuted); 
        
        if (isMuted) {
            iconoMute.classList.replace("fa-volume-up", "fa-volume-mute");
        } else {
            iconoMute.classList.replace("fa-volume-mute", "fa-volume-up");
        }
    });

    // Cambio de Tema (Oscuro / Claro)
    const btnTheme = document.getElementById("btn-theme");
    const iconoTheme = btnTheme.querySelector("i");
    
    const temaGuardado = localStorage.getItem("tema_portfolio");
    if (temaGuardado === "claro") {
        document.body.classList.add("modo-claro");
        iconoTheme.classList.replace("fa-sun", "fa-moon");
    }

    btnTheme.addEventListener("click", () => {
        if (!isMuted) {
            sonidoTheme.currentTime = 0.2; 
            sonidoTheme.play().catch(error => {
                console.log("Audio a la espera de interacción del usuario.", error);
            });
        }

        document.body.classList.toggle("modo-claro");
        const esModoClaro = document.body.classList.contains("modo-claro");
        
        if (esModoClaro) {
            iconoTheme.classList.replace("fa-sun", "fa-moon");
            localStorage.setItem("tema_portfolio", "claro");
        } else {
            iconoTheme.classList.replace("fa-moon", "fa-sun");
            localStorage.setItem("tema_portfolio", "oscuro");
        }
    });

    // Efecto de Tipeo en el Nombre
    const textoNombre = "Javier Costa";
    const contenedorNombre = document.getElementById("nombre-tipeo");
    let i = 0;

    function escribirTexto() {
        if (i < textoNombre.length) {
            contenedorNombre.textContent += textoNombre.charAt(i);
            i++;
            setTimeout(escribirTexto, 120);
        }
    }

    escribirTexto();

    // Navegación Activa según el Scroll
    const secciones = document.querySelectorAll('.seccion-bloque');
    const navLinks = document.querySelectorAll('.nav-fija .nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const idActual = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('activo-link');
                    if (link.getAttribute('href') === `#${idActual}`) {
                        link.classList.add('activo-link');
                    }
                });
            }
        });
    }, observerOptions);

    secciones.forEach(seccion => observer.observe(seccion));

    // Posición del Cursor dentro de las Tarjetas Horizontales
    const cards = document.querySelectorAll('.card-proyecto-horizontal');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Botón Volver Arriba
    const btnSubir = document.getElementById("btn-subir");

    if (btnSubir) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                btnSubir.classList.add("activo");
            } else {
                btnSubir.classList.remove("activo");
            }
        });

        btnSubir.addEventListener("click", () => {
            if (!isMuted) {
                sonidoSubir.currentTime = 0.1; 
                sonidoSubir.play().catch(error => {
                    console.log("Audio a la espera de interacción del usuario.", error);
                });
            }

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

});

// Red de Nodos en Fondo (Canvas Secundario)
const canvasNodos = document.getElementById('canvas-fondo');
if (canvasNodos) {
    const ctx = canvasNodos.getContext('2d');
    canvasNodos.width = window.innerWidth;
    canvasNodos.height = window.innerHeight;

    let particulasArray = [];

    function obtenerColorActual() {
        const isClaro = document.body.classList.contains("modo-claro");
        return {
            r: isClaro ? 14  : 56,   
            g: isClaro ? 116 : 189,
            b: isClaro ? 144 : 248,
            opacidadNodo: 1 
        };
    }

    class ParticulaNodo {
        constructor() {
            this.x = Math.random() * canvasNodos.width;
            this.y = Math.random() * canvasNodos.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() * 1) - 0.5;
            this.speedY = (Math.random() * 1) - 0.5;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvasNodos.width || this.x < 0) this.speedX = -this.speedX;
            if (this.y > canvasNodos.height || this.y < 0) this.speedY = -this.speedY;
        }
        draw() {
            const color = obtenerColorActual();
            ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.opacidadNodo})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initNodos() {
        particulasArray = [];
        let numeroParticulas = (canvasNodos.height * canvasNodos.width) / 12000;
        for (let i = 0; i < numeroParticulas; i++) {
            particulasArray.push(new ParticulaNodo());
        }
    }

    function animarNodos() {
        ctx.clearRect(0, 0, canvasNodos.width, canvasNodos.height);
        const color = obtenerColorActual();
        
        for (let i = 0; i < particulasArray.length; i++) {
            particulasArray[i].update();
            particulasArray[i].draw();
            
            for (let j = i; j < particulasArray.length; j++) {
                let dx = particulasArray[i].x - particulasArray[j].x;
                let dy = particulasArray[i].y - particulasArray[j].y;
                let distancia = Math.sqrt(dx * dx + dy * dy);
                
                if (distancia < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${1 - distancia/120})`; 
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particulasArray[i].x, particulasArray[i].y);
                    ctx.lineTo(particulasArray[j].x, particulasArray[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animarNodos);
    }

    window.addEventListener('resize', () => {
        canvasNodos.width = window.innerWidth;
        canvasNodos.height = window.innerHeight;
        initNodos();
    });

    initNodos();
    animarNodos();
}
