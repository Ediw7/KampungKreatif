document.addEventListener('DOMContentLoaded', () => {
    // --- Fungsionalitas Slideshow Hero Section ---
    const slides = document.querySelectorAll('.hero-slide');
    const dotsContainer = document.querySelector('.slide-dots');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const spotlightDisplay = document.querySelector('.product-spotlight-display');

    let currentSlide = 0;
    let slideInterval;
    const slideTitles = ["Kuliner Khas", "Kreasi Batik", "Seni Wayang"]; // Sesuaikan dengan gambar

    // Fungsi untuk menampilkan slide
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
            slide.style.transform = 'scale(1.05)';
        });

        const dots = document.querySelectorAll('.slide-dots .dot');
        dots.forEach(dot => dot.classList.remove('active'));

        currentSlide = index;
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;

        slides[currentSlide].classList.add('active');
        slides[currentSlide].style.opacity = '1';
        slides[currentSlide].style.transform = 'scale(1)';

        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }

        if (spotlightDisplay) {
            spotlightDisplay.textContent = slideTitles[currentSlide];
            spotlightDisplay.style.opacity = '0'; // Reset opacity
            setTimeout(() => {
                spotlightDisplay.style.opacity = '1'; // Fade in
            }, 100);
            setTimeout(() => {
                spotlightDisplay.style.opacity = '0'; // Fade out setelah 4 detik
            }, 4000);
        }
    }

    // Fungsi untuk slide berikutnya dan sebelumnya
    function nextSlide() {
        showSlide((currentSlide + 1) % slides.length);
    }

    function prevSlide() {
        showSlide((currentSlide - 1 + slides.length) % slides.length);
    }

    // Buat dots untuk slideshow
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

    // Mulai slideshow otomatis
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideShow();
    }

    // Tambahkan event listener untuk tombol prev/next
    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        resetSlideInterval();
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        resetSlideInterval();
    });

    // Mulai slideshow jika ada slide
    if (slides.length > 0) {
        showSlide(currentSlide);
        startSlideShow();
    }

    // --- Animasi On Scroll ---
    const animateElements = document.querySelectorAll('.animate-fade-in-up, .animate-slide-up, .animate-zoom-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        observer.observe(el);
    });
});