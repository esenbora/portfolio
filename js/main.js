// DOM Elements
const navbar = document.getElementById('navbar');
const navLinks = document.querySelector('.nav-links');
const burger = document.querySelector('.burger');

// Scroll Event for Navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(10, 10, 22, 0.9)';
        navbar.style.boxShadow = '0 0 10px var(--primary-color), 0 0 20px var(--primary-color)';
        navbar.style.borderBottom = '2px solid var(--primary-color)';
    } else {
        navbar.style.backgroundColor = 'transparent';
        navbar.style.boxShadow = 'none';
        navbar.style.borderBottom = 'none';
    }
});

// Mobile Navigation Toggle
burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    
    // Burger Animation
    burger.classList.toggle('toggle');
    
    // Add glitch effect on toggle
    if (navLinks.classList.contains('nav-active')) {
        glitchEffect(navLinks);
    }
});

// Glitch Effect Function
function glitchEffect(element) {
    const glitchDuration = 500; // ms
    const glitchInterval = 50; // ms
    
    let startTime = Date.now();
    let glitchTimer = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        
        if (elapsedTime >= glitchDuration) {
            clearInterval(glitchTimer);
            element.style.transform = '';
            element.style.opacity = '1';
            return;
        }
        
        // Random glitch effect
        if (Math.random() > 0.5) {
            element.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
            element.style.opacity = Math.random() * 0.5 + 0.5;
        } else {
            element.style.transform = '';
            element.style.opacity = '1';
        }
    }, glitchInterval);
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            burger.classList.remove('toggle');
        }
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Add scan line effect when scrolling
            const scanLine = document.createElement('div');
            scanLine.classList.add('scan-line-effect');
            document.body.appendChild(scanLine);
            
            setTimeout(() => {
                document.body.removeChild(scanLine);
            }, 1000);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for navbar height
                behavior: 'smooth'
            });
        }
    });
});

// Sound Effects
function playSuccessSound() {
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-complete-or-approved-mission-205.mp3');
    audio.volume = 0.5;
    audio.play();
}

function playErrorSound() {
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-retro-arcade-game-over-470.mp3');
    audio.volume = 0.5;
    audio.play();
}

function playClickSound() {
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-arcade-mechanical-bling-210.mp3');
    audio.volume = 0.5;
    audio.play();
}

function playToggleSound() {
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-unlock-game-notification-253.mp3');
    audio.volume = 0.5;
    audio.play();
}

// Add animation for skill bars
function animateSkills() {
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(skill => {
        // Reset to 0 width first
        skill.style.width = '0';
        
        // Get the data-width attribute
        const width = skill.getAttribute('data-width');
        
        // Animate width with a slight delay for each skill
        setTimeout(() => {
            // Remove any inline styles that might be overriding
            skill.style.transition = 'width 1.5s ease-in-out';
            skill.style.width = width;
        }, 300);
    });
}

// Animate elements when they come into view
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Add glitch effect when section comes into view
            glitchEffect(entry.target);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add animation classes to timeline items
document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    item.style.transitionDelay = `${index * 0.2}s`;
    
    setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    }, 500);
});

// Add CSS for burger menu toggle animation
const style = document.createElement('style');
style.textContent = `
    .toggle .line1 {
        transform: rotate(-45deg) translate(-5px, 6px);
        box-shadow: 0 0 10px var(--primary-color);
    }
    .toggle .line2 {
        opacity: 0;
    }
    .toggle .line3 {
        transform: rotate(45deg) translate(-5px, -6px);
        box-shadow: 0 0 10px var(--primary-color);
    }
    
    .scan-line-effect {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: linear-gradient(90deg, 
            var(--primary-color), 
            var(--secondary-color), 
            var(--accent-color), 
            var(--secondary-color), 
            var(--primary-color));
        box-shadow: 0 0 10px var(--primary-color), 0 0 20px var(--primary-color);
        z-index: 9999;
        animation: scanDown 1s linear;
    }
    
    @keyframes scanDown {
        0% {
            top: 0;
        }
        100% {
            top: 100vh;
        }
    }
    
    .pixel-cursor {
        display: inline-block;
        width: 10px;
        height: 20px;
        background-color: var(--primary-color);
        box-shadow: 0 0 10px var(--primary-color);
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 49% {
            opacity: 1;
        }
        50%, 100% {
            opacity: 0;
        }
    }
`;

