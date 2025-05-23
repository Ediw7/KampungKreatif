document.addEventListener('DOMContentLoaded', () => {
    // --- Product Card Hover Effect (CSS-driven, but JS can add/remove classes if needed) ---
    // The main hover effects are handled by CSS directly on .product-card:hover

    // --- Pop-up Modals Logic ---
    const productCards = document.querySelectorAll('.product-card');
    const storyModal = document.getElementById('productStoryModal');
    const recipeModal = document.getElementById('recipeFunFactModal');
    const closeButtons = document.querySelectorAll('.modal .close-button');

    // Function to open a modal
    function openModal(modal, title, text) {
        modal.querySelector('.modal-title').textContent = title;
        modal.querySelector('.modal-text').textContent = text;

        // If it's the recipe modal, update the product name in the title
        if (modal.id === 'recipeFunFactModal') {
            const productNameSpan = modal.querySelector('.product-name-in-modal');
            // Assuming title is like "Fun Fact Resep [Product Name]"
            // We need to extract the product name or pass it separately
            // For now, let's keep it simple: the title itself is the fun fact.
            // Or, we can modify the modal title directly in the click handler
        }

        modal.style.display = 'block'; // Show the modal
        document.body.style.overflow = 'hidden'; // Prevent scrolling background
    }

    // Function to close any modal
    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Event listeners for product cards
    productCards.forEach(card => {
        const productId = card.dataset.productId;
        const productName = card.dataset.name;
        const productDescription = card.dataset.description;
        const productFunFact = card.dataset.funfact;

        const storyButton = card.querySelector('.story-button');
        const recipeButton = card.querySelector('.recipe-button');

        // Storytelling Pop-up
        if (storyButton) {
            storyButton.addEventListener('click', () => {
                openModal(storyModal, productName, productDescription);
            });
        }

        // Interactive Recipe Teaser / Fun Fact Pop-up
        if (recipeButton) {
            recipeButton.addEventListener('click', () => {
                // Update specific elements in the recipe modal title
                recipeModal.querySelector('.modal-title').innerHTML = `Fun Fact Resep <span class="gradient-text product-name-in-modal">${productName}</span>`;
                recipeModal.querySelector('.modal-text').textContent = productFunFact;
                recipeModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        }
    });

    // Event listeners for close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            closeModal(event.target.closest('.modal')); // Close the parent modal
        });
    });

    // Close modal when clicking outside of modal content
    window.addEventListener('click', (event) => {
        if (event.target === storyModal) {
            closeModal(storyModal);
        }
        if (event.target === recipeModal) {
            closeModal(recipeModal);
        }
    });

    // Close modal when pressing Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (storyModal.style.display === 'block') {
                closeModal(storyModal);
            }
            if (recipeModal.style.display === 'block') {
                closeModal(recipeModal);
            }
        }
    });

    // Initialize scroll-triggered animations for this page (from main.js)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-text, .reveal-image, .reveal-card').forEach(el => {
        observer.observe(el);
    });
});