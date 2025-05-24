// js/home.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Fungsionalitas Slideshow Hero Section ---
    const slides = document.querySelectorAll('.hero-slide');
    const dotsContainer = document.querySelector('.slide-dots');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const spotlightDisplay = document.querySelector('.product-spotlight-display');

    let currentSlide = 0;
    let slideInterval;
    const slideTitles = ["Kuliner Nusantara", "Kerajinan Unggul", "Petualangan Budaya"];

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
            slide.style.transform = 'scale(1.05)';
        });
        if (dotsContainer) { // Pastikan dotsContainer ada sebelum query
            document.querySelectorAll('.slide-dots .dot').forEach(dot => dot.classList.remove('active'));
        }


        slides[index].classList.add('active');
        slides[index].style.opacity = '1';
        slides[index].style.transform = 'scale(1)';

        if (dotsContainer) { // Pastikan dotsContainer ada sebelum query
            const dots = document.querySelectorAll('.slide-dots .dot');
            if (dots[index]) {
                dots[index].classList.add('active');
            }
        }


        if (spotlightDisplay) {
            spotlightDisplay.textContent = slideTitles[index];
            spotlightDisplay.style.opacity = '1';
            setTimeout(() => {
                spotlightDisplay.style.opacity = '0';
            }, 4000);
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    if (dotsContainer) {
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
                resetSlideInterval();
            });
            dotsContainer.appendChild(dot);
        });
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideShow();
    }

    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        resetSlideInterval();
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        resetSlideInterval();
    });

    if (slides.length > 0) {
        showSlide(currentSlide);
        startSlideShow();
    }

    // --- Observer untuk Animasi Reveal Bagian ---
    const revealElements = document.querySelectorAll('.about-image-content, .category-card, .game-option');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('about-image-content')) {
                    entry.target.classList.add('reveal-image');
                } else if (entry.target.classList.contains('category-card')) {
                    entry.target.classList.add('reveal-card');
                } else if (entry.target.classList.contains('game-option')) {
                     entry.target.classList.add('reveal-card'); // Menggunakan kelas yang sama untuk animasi
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });
});