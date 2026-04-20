document.addEventListener('DOMContentLoaded', () => {
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Simple parallax effect for hero
    window.addEventListener('scroll', () => {
        const scroll = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scroll * 0.4}px)`;
            heroContent.style.opacity = 1 - (scroll / 700);
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Terminal Logic
    const terminalInput = document.getElementById('terminalInput');
    const commandHistory = document.getElementById('commandHistory');

    const themes = {
        neon: { color: '#00d2ff', glow: 'rgba(0, 210, 255, 0.5)' },
        sunset: { color: '#ff7e5f', glow: 'rgba(255, 126, 95, 0.5)' },
        forest: { color: '#00ff87', glow: 'rgba(0, 255, 135, 0.5)' },
        ocean: { color: '#00c6ff', glow: 'rgba(0, 198, 255, 0.5)' }
    };

    function addHistory(text, type = 'user-cmd') {
        const p = document.createElement('p');
        p.classList.add(type);
        p.textContent = (type === 'user-cmd' ? '$ ' : '') + text;
        commandHistory.appendChild(p);
        commandHistory.scrollTop = commandHistory.scrollHeight;
    }

    function applyColor(color, glow) {
        document.documentElement.style.setProperty('--accent-color', color);
        // hexカラーの場合は簡易的なglowを作成
        const glowVal = glow || (color.startsWith('#') ? color + '80' : color);
        document.documentElement.style.setProperty('--accent-glow', glowVal);
    }

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const input = terminalInput.value.trim().toLowerCase();
                if (!input) return;

                addHistory(input);
                const [cmd, ...args] = input.split(' ');

                if (cmd === 'color') {
                    const color = args[0];
                    if (color) {
                        applyColor(color);
                        addHistory(`Accent color changed to ${color}`, 'system-msg');
                    } else {
                        addHistory('Error: color value required', 'error-msg');
                    }
                } else if (cmd === 'theme') {
                    const themeName = args[0];
                    if (themes[themeName]) {
                        applyColor(themes[themeName].color, themes[themeName].glow);
                        addHistory(`Theme applied: ${themeName}`, 'system-msg');
                    } else {
                        addHistory(`Error: Theme "${themeName}" not found.`, 'error-msg');
                        addHistory('Available: neon, sunset, forest, ocean', 'system-msg');
                    }
                } else if (cmd === 'reset') {
                    applyColor(themes.neon.color, themes.neon.glow);
                    addHistory('Theme reset to default', 'system-msg');
                } else {
                    addHistory(`Command not recognized: ${cmd}`, 'error-msg');
                }

                terminalInput.value = '';
            }
        });
    }

    // Color Palette Toggle
    const toggleColorsBtn = document.getElementById('toggleColors');
    const colorTableContainer = document.getElementById('colorTableContainer');

    if (toggleColorsBtn) {
        toggleColorsBtn.addEventListener('click', () => {
            const isHidden = colorTableContainer.classList.toggle('hidden');
            toggleColorsBtn.textContent = isHidden ? 'Show Color Codes' : 'Hide Color Codes';
        });
    }
});
