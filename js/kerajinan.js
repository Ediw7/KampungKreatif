document.addEventListener('DOMContentLoaded', () => {
    // --- Product Card Hover Effect (CSS-driven, but JS can add/remove classes if needed) ---
    // The main hover effects are handled by CSS directly on .product-card:hover

    // --- Filter Categories Logic ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.dataset.category;

            productCards.forEach(card => {
                const cardCategory = card.dataset.category;
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'flex'; // Show card
                    card.classList.add('reveal-card'); // Re-add class for potential animation
                    // Force reflow for re-animation (optional, depending on desired effect)
                    void card.offsetWidth;
                } else {
                    card.style.display = 'none'; // Hide card
                    card.classList.remove('reveal-card'); // Remove reveal class
                }
            });
            // Re-observe for scroll animations if filtering changes visibility
            reObserveElements();
        });
    });


    // --- Craft Process Timeline Pop-up Modal ---
    const processTimelineModal = document.getElementById('processTimelineModal');
    const closeButton = processTimelineModal.querySelector('.close-button');
    const timelineContainer = processTimelineModal.querySelector('.timeline-container');

    document.querySelectorAll('.process-timeline-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.product-card');
            const craftName = card.dataset.name;
            const processSteps = card.dataset.processStep.split(', ').map(step => step.trim());

            // Update modal title
            processTimelineModal.querySelector('.craft-name-in-modal').textContent = craftName;

            // Clear previous timeline steps
            timelineContainer.innerHTML = '';

            // Populate timeline steps
            processSteps.forEach(stepText => {
                const stepDiv = document.createElement('div');
                stepDiv.classList.add('timeline-step');
                const [title, description] = stepText.split(': '); // Assuming "Day X: Description"
                stepDiv.innerHTML = `<h4>${title}</h4><p>${description}</p>`;
                timelineContainer.appendChild(stepDiv);
            });

            // Show modal
            processTimelineModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    closeButton.addEventListener('click', () => {
        processTimelineModal.style.display = 'none';
        document.body.style.overflow = '';
    });

    window.addEventListener('click', (event) => {
        if (event.target === processTimelineModal) {
            processTimelineModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && processTimelineModal.style.display === 'block') {
            processTimelineModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // --- Dynamic Product Spotlight ---
    const spotlightImage = document.getElementById('spotlight-image');
    const spotlightName = document.getElementById('spotlight-name');
    const spotlightDesc = document.getElementById('spotlight-desc');
    const spotlightPrice = document.getElementById('spotlight-price');

    const spotlightProducts = [
        {
            img: 'assets/images/batik.jpg', // Ensure you have this image
            name: 'Batik Tulis Elegance',
            desc: 'Karya seni yang menceritakan ribuan kisah, dibuat dengan keahlian tangan.',
            price: 'Rp175.000'
        },
        {
            img: 'assets/images/anyaman-rotan.jpg', // Ensure you have this image
            name: 'Vase Rotan Estetik',
            desc: 'Desain minimalis modern yang menonjolkan keindahan serat alami rotan.',
            price: 'Rp85.000'
        },
        {
            img: 'assets/images/ukiran.jpg', // Ensure you have this image
            name: 'Ukiran Dewi Sri',
            desc: 'Simbol kemakmuran dan kesuburan, diukir detail dari kayu pilihan.',
            price: 'Rp280.000'
        }
    ];

    let currentSpotlightIndex = 0;
    let spotlightInterval;

    function updateSpotlight() {
        const product = spotlightProducts[currentSpotlightIndex];

        // Apply fade-out effect
        const dynamicSpotlightContainer = document.querySelector('.dynamic-spotlight');
        dynamicSpotlightContainer.style.opacity = 0;
        dynamicSpotlightContainer.style.transform = 'translateY(20px)';

        setTimeout(() => {
            spotlightImage.src = product.img;
            spotlightName.textContent = product.name;
            spotlightDesc.textContent = product.desc;
            spotlightPrice.textContent = product.price;

            // Apply fade-in effect
            dynamicSpotlightContainer.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            dynamicSpotlightContainer.style.opacity = 1;
            dynamicSpotlightContainer.style.transform = 'translateY(0)';
        }, 600); // Wait for fade-out to complete

        currentSpotlightIndex = (currentSpotlightIndex + 1) % spotlightProducts.length;
    }

    function startSpotlightRotation() {
        stopSpotlightRotation(); // Clear existing
        spotlightInterval = setInterval(updateSpotlight, 8000); // Change every 8 seconds
    }

    function stopSpotlightRotation() {
        clearInterval(spotlightInterval);
    }

    // Initial load and start rotation
    updateSpotlight(); // Show first product immediately
    startSpotlightRotation();

    // Pause rotation on hover
    document.querySelector('.dynamic-spotlight').addEventListener('mouseenter', stopSpotlightRotation);
    document.querySelector('.dynamic-spotlight').addEventListener('mouseleave', startSpotlightRotation);


    // --- Scroll-triggered Animations (Re-observe for filtered items) ---
    let observer; // Declare observer globally
    function reObserveElements() {
        if (observer) {
            observer.disconnect(); // Disconnect existing observer
        }
        observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { root: null, rootMargin: '0px', threshold: 0.1 });

        // Select only currently visible cards for observation
        document.querySelectorAll('.reveal-text, .reveal-image, .reveal-card').forEach(el => {
            if (el.style.display !== 'none') { // Only observe visible elements
                observer.observe(el);
            }
        });
    }

    // Initial observation call
    reObserveElements();
});