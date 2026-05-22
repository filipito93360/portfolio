/**
 * Philippe Brochier - Portfolio SPA Logic
 * Features: Bilingual translations, typed animation, scroll spy, project filters, mobile nav, contact submission.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       LANGUAGE TOGGLE ENGINE (FR / EN)
       ========================================================================== */
    const langToggleBtn = document.getElementById('langToggleBtn');
    const htmlElement = document.documentElement;
    const bodyElement = document.body;

    // Load language preference or default to French
    let currentLang = localStorage.getItem('portfolio-lang') || 'fr';
    setLanguage(currentLang);

    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'fr' ? 'en' : 'fr';
        setLanguage(currentLang);
        localStorage.setItem('portfolio-lang', currentLang);
        
        // Trigger subtitle typing update to switch language words instantly
        resetTypingAnimation();
    });

    function setLanguage(lang) {
        if (lang === 'fr') {
            bodyElement.classList.remove('en');
            bodyElement.classList.add('fr');
            htmlElement.setAttribute('lang', 'fr');
        } else {
            bodyElement.classList.remove('fr');
            bodyElement.classList.add('en');
            htmlElement.setAttribute('lang', 'en');
        }
    }

    /* ==========================================================================
       MOBILE NAVIGATION DRAWER
       ========================================================================== */
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileNavToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const icon = mobileNavToggle.querySelector('i');
        if (navMenu.classList.contains('open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            const icon = mobileNavToggle.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });

    /* ==========================================================================
       TYPING ANIMATION (BILINGUAL)
       ========================================================================== */
    const typedTextElement = document.getElementById('typedText');
    
    const words = {
        fr: ["Logiciels & Systèmes", "Développement Fullstack", "Programmation Back-end", "Génie Logiciel"],
        en: ["Software & Systems", "Fullstack Development", "Back-end Programming", "Software Engineering"]
    };

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let typingTimeout;

    function type() {
        const currentWords = words[currentLang];
        const currentWord = currentWords[wordIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deleting is faster
        } else {
            typedTextElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }

        // Handle word completion or deletion cycle
        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 1500; // Pause at the full word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % currentWords.length;
            typingSpeed = 500; // Pause before typing the next word
        }

        typingTimeout = setTimeout(type, typingSpeed);
    }

    function resetTypingAnimation() {
        clearTimeout(typingTimeout);
        wordIndex = 0;
        charIndex = 0;
        isDeleting = false;
        type();
    }

    // Start typing loop
    type();

    /* ==========================================================================
       SCROLL SPY (ACTIVE NAVIGATION HIGHLIGHT)
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Adjust threshold for header overlap
            if (window.scrollY >= (sectionTop - varHeaderHeight() - 100)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    function varHeaderHeight() {
        return parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 80;
    }

    /* ==========================================================================
       PROJECTS FILTERING
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active state from other buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Animate entry/exit
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hide');
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    
                    // Trigger reflow then transition back in
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    }, 50);
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    /* ==========================================================================
       CONTACT FORM SUBMISSION
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnHTML = submitBtn.innerHTML;

        // Visual loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = currentLang === 'fr' 
            ? 'Envoi en cours... <i class="fa-solid fa-spinner fa-spin icon-right"></i>' 
            : 'Sending... <i class="fa-solid fa-spinner fa-spin icon-right"></i>';

        formStatus.textContent = '';
        formStatus.className = 'form-status';

        // Mimic server submission delay
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHTML;

            // Success feedback
            formStatus.className = 'form-status success';
            formStatus.textContent = currentLang === 'fr'
                ? 'Merci ! Votre message a été envoyé avec succès.'
                : 'Thank you! Your message has been sent successfully.';

            // Reset form inputs
            contactForm.reset();

            // Clear status message after 5 seconds
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }, 5000);

        }, 1500);
    });
});
