// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initPreloader();
    initCustomCursor();
    initMobileMenu();
    initScrollAnimations();
    initPortfolioFilters();
    initBackToTop();
    initDarkMode();
    initContactForm();
    initTestimonialSlider();
    initClientSlider();
    initCounters();
    initSmoothScrolling();
    initLogoScrollToHero();
    initResponsiveChecks();
});

// Preloader
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;
    
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });
}

// Custom Cursor
function initCustomCursor() {
    const cursor = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (!cursor || !cursorOutline) return;
    
    // Check if it's a touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        cursor.style.display = 'none';
        cursorOutline.style.display = 'none';
        return;
    }
    
    document.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        cursor.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
        cursorOutline.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
    });
    
    // Add hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .portfolio-item, .filter-btn, .theme-toggle, .hamburger');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorOutline.style.transform = 'scale(1.5)';
            cursorOutline.style.opacity = '0.5';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorOutline.style.transform = 'scale(1)';
            cursorOutline.style.opacity = '1';
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!hamburger || !mobileMenu) return;
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    }
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Only hide header on scroll down if we're not on mobile
        if (window.innerWidth > 767) {
            if (currentScroll > lastScroll && currentScroll > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-card');
    
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
}

// Portfolio Filters
function initPortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterBtns.length === 0 || portfolioItems.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Dark Mode Toggle
function initDarkMode() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (!themeToggle) return;
    
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or system preference
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Update icon
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
        }
        
        // Save preference
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Basic form validation
        let hasError = false;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                hasError = true;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        
        if (hasError) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        try {
            // Here you would typically send the data to your server
            console.log('Form submitted:', data);
            
            // Show success message
            showFormMessage('Message sent successfully!', 'success');
            form.reset();
        } catch (error) {
            showFormMessage('Error sending message. Please try again.', 'error');
        }
    });
}

function showFormMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    // Remove any existing message
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    form.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.classList.add('form-message-hide');
        setTimeout(() => {
            messageDiv.remove();
        }, 300);
    }, 3000);
}

// Testimonial Slider
function initTestimonialSlider() {
    const slider = document.querySelector('.testimony-slider');
    
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.testimony-slide');
    const prevBtn = slider.querySelector('.testimony-prev');
    const nextBtn = slider.querySelector('.testimony-next');
    
    if (slides.length === 0 || !prevBtn || !nextBtn) return;
    
    let currentSlide = 0;
    let autoSlideInterval;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(${100 * (i - index)}%)`;
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });
    
    // Touch swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    }, { passive: true });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoSlide();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX - touchStartX > swipeThreshold) {
            // Swiped right
            prevSlide();
        } else if (touchStartX - touchEndX > swipeThreshold) {
            // Swiped left
            nextSlide();
        }
    }
    
    // Initialize first slide and start auto-slide
    showSlide(0);
    startAutoSlide();
}

// Client Logo Slider
function initClientSlider() {
    const track = document.querySelector('.clients-track');
    
    if (!track) return;
    
    const logos = track.querySelectorAll('.client-logo');
    
    if (logos.length === 0) return;
    
    // Clone logos for infinite scroll
    logos.forEach(logo => {
        const clone = logo.cloneNode(true);
        track.appendChild(clone);
    });
    
    // Calculate animation duration based on number of logos
    const duration = logos.length * 5;
    
    // Adjust animation for smaller screens
    function updateAnimation() {
        if (window.innerWidth <= 768) {
            track.style.animation = `scroll ${duration * 0.7}s linear infinite`;
        } else {
            track.style.animation = `scroll ${duration}s linear infinite`;
        }
    }
    
    updateAnimation();
    window.addEventListener('resize', updateAnimation);
}

// Number Counter Animation
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length === 0) return;
    
    const speed = 200;
    
    const updateCount = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => updateCount(counter), 1);
        } else {
            counter.innerText = target;
        }
    };
    
    const startCounting = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateCount(entry.target);
                observer.unobserve(entry.target);
            }
        });
    };
    
    // Use Intersection Observer API for better performance
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(startCounting, {
            threshold: 0.5
        });
        
        counters.forEach(counter => {
            counter.innerText = '0';
            observer.observe(counter);
        });
    } else {
        // Fallback for older browsers
        counters.forEach(counter => {
            counter.innerText = counter.getAttribute('data-target');
        });
    }
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                // Account for fixed header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize smooth scrolling for logo click to hero section
function initLogoScrollToHero() {
    const logoLink = document.querySelector('.logo a');
    
    if (!logoLink) return;
    
    logoLink.addEventListener('click', function(e) {
        e.preventDefault();
        const heroSection = document.getElementById('home');
        
        if (heroSection) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
}

// Handle responsive adjustments
function initResponsiveChecks() {
    // Check if it's a touch device and disable custom cursor
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
    }
    
    // Handle modal scrolling on mobile
    const modals = document.querySelectorAll('.portfolio-modal');
    modals.forEach(modal => {
        if (!modal) return;
        
        modal.addEventListener('touchmove', (e) => {
            e.stopPropagation();
        }, { passive: true });
    });
    
    // Resize event handlers
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            // Reset mobile menu when resized to desktop
            const hamburger = document.querySelector('.hamburger');
            const mobileMenu = document.querySelector('.mobile-menu');
            
            if (hamburger && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        }
    });
} 