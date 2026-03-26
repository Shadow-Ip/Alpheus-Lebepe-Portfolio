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

// ===================== Particle Background Logic ===============================
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

// ====================== Scroll Reveal Animation ================================
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

// ==================== Animated Skill Bars Logic ==================================
/*
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

const skillsObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            console.log("Skills triggered")
            animateSkillBars();
        }

    });

}, { threshold: 0.2 });

if (skillsSection){
    skillsObserver.observe(skillsSection);
}


// Mobile fallback

window.addEventListener("load", () => {

    if (window.innerWidth <= 768) {
        animateSkillBars();
    }

});

window.addEventListener("load", () => {

    const skillsSection = document.getElementById('skills');

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target); // run once only
            }
        });
    }, { threshold: 0.3 });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

});


function checkSkillsInView() {
    if (skillsAnimated) return;

    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const rect = skillsSection.getBoundingClientRect();

    if (rect.top < window.innerHeight * 0.8) {
        animateSkillBars();
        skillsAnimated = true;
        window.removeEventListener('scroll', checkSkillsInView);
    }
}

// Run on scroll
window.addEventListener('scroll', checkSkillsInView);

// Run once on load (in case already visible)
window.addEventListener('load', checkSkillsInView);

*/


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

// ======================= Scroll Progress Bar ================================

const scrollBar = document.querySelector(".scroll-bar");

window.addEventListener("scroll", () => {

const scrollTop = document.documentElement.scrollTop;

const scrollHeight =
document.documentElement.scrollHeight -
document.documentElement.clientHeight;

const scrollPercent = (scrollTop / scrollHeight) * 100;

scrollBar.style.width = scrollPercent + "%";

});


// ==================== Cursor Glow ===========================================

const glow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", (e) => {

glow.style.left = e.clientX + "px";
glow.style.top = e.clientY + "px";

});

window.addEventListener("mousedown", () => {
glow.style.transform = "translate(-50%, -50%) scale(1.2)";
});

window.addEventListener("mouseup", () => {
glow.style.transform = "translate(-50%, -50%) scale(1)";
});

// ===================== Magnetic Buttons ==============================
const magnets = document.querySelectorAll(".magnetic");

magnets.forEach(btn => {

btn.addEventListener("mousemove", (e) => {

const rect = btn.getBoundingClientRect();
const strength = 1;

const x = e.clientX - rect.left - rect.width / 2;
const y = e.clientY - rect.top - rect.height / 2;

btn.style.transform = `translate(${x * strength}px, ${y * strength}px) scale(1.05)`;

});

btn.addEventListener("mouseleave", () => {

btn.style.transform = "translate(0, 0) scale(1)";
});
});

// ===================== Module card ============================
// tilt to mouse direction
/*
document.querySelectorAll(".move-tilt").forEach(card => {

    const inner = card.querySelector(".move-inner");

    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = (y - rect.height / 2) / 12;
        const rotateY = (rect.width / 2 - x) / 12;

        inner.style.transform = `
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.05)
        `;

        
        card.style.setProperty("--x", `${x}px`);
        card.style.setProperty("--y", `${y}px`);
    });

    card.addEventListener("mouseleave", () => {
        inner.style.transform = "rotateY(0deg) rotateX(0deg)";
    });

});

document.querySelectorAll(".move-tilt").forEach(card => {

    card.addEventListener("mouseenter", () => {
        particles.forEach(p => {
            p.speedX *= 2;
            p.speedY *= 2;
        });
    });

    card.addEventListener("mouseleave", () => {
        particles.forEach(p => {
            p.speedX *= 0.5;
            p.speedY *= 0.5;
        });
    });

});*/



// replace below

document.querySelectorAll(".module-card").forEach(card => {

    const inner = card.querySelector(".module-inner");

    //  CLICK (for mobile)
    card.addEventListener("click", () => {
        card.classList.toggle("flip");
    });

    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = (y - rect.height / 2) / 10;
        const rotateY = (rect.width / 2 - x) / 10;

        // CHECK BOTH STATES
        const isFlipped =
            card.classList.contains("flip") || card.matches(":hover");

        inner.style.transform = `
            rotateY(${isFlipped ? 180 : 0}deg)
            rotateX(${rotateX}deg)
            scale(1.05)
        `;

        card.style.setProperty("--x", `${x}px`);
        card.style.setProperty("--y", `${y}px`);
    });

    card.addEventListener("mouseleave", () => {
        const isFlipped = card.classList.contains("flip");

        inner.style.transform = `
            rotateY(${isFlipped ? 180 : 0}deg)
            rotateX(0deg)
            scale(1)
        `;
    });

});



