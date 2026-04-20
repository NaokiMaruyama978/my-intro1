document.addEventListener('DOMContentLoaded', () => {
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // 一度表示されたら監視を止める（オプション）
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // 15%見えたら発火
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

    // Smooth scroll for anchor links (if any added in future)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
