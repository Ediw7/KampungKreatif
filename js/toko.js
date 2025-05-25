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

    // Data Produk Kerajinan (hanya Anyaman sebagai contoh berdasarkan tokoId)
    const kerajinanData = {
        'sanggar-anyaman': [
            {
                name: 'Keranjang Anyaman Bambu',
                image: 'https://via.placeholder.com/300x200?text=Keranjang+Anyaman+Bambu',
                description: 'Keranjang anyaman bambu tradisional, kuat dan estetik.',
                materials: ['Bambu', 'Rotan'],
                price: 'Rp50.000',
                contact: '0812-3456-1133',
                processLink: 'https://www.youtube.com/watch?v=example2'
            },
            {
                name: 'Tikar Anyaman Bambu',
                image: 'https://via.placeholder.com/300x200?text=Tikar+Anyaman+Bambu',
                description: 'Tikar anyaman bambu untuk dekorasi atau alas duduk.',
                materials: ['Bambu', 'Rotan'],
                price: 'Rp40.000',
                contact: '0812-3456-1133',
                processLink: 'https://www.youtube.com/watch?v=example5'
            },
            {
                name: 'Tikar Anyaman Bambu',
                image: 'https://via.placeholder.com/300x200?text=Tikar+Anyaman+Bambu',
                description: 'Tikar anyaman bambu untuk dekorasi atau alas duduk.',
                materials: ['Bambu', 'Rotan'],
                price: 'Rp40.000',
                contact: '0812-3456-1133',
                processLink: 'https://www.youtube.com/watch?v=example5'
            }
            
        ]
       
    };

    // Data Toko berdasarkan ID
    const tokoInfo = {
        'sanggar-anyaman': {
            name: 'Sanggar Anyaman Lestari',
            description: 'Sanggar Anyaman Lestari melestarikan seni anyaman dengan mengajarkan teknik tradisional kepada generasi muda, menggunakan bahan lokal berkualitas.',
            contact: '0812-3456-1133'
        },
        'sanggar-batik': {
            name: 'Sanggar Batik Modern',
            description: 'Pencipta batik cap dengan motif autentik.',
            contact: '0812-3456-1122'
        },
        'sanggar-ukiran': {
            name: 'Ukiran Nusantara',
            description: 'Pengrajin ukiran kayu jati klasik.',
            contact: '0812-3456-1144'
        },
        'sanggar-gerabah': {
            name: 'Gerabah Kampung',
            description: 'Pembuat vas gerabah handmade.',
            contact: '0812-3456-1155'
        }
    };

    // Set informasi toko
    if (tokoId && tokoInfo[tokoId]) {
        document.getElementById('toko-name').textContent = tokoInfo[tokoId].name;
        document.getElementById('toko-description').textContent = tokoInfo[tokoId].description;
        document.getElementById('toko-contact').href = `tel:${tokoInfo[tokoId].contact}`;
        document.getElementById('toko-contact').textContent = tokoInfo[tokoId].contact;
    } else {
        console.error('Toko ID tidak valid atau tidak ditemukan:', tokoId);
    }

    // Tampilkan produk berdasarkan tokoId
    function displayProducts() {
        console.log('Displaying products for tokoId:', tokoId);
        productGrid.innerHTML = '';

        if (tokoId && kerajinanData[tokoId]) {
            kerajinanData[tokoId].forEach((product, index) => {
                console.log('Adding product:', product.name);
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

                // Animasi reveal
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
        } else {
            productGrid.innerHTML = '<p>Tidak ada produk untuk toko ini.</p>';
        }
    }

    // Fungsi Buka Modal
    function openModal(product) {
        modalImage.src = product.image;
        modalImage.alt = product.name;
        modalTitle.textContent = product.name;
        modalPrice.textContent = product.price;
        modalFullDescription.textContent = product.description;
        modalMaterials.innerHTML = product.materials.map(material => `<li>${material}</li>`).join('');
        modalBookingLink.href = `https://wa.me/${product.contact.replace(/\D/g, '')}?text=Saya ingin memesan ${product.name}`;
        modalProcessSection.style.display = product.processLink ? 'block' : 'none';
        modalProcessLink.href = product.processLink || '#';
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

    // Inisialisasi: Tampilkan produk
    displayProducts();
});