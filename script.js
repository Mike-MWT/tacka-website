const translations = {
    de: {
        name: 'Michael Tacka',
        tagline: 'Willkommen',
        'about-title': 'Über mich',
        'about-text': 'Freut mich, Sie hier zu sehen. Diese Website ist noch im Aufbau. Für Fragen und Kontakt, bitte nutzen Sie die E-Mail-Adresse unten.',
        'contact-title': 'Kontakt',
        footer: '&copy; 2026 Michael Tacka. Alle Rechte vorbehalten.'
    },
    en: {
        name: 'Michael Tacka',
        tagline: 'Welcome',
        'about-title': 'About Me',
        'about-text': 'Nice to have you here. This website is still under construction. For questions and inquiries, please use the email address below.',
        'contact-title': 'Contact',
        footer: '&copy; 2026 Michael Tacka. All rights reserved.'
    }
};

let currentLang = localStorage.getItem('language') || 'de';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
    updateActiveButton();
});

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    document.documentElement.lang = lang;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            if (key === 'footer') {
                el.innerHTML = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });
    
    updateActiveButton();
}

function updateActiveButton() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Language switcher event listeners
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        setLanguage(btn.dataset.lang);
    });
});
