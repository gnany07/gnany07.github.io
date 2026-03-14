// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

    // ══════════════════════════════════════════════
    // TYPING ANIMATION
    // ══════════════════════════════════════════════
    const words = [
        "ML Engineer @ Meta.",
        "Georgia Tech MSCS.",
        "Ex-Google Tech Lead.",
        "IIT Roorkee Alum.",
        "Systems Engineer.",
        "Problem Solver."
    ];
    let charIndex = 0;
    let currentWordIndex = 0;
    let isDeleting = false;
    const typeTextSpan = document.querySelector('.type-text');
    const typingDelay = 80;
    const erasingDelay = 40;
    const newWordDelay = 2200;

    function type() {
        const currentWord = words[currentWordIndex];

        if (isDeleting) {
            typeTextSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typeTextSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = typingDelay;

        if (isDeleting) {
            typeSpeed = erasingDelay;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = newWordDelay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentWordIndex = (currentWordIndex + 1) % words.length;
            typeSpeed = 400;
        }

        setTimeout(type, typeSpeed);
    }

    if (typeTextSpan) {
        setTimeout(type, 1200);
    }

    // ══════════════════════════════════════════════
    // NAVBAR — SCROLL EFFECT & ACTIVE LINK
    // ══════════════════════════════════════════════
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Shrink navbar on scroll
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active section highlighting
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // ══════════════════════════════════════════════
    // HAMBURGER MENU
    // ══════════════════════════════════════════════
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    const allLinks = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    allLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinksContainer.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('active');
        }
    });

    // ══════════════════════════════════════════════
    // SCROLL REVEAL with IntersectionObserver
    // ══════════════════════════════════════════════
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -60px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ══════════════════════════════════════════════
    // ANIMATED STAT COUNTERS
    // ══════════════════════════════════════════════
    const counters = document.querySelectorAll('.counter');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        countersAnimated = true;

        counters.forEach(counter => {
            const card = counter.closest('.stat-card');
            const target = parseInt(card.dataset.target);
            const duration = 2000; // ms
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease-out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(eased * target);

                counter.textContent = current.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    // Trigger counters when stats grid is in view
    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        counterObserver.observe(statsGrid);
    }

    // ══════════════════════════════════════════════
    // FLOATING PARTICLES
    // ══════════════════════════════════════════════
    const particlesContainer = document.getElementById('particles');

    function createParticles() {
        const count = window.innerWidth < 768 ? 15 : 30;

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (6 + Math.random() * 6) + 's';
            particle.style.width = (2 + Math.random() * 3) + 'px';
            particle.style.height = particle.style.width;
            particle.style.opacity = 0.1 + Math.random() * 0.4;

            particlesContainer.appendChild(particle);
        }
    }

    if (particlesContainer) {
        createParticles();
    }

    // ══════════════════════════════════════════════
    // 3D HOVER on HERO CARD
    // ══════════════════════════════════════════════
    const heroCard = document.querySelector('.portrait-placeholder');

    if (heroCard) {
        heroCard.addEventListener('mousemove', (e) => {
            const rect = heroCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            heroCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        heroCard.addEventListener('mouseleave', () => {
            heroCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    }

    // ══════════════════════════════════════════════
    // SMOOTH ANCHOR SCROLL
    // ══════════════════════════════════════════════
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href').startsWith('mailto:')) {
                return;
            }
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ══════════════════════════════════════════════
    // MOUSE GLOW on GLASS CARDS
    // ══════════════════════════════════════════════
    document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

});