// ==================== Animated Skill Bars Logic ==================================

let skillsAnimated = false;

function animateSkillBars() {

    if (skillsAnimated) return;

    const bars = document.querySelectorAll('.skill-bar-fill');
    const percents = document.querySelectorAll('.skill-percent');

    bars.forEach(bar => {
        const width = bar.dataset.width;
        bar.style.width = width;
    });

    percents.forEach(percent => {

        const target = +percent.dataset.target;
        const level = percent.dataset.level;

        let current = 0;
        const increment = target / 40;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                percent.innerText = Math.floor(current) + "% • " + level;
                requestAnimationFrame(updateCounter);
            } else {
                percent.innerText = target + "% • " + level;
            }
        };

        updateCounter();
    });

    skillsAnimated = true;
}


// ==================== Scroll Trigger ==================

function checkSkillsInView() {

    if (skillsAnimated) return;

    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const rect = skillsSection.getBoundingClientRect();

    if (rect.top < window.innerHeight * 0.8) {
        animateSkillBars(); // now it exists 
        window.removeEventListener('scroll', checkSkillsInView);
    }
}

window.addEventListener('scroll', checkSkillsInView);
window.addEventListener('load', checkSkillsInView);


// Mobile fallback

window.addEventListener("load", () => {

    if (window.innerWidth <= 768) {
        animateSkillBars();
    }

});

// ===== CERTIFICATE MODAL =====
/*
const certImg = document.querySelector(".certificate-image img");
const modal = document.getElementById("certModal");
const modalImg = document.getElementById("certModalImg");
const closeBtn = document.querySelector(".cert-close");

if (certImg) {
    certImg.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImg.src = certImg.src;
    });
}

 Close on X
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

Close on background click
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});*/

// ===== CERTIFICATE and BPMN MODAL PRO (Zoom + Drag + Keyboard) =====
/*
const certImg = document.querySelector(".certificate-image img");
const modal = document.getElementById("certModal");
const modalImg = document.getElementById("certModalImg");
const closeBtn = document.querySelector(".cert-close");

const bpmnImg = document.querySelector(".case-image img");
const modal2 = document.getElementById("bpmnModal");
const modalImg2 = document.getElementById("bpmnModalImg");
const closeBtn2 = document.querySelector(".bpmn-close");

let scale = 1;
let isDragging = false;
let startX, startY, translateX = 0, translateY = 0;

// OPEN
if (certImg) {
    certImg.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImg.src = certImg.src;
        resetImage();
    });
}

if (bpmnImg) {
    bpmnImg.addEventListener("click", () => {
        modal2.style.display = "flex";
        modalImg2.src = bpmnImg.src;
        resetImage();
    });
}

// CLOSE
function closeModal() {
    modal.style.display = "none";
    modal2.style.display = "none";
}

closeBtn.addEventListener("click", closeModal);
closeBtn2.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});

modal2.addEventListener("click", (e) => {
    if (e.target === modal2) closeModal();
});
// ===== ZOOM (scroll) =====
modal.addEventListener("wheel", (e) => {
    e.preventDefault();

    scale += e.deltaY * -0.001;
    scale = Math.min(Math.max(1, scale), 3);

    updateTransform();
});

modal2.addEventListener("wheel", (e) => {
    e.preventDefault();

    scale += e.deltaY * -0.001;
    scale = Math.min(Math.max(1, scale), 3);

    updateTransform();
});
// ===== DRAG =====
modalImg.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    modal.style.cursor = "grabbing";
});

modalImg2.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    modal2.style.cursor = "grabbing";
});

window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    translateX = e.clientX - startX;
    translateY = e.clientY - startY;

    updateTransform();
});

window.addEventListener("mouseup", () => {
    isDragging = false;
    modal.style.cursor = "default";
    modal2.style.cursor = "default";

});

// ===== KEYBOARD CONTROLS =====
window.addEventListener("keydown", (e) => {
    if (modal.style.display !== "flex") return;
    if (modal2.style.display !== "flex") return;

    if (e.key === "Escape") closeModal();
    if (e.key === "+") scale = Math.min(scale + 0.2, 3);
    if (e.key === "-") scale = Math.max(scale - 0.2, 1);

    updateTransform();
});

// ===== HELPERS =====
function updateTransform() {
    modalImg.style.transform =
        `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    modalImg2.style.transform =
        `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

function resetImage() {
    scale = 1;
    translateX = 0;
    translateY = 0;
    updateTransform();
}*/

