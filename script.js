// ==========================================
// Artificia AI — Landing Page Interactions
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // Scroll Reveal Animation Observer
    // ==========================================
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // ==========================================
    // Hover-Expand Gallery (Course Phases)
    // ==========================================
    const gallery = document.getElementById('expandGallery');
    if (gallery) {
        const panels = gallery.querySelectorAll('.expand-panel');

        panels.forEach((panel) => {
            // Hover — desktop
            panel.addEventListener('mouseenter', () => {
                panels.forEach(p => p.classList.remove('active'));
                panel.classList.add('active');
            });

            // Click — mobile + desktop fallback
            panel.addEventListener('click', () => {
                panels.forEach(p => p.classList.remove('active'));
                panel.classList.add('active');
            });
        });

        // Touch support for mobile
        let touchStartX = 0;
        gallery.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
    }

    // ==========================================
    // Curriculum Accordion (12 Weeks)
    // ==========================================
    const accordion = document.getElementById('curriculumAccordion');
    if (accordion) {
        const weekHeaders = accordion.querySelectorAll('.week-header');

        weekHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const card = header.closest('.week-card');
                const isOpen = card.classList.contains('open');

                // Close all other cards
                accordion.querySelectorAll('.week-card.open').forEach(openCard => {
                    if (openCard !== card) {
                        openCard.classList.remove('open');
                    }
                });

                // Toggle current card
                card.classList.toggle('open', !isOpen);
            });
        });
    }

    // ==========================================
    // Smooth Scrolling for Anchor Links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // ==========================================
    // Form Handling (Webhook Placeholder)
    // ==========================================
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('submitBtn');
            const originalText = submitBtn.innerHTML;

            // Loading state
            submitBtn.innerHTML = 'PROCESSING... <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            // Gather Data
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                interest: document.getElementById('interest').value,
                source: "FB_Ads_Landing_Page"
            };

            console.log("Form Data Prepared:", formData);

            try {
                // Simulated submission — replace with real webhook URL
                await new Promise(resolve => setTimeout(resolve, 1500));

                /* 
                // Actual webhook POST when URL is provided:
                const WEBHOOK_URL = 'YOUR_WEBHOOK_URL_HERE';
                await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                */

                // Show Success State
                leadForm.classList.add('hidden');
                document.getElementById('successState').classList.remove('hidden');

            } catch (error) {
                console.error('Submission error:', error);
                alert('We could not submit your request. Please try again or message us on WhatsApp.');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // ==========================================
    // Parallax Hero (subtle scroll offset)
    // ==========================================
    const hero = document.querySelector('.hero-section');
    if (hero && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrolled * 0.3}px`;
        }, { passive: true });
    }
});
