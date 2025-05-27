document.addEventListener('DOMContentLoaded', () => {
    console.log('Toko page JavaScript loaded.');

    const productGrid = document.querySelector('.product-grid');
    const productModal = document.getElementById('product-modal');
    const closeButton = document.querySelector('.close-button');

    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalFullDescription = document.getElementById('modal-full-description-text');
    const modalMaterials = document.getElementById('modal-materials');
    const modalBookingLink = document.getElementById('modal-booking-link');
    const modalProcessLink = document.getElementById('modal-process-video');
    const modalProcessSection = document.querySelector('.modal-process-link');

    const urlParams = new URLSearchParams(window.location.search);
    const tokoId = urlParams.get('id');

    const kerajinanData = {
        name: 'Resin Art Semarang',
        products: [
            {
                name: 'Resin Kalung',
                image: 'images/kalungResin.jpg',
                description: 'Kalung unik dari resin dengan berbagai variasi warna dan bentuk.',
                materials: ['Resin', 'Tali Kulit'],
                price: 'Rp75.000',
                contact: '081234561133',
                processLink: 'https://www.youtube.com/watch?v=example2'
            },
            {
                name: 'Jam Resin',
                image: 'images/jamResin.jpg',
                description: 'Jam dinding unik terbuat dari resin dengan desain artistik.',
                materials: ['Resin', 'Mesin Jam'],
                price: 'Rp120.000',
                contact: '081234561133',
                processLink: 'https://www.youtube.com/watch?v=example5'
            },
            {
                name: 'Gantungan Kunci Resin',
                image: 'images/resin4.jpg',
                description: 'Gantungan kunci cantik dari resin dengan berbagai bentuk dan warna.',
                materials: ['Resin', 'Pigmen Warna', 'Gantungan Logam'],
                price: 'Rp25.000',
                contact: '081234561133',
                processLink: 'https://www.youtube.com/watch?v=example6'
            }
        ]
    };

    // Fungsi untuk menampilkan produk di grid
    function displayProducts() {
        productGrid.innerHTML = '';

        kerajinanData.products.forEach((product, index) => {
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

            // Animasi reveal saat scroll
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
    }

    // Fungsi membuka modal dan isi data produk
    function openModal(product) {
        modalImage.src = product.image;
        modalImage.alt = product.name;
        modalTitle.textContent = product.name;
        modalPrice.textContent = product.price;
        modalFullDescription.textContent = product.description;
        modalMaterials.innerHTML = product.materials.map(m => `<li>${m}</li>`).join('');
        modalBookingLink.href = `https://wa.me/${product.contact.replace(/\D/g, '')}?text=Saya ingin memesan ${product.name}`;
        if(product.processLink) {
            modalProcessSection.style.display = 'block';
            modalProcessLink.href = product.processLink;
        } else {
            modalProcessSection.style.display = 'none';
        }
        productModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Fungsi tutup modal
    function closeModal() {
        productModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeButton.addEventListener('click', closeModal);

    window.addEventListener('click', e => {
        if(e.target === productModal) closeModal();
    });

    displayProducts();
});
