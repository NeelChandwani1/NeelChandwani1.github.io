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

// 3D Tilt Effect
function initTiltEffect() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;

    heroContent.style.transformStyle = 'preserve-3d';
    heroContent.style.transformOrigin = 'center center';
    heroContent.style.willChange = 'transform';
    heroContent.style.transition = 'transform 0.1s ease-out';

    const handleMouseMove = (e) => {
        const rect = heroContent.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = (e.clientX - centerX) / 30;
        const mouseY = (e.clientY - centerY) / 30;
        
        requestAnimationFrame(() => {
            heroContent.style.transform = `perspective(1000px) rotateY(${mouseX}deg) rotateX(${-mouseY}deg)`;
        });
    };

    const handleMouseLeave = () => {
        heroContent.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
        heroContent.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
        
        setTimeout(() => {
            heroContent.style.transition = 'transform 0.1s ease-out';
        }, 500);
    };

    // Add event listeners
    heroContent.addEventListener('mousemove', handleMouseMove);
    heroContent.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup function
    return () => {
        heroContent.removeEventListener('mousemove', handleMouseMove);
        heroContent.removeEventListener('mouseleave', handleMouseLeave);
    };
}

// Terminal Typing Animation
function initTerminal() {
    const codeElement = document.querySelector('.code-window pre code');
    if (!codeElement) return;
    
    // Clear any existing content
    codeElement.innerHTML = '';
    
    // Ensure the code container has position relative
    const codeContainer = codeElement.parentNode;
    codeContainer.style.position = 'relative';
    codeContainer.style.display = 'inline-block';
    codeContainer.style.width = '100%';
    
    // Create cursor element if it doesn't exist
    let cursor = document.querySelector('.cursor');
    if (!cursor) {
        cursor = document.createElement('span');
        cursor.className = 'cursor';
        cursor.textContent = '|';
        cursor.style.position = 'absolute';
        cursor.style.left = '0';
        cursor.style.top = '0';
        codeContainer.appendChild(cursor);
    }

    // Skills data
    const skillsData = {
        'JavaScript': 90,
        'React': 85,
        'Node.js': 80,
        'Python': 75,
        'CSS/SCSS': 85,
        'Git': 80
    };

    const codeLines = [
        '// Welcome to my digital playground!',
        'const neel = {',
        '  name: "Neel Chandwani",',
        '  role: "Full Stack Developer",',
        '  skills: ["JavaScript", "React", "Node.js", "Python"]',
        '};',
        '',
        'function greet() {',
        '  return "Hello, World! 👋";',
        '}',
        '',
        '// Let\'s build something amazing together!',
        'const project = await startProject({',
        '  with: "Neel",',
        '  goal: "Create something extraordinary"',
        '});',
        '',
        '// Skills Chart:',
        'const skills = ' + JSON.stringify(skillsData, null, 2) + ';'
    ];
    
    // Initialize chart container
    const chartContainer = document.createElement('div');
    chartContainer.className = 'skills-chart';
    chartContainer.style.display = 'none';
    chartContainer.style.marginTop = '1rem';
    codeElement.parentNode.insertBefore(chartContainer, cursor);
    
    // Create skills chart
    function createSkillsChart() {
        chartContainer.innerHTML = '';
        
        // Add a title for the chart
        const chartTitle = document.createElement('h4');
        chartTitle.textContent = 'Skills & Expertise';
        chartTitle.style.color = 'var(--primary)';
        chartTitle.style.marginBottom = '1rem';
        chartTitle.style.fontSize = '1.1rem';
        chartContainer.appendChild(chartTitle);
        
        // Create skill bars
        Object.entries(skillsData).forEach(([skill, level], index) => {
            const skillBar = document.createElement('div');
            skillBar.className = 'skill-bar';
            skillBar.style.opacity = '0';
            skillBar.style.transform = 'translateY(10px)';
            skillBar.style.transition = `opacity 0.3s ease ${index * 0.1}s, transform 0.3s ease ${index * 0.1}s`;
            
            const skillInfo = document.createElement('div');
            skillInfo.className = 'skill-info';
            skillInfo.innerHTML = `
                <span class="skill-name">${skill}</span>
                <span class="skill-level">${level}%</span>
            `;
            
            const skillBarBg = document.createElement('div');
            skillBarBg.className = 'skill-bar-bg';
            
            const skillBarFill = document.createElement('div');
            skillBarFill.className = 'skill-bar-fill';
            skillBarFill.style.width = '0%';
            
            skillBarBg.appendChild(skillBarFill);
            skillBar.appendChild(skillInfo);
            skillBar.appendChild(skillBarBg);
            chartContainer.appendChild(skillBar);
            
            // Animate the bar after a short delay
            setTimeout(() => {
                skillBar.style.opacity = '1';
                skillBar.style.transform = 'translateY(0)';
                skillBarFill.style.width = `${level}%`;
            }, 100 + (index * 100));
        });
        
        chartContainer.style.display = 'block';
        chartContainer.style.opacity = '0';
        chartContainer.style.transform = 'translateY(10px)';
        chartContainer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Trigger reflow
        void chartContainer.offsetHeight;
        
        // Make chart visible
        chartContainer.style.opacity = '1';
        chartContainer.style.transform = 'translateY(0)';
    }

    let currentLine = 0;
    let currentChar = 0;
    let isDeleting = false;
    let isEnd = false;
    let typingSpeed = 50;
    let deletingSpeed = 30;
    let pauseBetweenLines = 1500;

    function updateCursorPosition() {
        if (!cursor) return;
        
        // Use a simpler approach for cursor positioning
        const text = codeElement.textContent || '';
        const tempSpan = document.createElement('span');
        tempSpan.textContent = text;
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.whiteSpace = 'pre';
        tempSpan.style.padding = '0';
        tempSpan.style.margin = '0';
        
        // Apply the same styles as the code element
        const codeStyles = window.getComputedStyle(codeElement);
        tempStyle = document.createElement('div');
        tempStyle.textContent = `
            #temp-span {
                font-family: ${codeStyles.fontFamily};
                font-size: ${codeStyles.fontSize};
                line-height: ${codeStyles.lineHeight};
                letter-spacing: ${codeStyles.letterSpacing};
                word-spacing: ${codeStyles.wordSpacing};
                padding: 0;
                margin: 0;
                border: 0;
                position: absolute;
                left: -9999px;
                top: -9999px;
                white-space: pre;
            }
        `;
        document.head.appendChild(tempStyle);
        
        tempSpan.id = 'temp-span';
        document.body.appendChild(tempSpan);
        
        // Position the cursor at the end of the text
        const rect = tempSpan.getBoundingClientRect();
        cursor.style.left = `${rect.width + 2}px`;
        
        // Clean up
        document.body.removeChild(tempSpan);
        document.head.removeChild(tempStyle);
        
        // Make sure cursor is visible
        cursor.style.display = 'inline-block';
    }

    function type() {
        const currentCode = codeLines[currentLine];
        
        if (isDeleting) {
            // Delete character
            codeElement.textContent = currentCode.substring(0, currentChar - 1);
            currentChar--;
            
            // Update cursor position
            updateCursorPosition();
            
            if (currentChar === 0) {
                isDeleting = false;
                currentLine = (currentLine + 1) % codeLines.length;
                
                // Check if we've reached the skills chart section
                if (currentLine === codeLines.length - 1) {
                    // Small delay before showing the chart
                    setTimeout(() => {
                        createSkillsChart();
                    }, 300);
                }
                
                setTimeout(type, 500);
                return;
            }
            
            setTimeout(type, deletingSpeed);
        } else {
            // Add character
            codeElement.textContent = currentCode.substring(0, currentChar + 1);
            currentChar++;
            
            // Update cursor position
            updateCursorPosition();
            
            if (currentChar === currentCode.length) {
                isEnd = true;
                
                // Special handling for the last line (skills chart)
                if (currentLine === codeLines.length - 1) {
                    // Show the chart for 5 seconds, then restart
                    setTimeout(() => {
                        // Hide the chart
                        const chart = document.querySelector('.skills-chart');
                        if (chart) {
                            chart.style.opacity = '0';
                            chart.style.transform = 'translateY(10px)';
                        }
                        
                        // Reset and restart typing
                        setTimeout(() => {
                            currentLine = 0;
                            currentChar = 0;
                            isDeleting = false;
                            codeElement.textContent = '';
                            updateCursorPosition();
                            
                            // Remove the chart
                            if (chart) {
                                chart.remove();
                            }
                            
                            // Restart typing after a short delay
                            setTimeout(type, 1000);
                        }, 500);
                    }, 5000);
                    return;
                }
                
                // For other lines, start deleting after a pause
                setTimeout(() => {
                    isDeleting = true;
                    setTimeout(type, 500);
                }, pauseBetweenLines);
                return;
            }
            
            // Add slight delay after certain characters for more natural typing
            const char = currentCode[currentChar];
            let delay = typingSpeed;
            
            if (['.', ',', ';', '(', ')', '{', '}', '['].includes(char)) {
                delay = typingSpeed * 2;
            } else if (char === ' ') {
                delay = typingSpeed * 0.8;
            }
                
            setTimeout(type, delay);
        }
    }


    // Initialize syntax highlighting
    if (window.Prism) {
        Prism.highlightAll();
    }
    
    // Start typing after a short delay
    setTimeout(type, 2000);
}

// Initialize all interactive components
document.addEventListener('DOMContentLoaded', () => {
    initTiltEffect();
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
