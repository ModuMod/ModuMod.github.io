document.addEventListener("DOMContentLoaded", () => {
    // 1. Menú Hamburguesa
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('activo');
            const icono = menuToggle.querySelector('i');
            if(navMenu.classList.contains('activo')) {
                icono.classList.remove('fa-bars');
                icono.classList.add('fa-times');
            } else {
                icono.classList.remove('fa-times');
                icono.classList.add('fa-bars');
            }
        });
    }

    // 2. Barra de Progreso global
    const barraProgreso = document.getElementById('barra-progreso');
    if (barraProgreso) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const porcentaje = (scrollTop / scrollHeight) * 100;
            barraProgreso.style.width = porcentaje + '%';
        });
    }
});