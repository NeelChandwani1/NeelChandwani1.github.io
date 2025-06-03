// Initialize any interactive elements
function initInteractiveElements() {
    // This function is kept for future interactive elements
    // Currently focusing on the terminal animation only
}

// Terminal Typing Animation
function initTerminal() {
    const terminal = document.querySelector('.code-window code');
    if (!terminal) return;

    const codeLines = [
        { text: '// Welcome to my digital playground!', class: 'comment', delay: 500 },
        { text: 'const neel = {', class: '', delay: 800 },
        { text: '  name: ', class: 'property', delay: 0 },
        { text: '"Neel Chandwani"', class: 'string', delay: 200 },
        { text: ',', class: '', delay: 0 },
        { text: '  role: ', class: 'property', delay: 0 },
        { text: '"Full Stack Developer"', class: 'string', delay: 200 },
        { text: ',', class: '', delay: 0 },
        { text: '  skills: ', class: 'property', delay: 0 },
        { text: '["JavaScript", "React", "Node.js", "Python"]', class: '', delay: 200 },
        { text: '};', class: '', delay: 300 },
        { text: '', class: '', delay: 500 },
        { text: 'function', class: 'keyword', delay: 0 },
        { text: ' greet() {', class: '', delay: 0 },
        { text: '  return ', class: '', delay: 200 },
        { text: '"Hello, World! 👋"', class: 'string', delay: 0 },
        { text: ';', class: '', delay: 100 },
        { text: '}', class: '', delay: 200 },
        { text: '', class: '', delay: 300 },
        { text: '// Let\'s build something amazing together!', class: 'comment', delay: 500 },
        { text: 'const project = await startProject({', class: '', delay: 300 },
        { text: '  with: ', class: 'property', delay: 0 },
        { text: '"Neel"', class: 'string', delay: 200 },
        { text: ',', class: '', delay: 0 },
        { text: '  goal: ', class: 'property', delay: 0 },
        { text: '"Create something extraordinary"', class: 'string', delay: 200 },
        { text: '', class: '', delay: 0 },
        { text: '});', class: '', delay: 200 },
    ];

    let currentLine = 0;
    let currentChar = 0;
    let isTyping = false;
    let typeSpeed = 20;
    let lineDelay = 1000;
    
    function typeLine() {
        if (currentLine >= codeLines.length) {
            // Animation complete, add blinking cursor
            terminal.innerHTML += '<span class="cursor"></span>';
            return;
        }
        
        const line = codeLines[currentLine];
        
        if (currentChar === 0) {
            // Start of a new line
            terminal.innerHTML += '<div class="code-line">';
        }
        
        if (currentChar < line.text.length) {
            // Type next character
            const char = line.text.charAt(currentChar);
            const span = document.createElement('span');
            span.className = line.class || '';
            span.textContent = char;
            terminal.querySelector('.code-line:last-child').appendChild(span);
            
            // Add cursor
            const cursor = terminal.querySelector('.cursor');
            if (cursor) cursor.remove();
            terminal.querySelector('.code-line:last-child').innerHTML += '<span class="cursor"></span>';
            
            currentChar++;
            setTimeout(typeLine, typeSpeed);
        } else {
            // End of line
            currentLine++;
            currentChar = 0;
            terminal.innerHTML = terminal.innerHTML.replace('<span class="cursor"></span>', '');
            terminal.innerHTML += '</div>';
            
            if (currentLine < codeLines.length) {
                setTimeout(typeLine, line.delay || 0);
            } else {
                // Animation complete, add blinking cursor
                terminal.innerHTML += '<div class="code-line"><span class="cursor"></span></div>';
            }
        }
        
        // Auto-scroll to bottom
        terminal.parentElement.scrollTop = terminal.parentElement.scrollHeight;
    }
    
    // Start typing after a short delay
    setTimeout(typeLine, 1500);
}

// Initialize all interactive components
document.addEventListener('DOMContentLoaded', () => {
    initTerminal();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
