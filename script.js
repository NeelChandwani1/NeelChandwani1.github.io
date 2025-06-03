// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const currentYear = document.getElementById('current-year');
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Set current year in footer
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Theme Toggle
function toggleTheme() {
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    
    // Update toggle icon
    const icon = themeToggle.querySelector('i');
    icon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
}

// Initialize theme from localStorage or prefer-color-scheme
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    } else {
        html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
    
    // Set initial icon
    const icon = themeToggle.querySelector('i');
    icon.className = html.getAttribute('data-theme') === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

// Initialize particles.js
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#6e45e2' },
                shape: { type: 'circle' },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#6e45e2',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 0.5 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }
}

// Initialize skills chart
function initSkillsChart() {
    const ctx = document.getElementById('skillsChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Frontend', 'Backend', 'UI/UX', 'Mobile', 'DevOps', 'Testing'],
            datasets: [{
                label: 'Skills',
                data: [85, 75, 80, 65, 70, 75],
                backgroundColor: 'rgba(110, 69, 226, 0.2)',
                borderColor: 'rgba(110, 69, 226, 1)',
                pointBackgroundColor: 'rgba(110, 69, 226, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(110, 69, 226, 1)'
            }]
        },
        options: {
            scale: {
                ticks: { beginAtZero: true, max: 100, display: false },
                pointLabels: { fontSize: 12, color: 'var(--text-color)' },
                gridLines: { color: 'var(--medium-gray)' },
                angleLines: { color: 'var(--medium-gray)' }
            },
            legend: { display: false },
            responsive: true,
            maintainAspectRatio: false,
            tooltips: { backgroundColor: 'var(--dark-gray)', titleFontSize: 14, bodyFontSize: 12 },
            animation: { duration: 2000 }
        }
    });
}

// Animate timeline items on scroll
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => observer.observe(item));
}

// Animate skill bars on scroll
function animateSkillBars() {
    const skills = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skills.forEach(skill => {
        skill.setAttribute('data-width', skill.style.width);
        skill.style.width = '0';
        observer.observe(skill);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initParticles();
    initSkillsChart();
    animateTimeline();
    animateSkillBars();
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});

// Close mobile menu when clicking on a nav link
navItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth scrolling for anchor links with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Smooth scroll to target
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
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

// Custom cursor
if (window.innerWidth > 1024) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Add a small delay to the follower for a trailing effect
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    // Add hover effects for interactive elements
    const interactiveElements = ['a', 'button', '.btn', 'input', 'textarea', 'select'];
    interactiveElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorFollower.style.opacity = '0.5';
            });
            
            element.addEventListener('mouseleave', () => {
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.opacity = '1';
            });
        });
    });
} else {
    // Hide custom cursor on mobile
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
}

// Typewriter effect for hero subtitle
const typewriterText = "Full Stack Developer";
const typewriterElement = document.querySelector('.typewriter');

if (typewriterElement) {
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // ms
    
    function type() {
        const currentText = typewriterElement.textContent;
        
        if (!isDeleting && charIndex < typewriterText.length) {
            // Typing
            typewriterElement.textContent = typewriterText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        } else if (isDeleting && charIndex > 0) {
            // Deleting
            typewriterElement.textContent = typewriterText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        }
        
        // Change direction
        if (!isDeleting && charIndex === typewriterText.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start the typewriter effect after a delay
    setTimeout(type, 1000);
}

// Add glitch effect to hero heading
const glitchElement = document.querySelector('.glitch');
if (glitchElement) {
    glitchElement.addEventListener('mouseenter', () => {
        glitchElement.style.animation = 'glitch 0.3s infinite';
    });
    
    glitchElement.addEventListener('mouseleave', () => {
        glitchElement.style.animation = 'none';
    });
}

// Add fade-in animation on scroll
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize elements with fade-in class
fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
});

// Run once on page load
window.addEventListener('load', () => {
    fadeInOnScroll();
    
    // Add scrolled class to header if page is not at top
    if (window.scrollY > 50) {
        document.querySelector('header').classList.add('scrolled');
    }
});

// Run on scroll
window.addEventListener('scroll', fadeInOnScroll);

// Run on resize (in case of layout changes)
window.addEventListener('resize', fadeInOnScroll);

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
