document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Set cursor styles for all interactive elements
    const interactiveElements = ['a', 'button', 'input', 'textarea', 'select', 'label[for]'];
    interactiveElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('cursor-hover');
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursorFollower.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursorFollower.classList.remove('hover');
            });
        });
    });
    
    // Mouse move event
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Animation loop for smooth following
    function animate() {
        // Ease the follower's movement
        const distX = mouseX - posX;
        const distY = mouseY - posY;
        
        posX += distX / 8;
        posY += distY / 8;
        
        cursorFollower.style.left = posX + 'px';
        cursorFollower.style.top = posY + 'px';
        
        requestAnimationFrame(animate);
    }
    
    // Start the animation
    animate();
    
    // Handle mouse leave window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '0.7';
    });
});
