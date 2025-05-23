let slideIndex = 0; // Start with index 0
let slideshowInterval;
const slides = document.querySelectorAll(".hero-slide");
const dotsContainer = document.querySelector(".slide-dots");
const productSpotlightDisplay = document.querySelector(".product-spotlight-display");
const nextBtn = document.querySelector(".next-slide");
const prevBtn = document.querySelector(".prev-slide");
const heroSection = document.querySelector('.hero-section'); // For hover pause

// Function to create dots
function createDots() {
    slides.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        dot.addEventListener("click", () => {
            currentSlide(i);
            resetSlideshow(); // Reset timer on manual dot click
        });
        dotsContainer.appendChild(dot);
    });
}

// Function to display slides
function showSlides(n) {
    // Ensure n is within bounds
    if (n >= slides.length) {
        slideIndex = 0;
    }
    if (n < 0) {
        slideIndex = slides.length - 1;
    }

    // Reset all slides and dots
    slides.forEach(slide => {
        slide.classList.remove('active');
        // Reset animations by removing and re-adding classes for fresh animation on next activation
        slide.querySelectorAll('.animate-fade-in-up').forEach(el => {
            el.classList.remove('animate-fade-in-up');
            el.offsetHeight; // Trigger reflow
        });
    });

    Array.from(dotsContainer.children).forEach(dot => {
        dot.classList.remove("active");
    });

    // Activate current slide and dot
    slides[slideIndex].classList.add('active');
    Array.from(dotsContainer.children)[slideIndex].classList.add("active");

    // Apply animations to current slide's content
    slides[slideIndex].querySelectorAll('.animate-fade-in-up').forEach(el => {
        el.classList.add('animate-fade-in-up'); // Re-add animation class
    });

    // Update dynamic product spotlight
    const productName = slides[slideIndex].dataset.product;
    productSpotlightDisplay.textContent = productName;
    productSpotlightDisplay.style.opacity = 1; // Make visible
    productSpotlightDisplay.style.transform = 'translateX(-50%) translateY(0)';
}

// Next/previous controls
function plusSlides(n) {
    slideIndex += n;
    showSlides(slideIndex);
    resetSlideshow(); // Reset timer on manual arrow click
}

// Thumbnail image controls
function currentSlide(n) {
    slideIndex = n;
    showSlides(slideIndex);
    resetSlideshow(); // Reset timer on manual dot click
}

// Automatic Slideshow control
function startSlideshow() {
    slideshowInterval = setInterval(() => {
        plusSlides(1);
    }, 6000); // Change image every 6 seconds for a more relaxed pace
}

function stopSlideshow() {
    clearInterval(slideshowInterval);
}

function resetSlideshow() {
    stopSlideshow();
    startSlideshow();
}

// Initialize slideshow on page load
document.addEventListener("DOMContentLoaded", () => {
    createDots(); // Create dots dynamically
    showSlides(slideIndex); // Show initial slide
    startSlideshow(); // Start the automatic slideshow

    // Add event listeners for navigation buttons
    if (nextBtn) nextBtn.addEventListener('click', () => plusSlides(1));
    if (prevBtn) prevBtn.addEventListener('click', () => plusSlides(-1));

    // Pause slideshow on hover over the hero section
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopSlideshow);
        heroSection.addEventListener('mouseleave', startSlideshow);
    }
});