// ===== NAVEGACIÓN MÓVIL =====
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle del menú móvil
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== ANIMACIONES AL HACER SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar todas las secciones
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// ===== NAVEGACIÓN SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Ajuste para navbar fijo
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== EFECTOS DE LA NAVBAR AL HACER SCROLL =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// ===== MANEJO DEL FORMULARIO =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('.form-submit');
        const originalText = submitButton.textContent;
        
        // Cambiar texto del botón
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Obtener los datos del formulario
        const formData = new FormData(contactForm);
        
        try {
            // Enviar datos a Formspree
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Éxito
                formStatus.textContent = '✓ Message sent successfully! Check your email for confirmation.';
                formStatus.className = 'form-status success';
                contactForm.reset();
            } else {
                const data = await response.json();
                if (data.errors) {
                    formStatus.textContent = '✗ Error: ' + data.errors.map(error => error.message).join(', ');
                } else {
                    formStatus.textContent = '✗ Oops! There was a problem sending your message.';
                }
                formStatus.className = 'form-status error';
            }
        } catch (error) {
            // Error de red
            formStatus.textContent = '✗ Network error. Please check your internet connection and try again.';
            formStatus.className = 'form-status error';
            console.error('Form submission error:', error);
        } finally {
            // Restaurar botón
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Ocultar mensaje después de 8 segundos
            setTimeout(() => {
                if (formStatus) {
                    formStatus.style.display = 'none';
                }
            }, 8000);
        }
    });
}

// ===== INITIAL ENTRANCE ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ===== EFECTO PARALLAX SUTIL =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroElements = document.querySelectorAll('.hero::before');
    
    heroElements.forEach(element => {
        element.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
});