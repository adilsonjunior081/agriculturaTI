/**
 * Agricultura de Gravatá - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos os componentes
    initMobileMenu();
    initScrollEffects();
    initContactForm();
    initAnimations();
});

// Menu Mobile
function initMobileMenu() {
    const navToggle = document.querySelector('.mobile-toggle');
    const mobileNav = document.querySelector('.navigation-links');
    const overlay = document.querySelector('.nav-overlay');
    const mobileLinks = document.querySelectorAll('.navigation-links li a');
    
    if (navToggle) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMenu();
        });
    }
    
    if (overlay) {
        overlay.addEventListener('click', function() {
            closeMenu();
        });
    }
    
    // Fechar menu ao clicar em links do menu
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                closeMenu();
            }
        });
    });
    
    // Função para alternar o menu
    function toggleMenu() {
        document.body.classList.toggle('menu-open');
        mobileNav.classList.toggle('active');
        if (overlay) {
            overlay.classList.toggle('active');
        }
    }
    
    // Função para fechar o menu
    function closeMenu() {
        document.body.classList.remove('menu-open');
        if (mobileNav) mobileNav.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
    }
    
    // Detectar ESC para fechar o menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
            closeMenu();
        }
    });
}

// Efeitos de scroll
function initScrollEffects() {
    // Adicionar classe ao header quando rolar a página
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Scroll suave para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetOffset = targetElement.getBoundingClientRect().top + window.scrollY;
                
                window.scrollTo({
                    top: targetOffset - headerHeight - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Inicializar formulário de contato
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const thankYouMessage = document.getElementById('thankYouMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obter os dados do formulário
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Enviar os dados do formulário (usando EmailJS ou outro serviço)
            // Esta é uma simulação - você precisa configurar seu serviço de email real
            emailFormData(formData);
            
            // Exibir mensagem de agradecimento
            contactForm.style.display = 'none';
            thankYouMessage.style.display = 'block';
            
            // Limpar formulário
            contactForm.reset();
            
            // Opcional: Redirecionar após alguns segundos
            // setTimeout(() => {
            //     window.location.href = 'index.html';
            // }, 3000);
        });
    }
    
    // Função para enviar os dados do formulário por email
    function emailFormData(formData) {
        // Aqui você implementaria a lógica para enviar o email
        // Exemplo usando EmailJS (você precisaria incluir a biblioteca e configurar sua conta)
        
        /* 
        // Descomentar e configurar quando estiver pronto para usar
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            from_name: formData.name,
            reply_to: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message
        })
        .then(function(response) {
            console.log('Email enviado com sucesso!', response.status, response.text);
        }, function(error) {
            console.log('Erro ao enviar email:', error);
        });
        */
        
        console.log('Dados do formulário que seriam enviados:', formData);
    }
}

// Inicializar animações
function initAnimations() {
    // Animações baseadas em scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Função para verificar se elemento está visível na viewport
    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
            rect.bottom >= 0
        );
    };
    
    // Função para animar elementos visíveis
    const handleScrollAnimation = () => {
        animatedElements.forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('animated');
            }
        });
    };
    
    // Usar Intersection Observer quando disponível
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback para browsers mais antigos
        window.addEventListener('scroll', handleScrollAnimation);
        // Verificar elementos visíveis no carregamento inicial
        handleScrollAnimation();
    }
    
    // Aplicar delay em elementos com animação sequencial
    document.querySelectorAll('.culture-card').forEach((card, index) => {
        if (card.classList.contains('animate-on-scroll')) {
            card.style.transitionDelay = `${index * 0.1}s`;
        }
    });
    
    document.querySelectorAll('.chart-box').forEach((box, index) => {
        if (box.classList.contains('animate-on-scroll')) {
            box.style.transitionDelay = `${index * 0.2}s`;
        }
    });
} 