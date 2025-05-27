document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.querySelector('.product-grid');
    const productModal = document.getElementById('product-modal');
    const closeButton = document.querySelector('.close-button');

    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalDescription = document.getElementById('modal-full-description-text');
    const modalIngredients = document.getElementById('modal-ingredients');
    const modalBookingLink = document.getElementById('modal-booking-link');


    const warungData = {
        name: 'Tahu Gimbal Pak Edi',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Tahu_gimbal.jpg/320px-Tahu_gimbal.jpg',
        products: [
            {
                name: 'Tahu Gimbal Komplit',
                image: 'images/tahuKomplit.jpg',
                description: 'Tahu goreng dengan lontong, kol, udang goreng, dan bumbu kacang khas Semarang.',
                ingredients: ['Tahu goreng', 'Lontong', 'Kol', 'Udang goreng', 'Bumbu kacang'],
                price: 'Rp 20.000',
                contact: '6281234567890'
            },
            {
                name: 'Tahu Gimbal Pedas',
                image: 'images/tahuPedas.jpg',
                description: 'Tahu gimbal dengan tambahan sambal pedas untuk sensasi rasa yang menggigit.',
                ingredients: ['Tahu goreng', 'Lontong', 'Kol', 'Udang goreng', 'Bumbu kacang', 'Sambal pedas'],
                price: 'Rp 22.000',
                contact: '6281234567890'
            },
            {
                name: 'Tahu Gimbal Original',
                image: 'images/tahuGimbal.jpg',
                description: 'Rasa asli tahu gimbal Semarang yang legendaris dengan bumbu kacang khas.',
                ingredients: ['Tahu goreng', 'Lontong', 'Kol', 'Udang goreng', 'Bumbu kacang'],
                price: 'Rp 18.000',
                contact: '6281234567890'
            }
        ]
    };
    

    warungData.products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.style.animationDelay = `${index * 0.1}s`; 
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-content">
                <h3>${product.name}</h3>
                <div class="price">${product.price}</div>
                <p class="description">${product.description}</p>
            </div>
        `;
        productCard.addEventListener('click', () => openModal(product));
        productGrid.appendChild(productCard);

        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-item');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        observer.observe(productCard);
    });

    function openModal(product) {
        modalImage.src = product.image;
        modalImage.alt = product.name;
        modalTitle.textContent = product.name;
        modalPrice.textContent = product.price;
        modalDescription.textContent = product.description;
        modalIngredients.innerHTML = product.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');
        modalBookingLink.href = `https://wa.me/${product.contact}?text=Saya ingin memesan ${product.name}`;
        productModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        productModal.classList.remove('active');
        document.body.style.overflow = '';
    }


    closeButton.addEventListener('click', closeModal);


    window.addEventListener('click', (event) => {
        if (event.target === productModal) {
            closeModal();
        }
    });
});