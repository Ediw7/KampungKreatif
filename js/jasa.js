document.addEventListener('DOMContentLoaded', () => {
    // --- Service Card Hover Effect (CSS-driven for image zoom, testimoni) ---

    // --- Pop-up Modal for Service Details ---
    const serviceDetailModal = document.getElementById('serviceDetailModal');
    const closeButton = serviceDetailModal.querySelector('.close-button');
    const highlightsSlideshowContainer = serviceDetailModal.querySelector('.highlights-slideshow');
    const highlightsPrevBtn = serviceDetailModal.querySelector('.highlights-prev');
    const highlightsNextBtn = serviceDetailModal.querySelector('.highlights-next');

    let currentHighlightSlideIndex = 0;
    let highlightSlideshowInterval;

    function showHighlightsSlides(slides, n) {
        if (slides.length === 0) return;

        if (n >= slides.length) {
            currentHighlightSlideIndex = 0;
        }
        if (n < 0) {
            currentHighlightSlideIndex = slides.length - 1;
        }

        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentHighlightSlideIndex].classList.add('active');
    }

    function plusHighlightsSlides(slides, n) {
        currentHighlightSlideIndex += n;
        showHighlightsSlides(slides, currentHighlightSlideIndex);
        resetHighlightSlideshow(slides);
    }

    function startHighlightSlideshow(slides) {
        stopHighlightSlideshow(); // Clear any existing interval
        if (slides.length > 1) { // Only auto-slide if more than one image
            highlightSlideshowInterval = setInterval(() => {
                plusHighlightsSlides(slides, 1);
            }, 3000); // Change every 3 seconds
        }
    }

    function stopHighlightSlideshow() {
        clearInterval(highlightSlideshowInterval);
    }

    function resetHighlightSlideshow(slides) {
        stopHighlightSlideshow();
        startHighlightSlideshow(slides);
    }

    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', (event) => {
            // Check if a button inside the card was clicked, prevent modal if so
            if (event.target.tagName === 'BUTTON') {
                return;
            }

            const serviceName = card.dataset.name;
            const serviceDescription = card.dataset.description;
            const servicePrice = card.dataset.price;
            const serviceDuration = card.dataset.duration;
            const highlightsImages = card.dataset.highlightsImages.split(',').map(img => img.trim());

            // Populate modal content
            serviceDetailModal.querySelector('.modal-title').textContent = serviceName;
            serviceDetailModal.querySelector('.modal-text').textContent = serviceDescription;
            serviceDetailModal.querySelector('.modal-price').textContent = `Harga: ${servicePrice}`;
            serviceDetailModal.querySelector('.modal-duration').textContent = `Durasi: ${serviceDuration}`;

            // Populate highlights slideshow
            highlightsSlideshowContainer.innerHTML = ''; // Clear previous images
            highlightsImages.forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                img.alt = `Highlight of ${serviceName}`;
                highlightsSlideshowContainer.appendChild(img);
            });

            const currentHighlights = highlightsSlideshowContainer.querySelectorAll('img');
            currentHighlightSlideIndex = 0; // Reset slide index for new modal
            showHighlightsSlides(currentHighlights, currentHighlightSlideIndex);
            startHighlightSlideshow(currentHighlights);

            // Show modal
            serviceDetailModal.style.display = 'block';
            document.body.style.overflow = 'hidden';

            // Add event listeners for highlights nav buttons
            highlightsNextBtn.onclick = () => plusHighlightsSlides(currentHighlights, 1);
            highlightsPrevBtn.onclick = () => plusHighlightsSlides(currentHighlights, -1);
        });
    });

    // Close button for modal
    closeButton.addEventListener('click', () => {
        serviceDetailModal.style.display = 'none';
        document.body.style.overflow = '';
        stopHighlightSlideshow(); // Stop slideshow when modal closes
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === serviceDetailModal) {
            serviceDetailModal.style.display = 'none';
            document.body.style.overflow = '';
            stopHighlightSlideshow();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && serviceDetailModal.style.display === 'block') {
            serviceDetailModal.style.display = 'none';
            document.body.style.overflow = '';
            stopHighlightSlideshow();
        }
    });

    // --- Testimonial Hover Effect on Cards (CSS-driven for opacity) ---
    // The testimonial text within the card is shown/hidden via CSS :hover on .testimoni-hover-text

    // --- Virtual Tour Teaser (Mini Slideshow on Card Hover) ---
    // This is managed purely by CSS with opacity transition on .virtual-tour-teaser
    // and .service-card:hover img { opacity: 0; }
    // The images for the teaser are set in data-images attribute on .virtual-tour-teaser,
    // and JS will dynamically change the background-image of the teaser div.

    document.querySelectorAll('.service-card').forEach(card => {
        const teaserDiv = card.querySelector('.virtual-tour-teaser');
        if (!teaserDiv) return;

        const images = teaserDiv.dataset.images.split(',').map(img => img.trim());
        let currentTeaserImageIndex = 0;
        let teaserInterval;

        function updateTeaserImage() {
            if (images.length === 0) return;
            teaserDiv.style.backgroundImage = `url('${images[currentTeaserImageIndex]}')`;
            currentTeaserImageIndex = (currentTeaserImageIndex + 1) % images.length;
        }

        card.addEventListener('mouseenter', () => {
            updateTeaserImage(); // Show first image immediately
            if (images.length > 1) {
                teaserInterval = setInterval(updateTeaserImage, 1500); // Fast cycle for teaser
            }
        });

        card.addEventListener('mouseleave', () => {
            clearInterval(teaserInterval); // Stop animation
            teaserDiv.style.backgroundImage = ''; // Clear background
            currentTeaserImageIndex = 0; // Reset index
        });
    });


    // --- Scroll-triggered Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-text, .reveal-image, .reveal-card').forEach(el => {
        observer.observe(el);
    });
});