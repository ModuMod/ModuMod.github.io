document.addEventListener("DOMContentLoaded", () => {
    
    const bgFlashlight = document.getElementById("bg-flashlight");
    
    document.addEventListener("mousemove", (e) => {
        bgFlashlight.style.setProperty("--bg-x", `${e.clientX}px`);
        bgFlashlight.style.setProperty("--bg-y", `${e.clientY}px`);
    });

    const btnTheme = document.getElementById("btn-theme");
    const iconoTheme = btnTheme.querySelector("i");
    const sonidoTheme = new Audio('Sounds/click.wav');
    sonidoTheme.volume = 0.2;
    
    const temaGuardado = localStorage.getItem("tema_portfolio");
    if (temaGuardado === "claro") {
        document.body.classList.add("modo-claro");
        iconoTheme.classList.replace("fa-sun", "fa-moon");
    }

    btnTheme.addEventListener("click", () => {
        sonidoTheme.currentTime = 0;
        sonidoTheme.play().catch(error => {
            console.log("Audio a la espera de interacción del usuario.", error);
        });

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

    const cards = document.querySelectorAll('.card-proyecto-moderna');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    const btnSubir = document.getElementById("btn-subir");
    const sonidoSubir = new Audio('Sounds/click1.wav');
    sonidoSubir.volume = 0.2;

    if (btnSubir) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                btnSubir.classList.add("activo");
            } else {
                btnSubir.classList.remove("activo");
            }
        });

        btnSubir.addEventListener("click", () => {
            sonidoSubir.currentTime = 0;
            sonidoSubir.play().catch(error => {
                console.log("Audio a la espera de interacción del usuario.", error);
            });

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

});
