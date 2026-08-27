// ============================================
// PORTFOLIO SOLPHI - Interactions
// ============================================

// =====================================================
// !!! A REMPLACER PAR VOTRE IDENTIFIANT FORMSPREE !!!
// 1. Creez un compte gratuit sur https://formspree.io
// 2. Creez un formulaire
// 3. Copiez l'URL du formulaire (ex: https://formspree.io/f/xabc1234)
// 4. Collez-la ici dans FORMSPREE_URL ci-dessous.
// =====================================================
const FORMSPREE_URL = "https://formspree.io/f/mgaewgzz";

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

    // ============================================
    // Widget Messenger
    // ============================================
    const chatToggle = document.getElementById('chatToggle');
    const chatClose = document.getElementById('chatClose');
    const chatWindow = document.getElementById('chatWindow');
    const chatForm = document.getElementById('chatForm');
    const chatName = document.getElementById('chatName');
    const chatMessage = document.getElementById('chatMessage');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');

    const openChat = () => chatWindow.classList.add('open');
    const closeChat = () => chatWindow.classList.remove('open');

    chatToggle.addEventListener('click', openChat);
    chatClose.addEventListener('click', closeChat);

    const addUserMessage = (name, text) => {
        const div = document.createElement('div');
        div.className = 'chat-message user';
        const p = document.createElement('p');
        p.innerHTML = `${escapeHtml(text)}<span class="msg-meta">${escapeHtml(name || 'Vous')}</span>`;
        div.appendChild(p);
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const escapeHtml = (str) => {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    };

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = chatName.value.trim();
        const message = chatMessage.value.trim();
        if (!message) return;

        addUserMessage(name, message);
        chatMessage.value = '';

        const payload = {
            name: name,
            message: message,
            _subject: 'Nouveau message depuis votre Portfolio'
        };

        chatSend.disabled = true;
        chatSend.classList.add('loading');

        try {
            const res = await fetch(FORMSPREE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                addUserMessage('', '✅ Message envoye ! Je vous repondrai au plus vite.');
            } else {
                addUserMessage('', '⚠️ Oups, une erreur est survenue. Reessayez.');
            }
        } catch (err) {
            addUserMessage('', '⚠️ Envoi impossible. Verifiez votre connexion.');
        } finally {
            chatSend.disabled = false;
            chatSend.classList.remove('loading');
        }
    });
});
