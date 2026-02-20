// ===================================
// Navigation & Scroll Effects
// ===================================

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===================================
// Smooth Scroll
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Intersection Observer for Animations
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.classList.add('fade-in');
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Observe stat cards
const statCards = document.querySelectorAll('.stat-card');
statCards.forEach((card, index) => {
    card.classList.add('fade-in');
    card.style.transitionDelay = `${index * 0.15}s`;
    observer.observe(card);
});

// Observe info cards
const infoCards = document.querySelectorAll('.info-card');
infoCards.forEach((card, index) => {
    card.classList.add('fade-in');
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Observe feature items
const featureItems = document.querySelectorAll('.feature-item');
featureItems.forEach((item, index) => {
    item.classList.add('fade-in');
    item.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(item);
});

// Observe section headers
const sectionHeaders = document.querySelectorAll('.section-header');
sectionHeaders.forEach((header) => {
    header.classList.add('fade-in');
    observer.observe(header);
});

// Observe contact grid and contact box
const contactGrid = document.querySelector('.contact-grid');
if (contactGrid) {
    contactGrid.classList.add('fade-in');
    observer.observe(contactGrid);
}

const contactBox = document.querySelector('.contact-box');
if (contactBox) {
    contactBox.classList.add('fade-in');
    observer.observe(contactBox);
}

// ===================================
// Contact Box Cursor Glow Effect
// ===================================

const contactBoxEl = document.getElementById('contactBox');
const contactBoxGlow = document.getElementById('contactBoxGlow');

if (contactBoxEl && contactBoxGlow) {
    contactBoxEl.addEventListener('mousemove', (e) => {
        const rect = contactBoxEl.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        contactBoxGlow.style.background = `radial-gradient(circle 250px at ${x}px ${y}px, rgba(255, 255, 255, 0.12) 0%, transparent 70%)`;
    });

    contactBoxEl.addEventListener('mouseleave', () => {
        contactBoxGlow.style.background = '';
    });
}

// ===================================
// Notification System
// ===================================

function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '0.5rem',
        backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
        color: 'white',
        fontWeight: '500',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        zIndex: '9999',
        animation: 'slideInRight 0.3s ease-out',
        maxWidth: '400px'
    });

    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Counter Animation for Stats
// ===================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : '');
        }
    }, 16);
}

// Observe stat numbers for counter animation
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const text = entry.target.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            entry.target.textContent = '0';
            animateCounter(entry.target, number);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statsObserver.observe(stat));

// ===================================
// Parallax Effect for Hero Background
// ===================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');

    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===================================
// Services Filter Logic
// ===================================

const filterBtns = document.querySelectorAll('.filter-btn');
const servicesGrid = document.getElementById('servicesGrid');
const allServiceCards = document.querySelectorAll('.service-card');

if (filterBtns.length > 0 && servicesGrid) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            // Add fade-out effect to grid
            servicesGrid.style.opacity = '0';

            setTimeout(() => {
                allServiceCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'flex';
                        // Re-trigger observer for visible cards
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, 50);
                    } else {
                        card.style.display = 'none';
                        card.classList.remove('visible');
                    }
                });

                // Fade back in
                servicesGrid.style.opacity = '1';

                // Update active nav link or scroll position if needed
                updateActiveNavLink();
            }, 300);
        });
    });
}

/* Cookie Consent logic */
document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptBtn = document.getElementById('acceptCookies');

    if (cookieBanner && acceptBtn) {
        // Check if user already accepted cookies
        if (!localStorage.getItem('cookieConsent')) {
            // Show banner with a slight delay
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 1500);
        }

        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'true');
            cookieBanner.classList.remove('show');
        });

        // Manage preferences link
        const manageBtn = document.getElementById('manageCookies');
        if (manageBtn) {
            manageBtn.addEventListener('click', (e) => {
                e.preventDefault();
                cookieBanner.classList.add('show');
            });
        }
    }
});

// ===================================
// Initialize on Load
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Add initial animations
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Initial observer trigger for visible items
    updateActiveNavLink();
});

// Set initial body opacity
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.3s ease';