// ===== CERTIFICATE + BPMN MODAL (FIXED PRO VERSION) =====

const certImg = document.querySelector(".certificate-image img");
const modal = document.getElementById("certModal");
const modalImg = document.getElementById("certModalImg");
const closeBtn = document.querySelector(".cert-close");

const bpmnImg = document.querySelector(".case-image img");
const modal2 = document.getElementById("bpmnModal");
const modalImg2 = document.getElementById("bpmnModalImg");
const closeBtn2 = document.querySelector(".bpmn-close");

let scale = 1;
let isDragging = false;
let startX = 0, startY = 0;
let translateX = 0, translateY = 0;

// TRACK WHICH MODAL IS ACTIVE
let activeModal = null;
let activeImg = null;


// ===== OPEN =====
if (certImg) {
    certImg.addEventListener("click", () => {
        openModal(modal, modalImg, certImg.src);
    });
}

if (bpmnImg) {
    bpmnImg.addEventListener("click", () => {
        openModal(modal2, modalImg2, bpmnImg.src);
    });
}

function openModal(modalEl, imgEl, src) {
    modalEl.style.display = "flex";
    imgEl.src = src;

    activeModal = modalEl;
    activeImg = imgEl;

    resetImage();
}

// ===== CLOSE =====
function closeModal() {
    if (activeModal) {
        activeModal.style.display = "none";
    }

    activeModal = null;
    activeImg = null;
}

closeBtn.addEventListener("click", closeModal);
closeBtn2.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});

modal2.addEventListener("click", (e) => {
    if (e.target === modal2) closeModal();
});
// ===== ZOOM (scroll) =====
modal.addEventListener("wheel", (e) => {
    e.preventDefault();

    scale += e.deltaY * -0.001;
    scale = Math.min(Math.max(1, scale), 3);

    updateTransform();
});

modal2.addEventListener("wheel", (e) => {
    e.preventDefault();

    scale += e.deltaY * -0.001;
    scale = Math.min(Math.max(1, scale), 3);

    updateTransform();
});
// ===== ZOOM =====
/*window.addEventListener("wheel", (e) => {
    if (!activeModal) return;

    e.preventDefault();

    scale += e.deltaY * -0.001;
    scale = Math.min(Math.max(1, scale), 3);

    updateTransform();
}, { passive: false });*/

// ===== DRAG =====
window.addEventListener("mousedown", (e) => {
    if (!activeImg) return;

    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;

    activeModal.style.cursor = "grabbing";
});

window.addEventListener("mousemove", (e) => {
    if (!isDragging || !activeImg) return;

    translateX = e.clientX - startX;
    translateY = e.clientY - startY;

    updateTransform();
});

window.addEventListener("mouseup", () => {
    isDragging = false;

    if (activeModal) {
        activeModal.style.cursor = "default";
    }
});

// ===== KEYBOARD =====
window.addEventListener("keydown", (e) => {
    if (!activeImg) return;

    if (e.key === "Escape") closeModal();
    if (e.key === "+") scale = Math.min(scale + 0.2, 3);
    if (e.key === "-") scale = Math.max(scale - 0.2, 1);

    updateTransform();
});

// ===== HELPERS =====
function updateTransform() {
    if (!activeImg) return;

    activeImg.style.transform =
        `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

function resetImage() {
    scale = 1;
    translateX = 0;
    translateY = 0;
    updateTransform();
}