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

    // Data untuk Warung Gudeg Bu Sari
    const warungData = {
        name: 'Warung Gudeg Bu Sari',
        image: 'https://www.masakapahariini.com/wp-content/uploads/2021/08/Gudeg-Yogyakarta.jpg',
        products: [
            {
                name: 'Gudeg Komplit',
                image: 'https://www.masakapahariini.com/wp-content/uploads/2021/08/Gudeg-Yogyakarta.jpg',
                description: 'Gudeg dengan nasi, ayam kampung, telur, dan krecek.',
                ingredients: ['Nangka muda', 'Kelapa', 'Ayam', 'Telur', 'Cabai'],
                price: 'Rp 25.000',
                contact: '6281234567890' // Nomor WhatsApp contoh
            },
            {
                name: 'Gudeg Solo',
                image: 'https://www.masakapahariini.com/wp-content/uploads/2021/08/Gudeg-Yogyakarta.jpg',
                description: 'Gudeg manis khas Solo dengan lauk ayam.',
                ingredients: ['Nangka muda', 'Gula merah', 'Ayam', 'Bawang'],
                price: 'Rp 20.000',
                contact: '6281234567890'
            },
            {
                name: 'Gudeg Solo',
                image: 'https://www.masakapahariini.com/wp-content/uploads/2021/08/Gudeg-Yogyakarta.jpg',
                description: 'Gudeg manis khas Solo dengan lauk ayam.',
                ingredients: ['Nangka muda', 'Gula merah', 'Ayam', 'Bawang'],
                price: 'Rp 20.000',
                contact: '6281234567890'
            }
        ]
    };

    // Tampilkan Produk dengan Animasi Reveal
    warungData.products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.style.animationDelay = `${index * 0.1}s`; // Stagger animation
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

        // Animasi reveal menggunakan Intersection Observer
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

    // Fungsi Buka Modal
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

    // Fungsi Tutup Modal
    function closeModal() {
        productModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listener untuk tombol tutup
    closeButton.addEventListener('click', closeModal);

    // Tutup Modal saat klik di luar
    window.addEventListener('click', (event) => {
        if (event.target === productModal) {
            closeModal();
        }
    });
});