document.head.appendChild(style);

// Create Dark Mode Toggle (always dark mode for retro theme)
const createDarkModeToggle = () => {
    document.body.classList.add('dark-mode');
}

// Create Scroll Top Button
const createScrollTopButton = () => {
    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);
    
    // Style the button with neon effect
    scrollTopBtn.style.backgroundColor = 'transparent';
    scrollTopBtn.style.border = '2px solid var(--primary-color)';
    scrollTopBtn.style.boxShadow = '0 0 10px var(--primary-color)';
    scrollTopBtn.style.color = 'var(--primary-color)';
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        // Add scan line effect when scrolling to top
        const scanLine = document.createElement('div');
        scanLine.classList.add('scan-line-effect');
        document.body.appendChild(scanLine);
        
        setTimeout(() => {
            document.body.removeChild(scanLine);
        }, 1000);
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Create Pixel Cursor Effect
const createPixelCursor = () => {
    const cursor = document.createElement('div');
    cursor.className = 'pixel-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX + 5}px`;
        cursor.style.top = `${e.clientY}px`;
    });
}

// Initialize Typing Animation
const initTypingAnimation = () => {
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero h2');
    
    if (heroTitle && heroSubtitle) {
        const titleText = heroTitle.textContent;
        const subtitleText = heroSubtitle.textContent;
        
        heroTitle.textContent = '';
        heroSubtitle.textContent = '';
        
        let titleIndex = 0;
        let subtitleIndex = 0;
        let titleDone = false;
        
        function typeTitle() {
            if (titleIndex < titleText.length) {
                heroTitle.textContent += titleText.charAt(titleIndex);
                titleIndex++;
                setTimeout(typeTitle, 100);
            } else {
                titleDone = true;
                setTimeout(typeSubtitle, 500);
            }
        }
        
        function typeSubtitle() {
            if (subtitleIndex < subtitleText.length) {
                heroSubtitle.textContent += subtitleText.charAt(subtitleIndex);
                subtitleIndex++;
                setTimeout(typeSubtitle, 50);
            }
        }
        
        setTimeout(typeTitle, 1000);
    }
}

// Add Hover Effects to Buttons
const addButtonHoverEffects = () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px)';
            button.style.boxShadow = '0 0 15px var(--primary-color), 0 0 30px var(--primary-color)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
            button.style.boxShadow = '';
        });
        
        button.addEventListener('click', () => {
            playSuccessSound();
        });
    });
}

// Create Floating Pixels
const createFloatingPixels = () => {
    const pixelsContainer = document.querySelector('.game-pixels');
    const colors = [
        'var(--primary-color)',
        'var(--secondary-color)',
        'var(--accent-color)',
        'var(--warning-color)',
        'var(--danger-color)'
    ];
    
    // Create 50 pixels
    for (let i = 0; i < 50; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random size (2-6px)
        const size = Math.random() * 4 + 2;
        
        // Random color from our palette
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Random animation duration (10-30s)
        const duration = Math.random() * 20 + 10;
        
        // Random delay
        const delay = Math.random() * 5;
        
        // Apply styles
        pixel.style.left = `${posX}%`;
        pixel.style.top = `${posY}%`;
        pixel.style.width = `${size}px`;
        pixel.style.height = `${size}px`;
        pixel.style.backgroundColor = color;
        pixel.style.boxShadow = `0 0 5px ${color}`;
        pixel.style.animation = `float ${duration}s linear infinite`;
        pixel.style.animationDelay = `-${delay}s`;
        
        pixelsContainer.appendChild(pixel);
    }
};

