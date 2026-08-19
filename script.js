// ============================================
// PORTFOLIO SOLPHI - Interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-links a:not(.nav-btn)');

    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -70% 0px',
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => navObserver.observe(section));

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Typing Effect on Hero Title ---
    const highlight = document.querySelector('.highlight');
    if (highlight) {
        const text = highlight.textContent;
        highlight.textContent = '';
        let i = 0;

        const type = () => {
            if (i < text.length) {
                highlight.textContent += text[i];
                i++;
                setTimeout(type, 100);
            }
        };

        setTimeout(type, 800);
    }

    // --- Video Play/Pause ---
    document.querySelectorAll('.project-video-card').forEach(card => {
        const video = card.querySelector('video');
        const playBtn = card.querySelector('.play-btn');

        if (!video || !playBtn) return;

        playBtn.addEventListener('click', () => {
            video.play();
            playBtn.classList.add('hidden');
        });

        video.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playBtn.classList.add('hidden');
            } else {
                video.pause();
                playBtn.classList.remove('hidden');
            }
        });

        video.addEventListener('ended', () => {
            playBtn.classList.remove('hidden');
        });
    });

});
