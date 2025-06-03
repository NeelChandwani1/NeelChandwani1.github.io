// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-link');
const currentYear = document.getElementById('current-year');
const sections = document.querySelectorAll('section');

// Set current year in footer
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a nav link
navItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Don't prevent default for empty hashes
        if (this.getAttribute('href') === '#') return;
        
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Smooth scroll to target
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect and active section highlighting
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.padding = '1rem 0';
    } else {
        header.style.background = 'transparent';
        header.style.boxShadow = 'none';
        header.style.backdropFilter = 'none';
        header.style.padding = '1.5rem 0';
    }

    // Update active nav link based on scroll position
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = `#${section.getAttribute('id')}`;
        }
    });

    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === current) {
            link.classList.add('active');
        }
    });
});

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll reveal animation to elements with data-animate attribute
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('[data-animate]');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Initialize glitch effect on hero title
    const glitchText = document.querySelector('.glitch');
    if (glitchText) {
        const text = glitchText.textContent.trim();
        glitchText.innerHTML = '';
        
        // Create three layers of text for the glitch effect
        for (let i = 0; i < 3; i++) {
            const span = document.createElement('span');
            span.className = 'glitch-text';
            span.textContent = text;
            glitchText.appendChild(span);
        }
    }
    
    // Add smooth scroll behavior for the whole document
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Remove the smooth scroll behavior when using the mouse wheel to prevent jank
    let isScrolling = false;
    window.addEventListener('wheel', () => {
        document.documentElement.style.scrollBehavior = 'auto';
        
        if (!isScrolling) {
            isScrolling = true;
            setTimeout(() => {
                document.documentElement.style.scrollBehavior = 'smooth';
                isScrolling = false;
            }, 1000);
        }
    }, { passive: true });
});

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});