// Create Cute Pixel Characters
const createPixelCharacters = () => {
    const charactersContainer = document.querySelector('.pixel-characters');
    
    // Character types with their CSS
    const characters = [
        {
            name: 'mushroom',
            css: `
                width: 40px;
                height: 40px;
                position: absolute;
                bottom: 20px;
                left: 10%;
                z-index: 10;
                animation: bounce 2s infinite alternate;
            `,
            html: `
                <div class="pixel-character-head" style="
                    width: 40px;
                    height: 20px;
                    background-color: #ff6e6e;
                    border-radius: 20px 20px 0 0;
                    position: relative;
                ">
                    <div style="
                        position: absolute;
                        width: 8px;
                        height: 8px;
                        background-color: white;
                        border-radius: 50%;
                        top: 5px;
                        left: 8px;
                    "></div>
                    <div style="
                        position: absolute;
                        width: 6px;
                        height: 6px;
                        background-color: white;
                        border-radius: 50%;
                        top: 8px;
                        right: 10px;
                    "></div>
                </div>
                <div class="pixel-character-body" style="
                    width: 20px;
                    height: 20px;
                    background-color: #f5f5f5;
                    margin: 0 auto;
                "></div>
            `
        },
        {
            name: 'star',
            css: `
                width: 40px;
                height: 40px;
                position: absolute;
                top: 15%;
                right: 15%;
                z-index: 10;
                animation: float 3s infinite alternate;
            `,
            html: `
                <div class="pixel-star" style="
                    width: 40px;
                    height: 40px;
                    background-color: #fffb96;
                    clip-path: polygon(
                        50% 0%, 
                        61% 35%, 
                        98% 35%, 
                        68% 57%, 
                        79% 91%, 
                        50% 70%, 
                        21% 91%, 
                        32% 57%, 
                        2% 35%, 
                        39% 35%
                    );
                    position: relative;
                ">
                    <div style="
                        position: absolute;
                        width: 6px;
                        height: 6px;
                        background-color: #01cdfe;
                        border-radius: 50%;
                        top: 15px;
                        left: 12px;
                    "></div>
                    <div style="
                        position: absolute;
                        width: 6px;
                        height: 6px;
                        background-color: #01cdfe;
                        border-radius: 50%;
                        top: 15px;
                        right: 12px;
                    "></div>
                    <div style="
                        position: absolute;
                        width: 8px;
                        height: 3px;
                        background-color: #01cdfe;
                        border-radius: 2px;
                        bottom: 12px;
                        left: 16px;
                    "></div>
                </div>
            `
        },
        {
            name: 'cloud',
            css: `
                width: 60px;
                height: 40px;
                position: absolute;
                top: 10%;
                left: 20%;
                z-index: 10;
                animation: floatSlow 8s infinite alternate;
            `,
            html: `
                <div class="pixel-cloud" style="
                    width: 60px;
                    height: 30px;
                    background-color: #01cdfe;
                    border-radius: 15px;
                    position: relative;
                ">
                    <div style="
                        position: absolute;
                        width: 25px;
                        height: 25px;
                        background-color: #01cdfe;
                        border-radius: 50%;
                        top: -10px;
                        left: 10px;
                    "></div>
                    <div style="
                        position: absolute;
                        width: 20px;
                        height: 20px;
                        background-color: #01cdfe;
                        border-radius: 50%;
                        top: -5px;
                        left: 30px;
                    "></div>
                </div>
            `
        },
        {
            name: 'heart',
            css: `
                width: 40px;
                height: 40px;
                position: absolute;
                bottom: 30%;
                right: 10%;
                z-index: 10;
                animation: pulse 1.5s infinite;
            `,
            html: `
                <div class="pixel-heart" style="
                    width: 40px;
                    height: 40px;
                    position: relative;
                ">
                    <div style="
                        background-color: #05ffa1;
                        height: 30px;
                        width: 30px;
                        transform: rotate(45deg);
                        position: absolute;
                        bottom: 0;
                        right: 0;
                    "></div>
                    <div style="
                        background-color: #05ffa1;
                        height: 30px;
                        width: 30px;
                        border-radius: 50%;
                        position: absolute;
                        bottom: 15px;
                        left: 0;
                    "></div>
                    <div style="
                        background-color: #05ffa1;
                        height: 30px;
                        width: 30px;
                        border-radius: 50%;
                        position: absolute;
                        bottom: 15px;
                        right: 15px;
                    "></div>
                </div>
            `
        }
    ];
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            0% {
                transform: translateY(0);
            }
            100% {
                transform: translateY(-10px);
            }
        }
        
        @keyframes float {
            0% {
                transform: translateY(0) rotate(0deg);
            }
            50% {
                transform: translateY(-15px) rotate(10deg);
            }
            100% {
                transform: translateY(-5px) rotate(-10deg);
            }
        }
        
        @keyframes floatSlow {
            0% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(100px);
            }
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.1);
            }
            100% {
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Create and add each character
    characters.forEach(character => {
        const charElement = document.createElement('div');
        charElement.className = `pixel-character ${character.name}`;
        charElement.style = character.css;
        charElement.innerHTML = character.html;
        charactersContainer.appendChild(charElement);
    });
    
    // Add some random small stars in the background
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.className = 'pixel-small-star';
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random size (3-8px)
        const size = Math.random() * 5 + 3;
        
        // Random animation duration
        const duration = Math.random() * 3 + 2;
        
        star.style = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background-color: #fffb96;
            clip-path: polygon(
                50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%,
                50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%
            );
            left: ${posX}%;
            top: ${posY}%;
            z-index: 5;
            animation: twinkle ${duration}s infinite alternate;
        `;
        
        charactersContainer.appendChild(star);
    }
    
    // Add twinkling animation
    style.textContent += `
        @keyframes twinkle {
            0% {
                opacity: 0.3;
                transform: scale(0.8);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
};

// Create Game UI Elements
const createGameUI = () => {
    // Create score display
    const scoreDisplay = document.createElement('div');
    scoreDisplay.className = 'game-score';
    scoreDisplay.innerHTML = 'SCORE: <span>0</span>';
    document.body.appendChild(scoreDisplay);
    
    // Create level display
    const levelDisplay = document.createElement('div');
    levelDisplay.className = 'game-level';
    levelDisplay.innerHTML = 'LEVEL: <span>1</span>';
    document.body.appendChild(levelDisplay);
    
    // Add CSS for game UI
    const style = document.createElement('style');
    style.textContent = `
        .game-score, .game-level {
            position: fixed;
            top: 20px;
            font-family: 'Press Start 2P', cursive;
            font-size: 0.8rem;
            color: var(--primary-color);
            text-shadow: 0 0 5px var(--primary-color);
            background-color: rgba(10, 10, 22, 0.8);
            padding: 10px;
            border: 2px solid var(--primary-color);
            box-shadow: 0 0 10px var(--primary-color);
            z-index: 1000;
        }
        
        .game-score {
            left: 20px;
        }
        
        .game-level {
            right: 20px;
        }
    `;
    document.head.appendChild(style);
    
    // Increment score when clicking on elements
    let score = 0;
    let level = 1;
    
    document.querySelectorAll('a, button, .btn').forEach(element => {
        element.addEventListener('click', () => {
            score += 10;
            scoreDisplay.querySelector('span').textContent = score;
            
            // Level up every 100 points
            if (score % 100 === 0) {
                level++;
                levelDisplay.querySelector('span').textContent = level;
                
                // Play level up sound
                const levelUpSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-complete-or-approved-mission-205.mp3');
                levelUpSound.volume = 0.3;
                levelUpSound.play();
                
                // Add level up animation
                const levelUpAnimation = document.createElement('div');
                levelUpAnimation.className = 'level-up-animation';
                levelUpAnimation.textContent = 'LEVEL UP!';
                document.body.appendChild(levelUpAnimation);
                
                setTimeout(() => {
                    document.body.removeChild(levelUpAnimation);
                }, 2000);
            }
        });
    });
    
    // Add CSS for level up animation
    style.textContent += `
        .level-up-animation {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: 'Press Start 2P', cursive;
            font-size: 2rem;
            color: var(--warning-color);
            text-shadow: 0 0 10px var(--warning-color);
            animation: levelUp 2s forwards;
            z-index: 1000;
        }
        
        @keyframes levelUp {
            0% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5);
            }
            50% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1.2);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(1);
            }
        }
    `;
};

// Create Game Easter Eggs
const addGameEasterEggs = () => {
    // Konami Code
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        // Check if the key matches the next key in the Konami Code
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            // If the full Konami Code is entered
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function activateEasterEgg() {
        // Play special sound
        const easterEggSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3');
        easterEggSound.volume = 0.3;
        easterEggSound.play();
        
        // Create Easter Egg animation
        const easterEggAnimation = document.createElement('div');
        easterEggAnimation.className = 'easter-egg-animation';
        easterEggAnimation.innerHTML = 'CHEAT CODE ACTIVATED!<br>UNLIMITED POWER!';
        document.body.appendChild(easterEggAnimation);
        
        // Add rainbow effect to all headings
        document.querySelectorAll('h1, h2, h3').forEach(heading => {
            heading.classList.add('rainbow-text');
        });
        
        setTimeout(() => {
            document.body.removeChild(easterEggAnimation);
            
            // Remove rainbow effect after 10 seconds
            setTimeout(() => {
                document.querySelectorAll('.rainbow-text').forEach(element => {
                    element.classList.remove('rainbow-text');
                });
            }, 10000);
        }, 3000);
    }
    
    // Add CSS for Easter Egg
    const style = document.createElement('style');
    style.textContent = `
        .easter-egg-animation {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: 'Press Start 2P', cursive;
            font-size: 1.5rem;
            text-align: center;
            color: #fff;
            background-color: rgba(10, 10, 22, 0.9);
            padding: 20px;
            border: 4px solid gold;
            box-shadow: 0 0 20px gold;
            z-index: 1000;
            animation: easterEgg 3s forwards;
        }
        
        @keyframes easterEgg {
            0% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5);
            }
            10%, 90% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(1.5);
            }
        }
        
        .rainbow-text {
            animation: rainbowText 2s linear infinite;
        }
        
        @keyframes rainbowText {
            0% { color: #ff0000; text-shadow: 0 0 10px #ff0000; }
            14% { color: #ff7f00; text-shadow: 0 0 10px #ff7f00; }
            28% { color: #ffff00; text-shadow: 0 0 10px #ffff00; }
            42% { color: #00ff00; text-shadow: 0 0 10px #00ff00; }
            57% { color: #0000ff; text-shadow: 0 0 10px #0000ff; }
            71% { color: #4b0082; text-shadow: 0 0 10px #4b0082; }
            85% { color: #9400d3; text-shadow: 0 0 10px #9400d3; }
            100% { color: #ff0000; text-shadow: 0 0 10px #ff0000; }
        }
    `;
    document.head.appendChild(style);
};

// Mobile Navigation
const initMobileNav = () => {
    const navToggle = document.querySelector('.navbar-toggle');
    const navMenu = document.querySelector('.navbar-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.navbar-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
};

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    createDarkModeToggle();
    createScrollTopButton();
    initTypingAnimation();
    addButtonHoverEffects();
    createFloatingPixels();
    addGameEasterEggs();
    initMobileNav();
    
    // Initialize skill bars with 0 width
    document.querySelectorAll('.skill-level').forEach(skill => {
        skill.style.width = '0';
    });
    
    // Create an intersection observer for the skills section
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate skills when they come into view
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(skillsSection);
    }
});
