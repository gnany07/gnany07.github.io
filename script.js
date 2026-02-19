// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

    // --- Typing Animation ---
    const words = ["a Full Stack Developer.", "a ML Enthusiast.", "a Problem Solver."];
    let i = 0;
    let timer;
    const typingDelay = 100;
    const erasingDelay = 50;
    const newWordDelay = 2000;
    let currentWordIndex = 0;
    let isDeleting = false;
    const typeTextSpan = document.querySelector('.type-text');

    function type() {
        const currentWord = words[currentWordIndex];
        
        if (isDeleting) {
            typeTextSpan.textContent = currentWord.substring(0, i - 1);
            i--;
        } else {
            typeTextSpan.textContent = currentWord.substring(0, i + 1);
            i++;
        }

        let typeSpeed = typingDelay;

        if (isDeleting) {
            typeSpeed /= 2;
        }

        if (!isDeleting && i === currentWord.length) {
            typeSpeed = newWordDelay;
            isDeleting = true;
        } else if (isDeleting && i === 0) {
            isDeleting = false;
            currentWordIndex++;
            if (currentWordIndex >= words.length) {
                currentWordIndex = 0;
            }
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    if (typeTextSpan) {
        setTimeout(type, newWordDelay);
    }

    // --- Navbar Scroll Effect & Mobile Menu ---
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // --- Scroll Reveal Animation with Intersection Observer ---
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // --- 3D Hover Effect on Hero Visual/Cards (Optional enhancement) ---
    const glassCards = document.querySelectorAll('.glass-card');
    
    glassCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Subtle highlight tracking mouse
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            
            // If it's the hero visual, add 3D tilt
            if(card.classList.contains('portrait-placeholder')) {
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
                const rotateY = ((x - centerX) / centerX) * 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if(card.classList.contains('portrait-placeholder')) {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            }
        });
    });

});
