// ============= JavaScript for Alpheus Portfolio Website =============

// ============= Loading Overlay Logic ===============
window.addEventListener('load', function(){
    this.setTimeout(() => {
        document.getElementById('loadingOverlay').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loadingOverlay').style.display = 'none';
        }, 600);
    }, 1600);
});

// ============= Theme Toggle Logic =============== 
const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('i');
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            
            if (document.body.classList.contains('light-mode')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                // Update LinkedIn badge theme
                updateLinkedInBadgeTheme('light');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                updateLinkedInBadgeTheme('dark');
            }
            
            // Update chart colors if they exist
            if (window.gradeChart) {
                updateChartColors();
            }
        });

        // Update LinkedIn badge theme
        function updateLinkedInBadgeTheme(theme) {
            const badge = document.querySelector('.LI-profile-badge');
            if (badge) {
                badge.setAttribute('data-theme', theme);
                if (window.LI && window.LI.parse) {
                    window.LI.parse();
                }
            }
        }

// ============= Mobile Menu Toggle Logic ===============
function toggleMobileMenu() {
            const menu = document.getElementById('mobileMenu');
            if (menu.style.display === 'none' || menu.style.display === '') {
                menu.style.display = 'block';
            } else {
                menu.style.display = 'none';
            }
        }
        
        function closeMobileMenu() {
            document.getElementById('mobileMenu').style.display = 'none';
        }

// ============= Typing Animation Logic ===============
    const dynamicText = document.getElementById('dynamicText');
        const texts = [
            'IT Systems Developer',
            'Android Developer', 
            'Full-Stack Developer',
            'Database Specialist'
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                dynamicText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                dynamicText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(typeEffect, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(typeEffect, 500);
            } else {
                setTimeout(typeEffect, isDeleting ? 50 : 100);
            }
        }
        setTimeout(typeEffect, 1000);




// ============== Mudule Explorer Logic ================
function toggleModule(module){
    module.classList.toggle('active');
}

// ============== Notification System Logic ================
function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
                existingNotification.remove();
            }
            
            // Create notification
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                    <span>${message}</span>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }

// ============== Particle Background Logic ================
    const canvas = document.getElementById('particles-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            
            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            
            window.addEventListener('resize', resizeCanvas);
            resizeCanvas();
            
            const particles = [];
            const particleCount = Math.min(80, window.innerWidth < 768 ? 50 : 80);
            
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 2 + 1,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    color: `rgba(0, 163, 224, ${Math.random() * 0.3 + 0.1})`
                });
            }
            
            function animateParticles() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                particles.forEach(particle => {
                    particle.x += particle.speedX;
                    particle.y += particle.speedY;
                    
                    if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
                    if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
                    
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                    ctx.fillStyle = particle.color;
                    ctx.fill();
                    
                    // Connect nearby particles (limit connections for performance)
                    particles.forEach(otherParticle => {
                        const dx = particle.x - otherParticle.x;
                        const dy = particle.y - otherParticle.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < 80) {
                            ctx.beginPath();
                            ctx.moveTo(particle.x, particle.y);
                            ctx.lineTo(otherParticle.x, otherParticle.y);
                            ctx.strokeStyle = `rgba(0, 163, 224, ${0.08 * (1 - distance/80)})`;
                            ctx.lineWidth = 0.4;
                            ctx.stroke();
                        }
                    });
                });
                
                requestAnimationFrame(animateParticles);
            }
            
            animateParticles();
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    if (typeof closeMobileMenu === "function") {
                        closeMobileMenu();
                    }
                }
            });
        });

        // ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const parent = entry.target.parentElement;
            const siblings = [...parent.children];

            siblings.forEach((el, index) => {

                if (el.classList.contains("reveal")) {

                    setTimeout(() => {
                        el.classList.add("active");
                    }, index * 400); // slower reveal

                }

            });

            revealObserver.unobserve(entry.target);

        }

    });

}, { threshold: 0.2 });

revealElements.forEach(el => revealObserver.observe(el));

// ============= Animated Skill Bars Logic ===============

let skillsAnimated = false;

function animateSkillBars() {

    if (skillsAnimated) return;

    const bars = document.querySelectorAll('.skill-bar-fill');
    const percents = document.querySelectorAll('.skill-percent');

    // Animate bars
    bars.forEach(bar => {
        const width = bar.dataset.width;
        bar.style.width = width;
    });

    // Animate numbers
    percents.forEach(percent => {

    const target = +percent.dataset.target;
    const level = percent.dataset.level;

    let current = 0;
    const increment = target / 40;

    const updateCounter = () => {

        if (current < target) {

            current += increment;

            percent.innerText =
                Math.floor(current) + "% • " + level;

            requestAnimationFrame(updateCounter);

        } else {

            percent.innerText =
                target + "% • " + level;

        }

    };

    updateCounter();

});

    skillsAnimated = true;
}

// Scroll trigger
const skillsSection = document.getElementById('skills');

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            animateSkillBars();
        }

    });

}, { threshold: 0.2 });

observer.observe(skillsSection);


// Mobile fallback
window.addEventListener("load", () => {

    if (window.innerWidth <= 768) {
        animateSkillBars();
    }

});


// ============== Contact Form EmailJS script ================

const form = document.getElementById("contact-form");
const messageBox = document.getElementById("form-message");
const button = document.querySelector(".send-btn");

form.addEventListener("submit", function(e){

e.preventDefault();

button.classList.add("loading");
button.innerHTML = "Sending...";

emailjs.send("service_c7qe3g8","template_xkyhb6h",{

first_name: document.getElementById("first_name").value,
last_name: document.getElementById("last_name").value,
email: document.getElementById("email").value,
message: document.getElementById("message").value

})
.then(function(){

button.classList.remove("loading");
button.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message & Let\'s Connect';

messageBox.classList.add("show");

form.reset();

setTimeout(()=>{

messageBox.classList.remove("show");

},5000);

})
.catch(function(){

button.classList.remove("loading");
button.innerHTML = "Send Message";

alert("Something went wrong. Please try again.");

});

});