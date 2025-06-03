// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const currentYear = document.getElementById('current-year');

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
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
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
