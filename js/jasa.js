document.addEventListener('DOMContentLoaded', () => {
    console.log('Jasa page JavaScript loaded.');

    const jasaGrid = document.querySelector('.jasa-grid');
    const jasaFilterButtons = document.querySelectorAll('.jasa-filters .filter-btn');
    const whyChooseUsGrid = document.querySelector('.why-choose-us-grid');
    const searchInput = document.getElementById('search-input'); 

    const jasaModal = document.getElementById('jasa-modal');
    const closeButton = document.querySelector('.jasa-modal .close-button');

    // Elemen modal
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalCategory = document.getElementById('modal-category');
    const modalFullDescriptionText = document.getElementById('modal-full-description-text');
    const modalDuration = document.getElementById('modal-duration');
    const modalInclusions = document.getElementById('modal-inclusions');
    const modalExclusions = document.getElementById('modal-exclusions');
    const modalGuideName = document.getElementById('modal-guide-name');
    const modalGuideBio = document.getElementById('modal-guide-bio');
    const modalGuideContact = document.getElementById('modal-guide-contact');
    const modalBookingLink = document.getElementById('modal-booking-link');

    const jasaData = [
        {
            id: 'tur-desa',
            name: 'Tur Wisata Desa Budaya',
            category: 'tur-wisata',
            image: 'images/turWisata.jpg',
            price: 'Rp150.000/orang',
            shortDescription: 'Jelajahi kehidupan desa, tradisi lokal, dan pemandangan indah.',
            fullDescription: 'Ikuti tur desa kami yang mempesona, dipandu oleh pemandu lokal yang berpengetahuan luas. Anda akan diajak menyelami kehidupan sehari-hari masyarakat, belajar tentang pertanian tradisional, mengunjungi rumah-rumah adat, dan berinteraksi langsung dengan penduduk desa. Pengalaman autentik yang tidak akan Anda temukan di tempat lain!',
            duration: '4 Jam',
            inclusions: 'Pemandu lokal, snack tradisional, air mineral, transportasi lokal',
            exclusions: 'Makan siang, oleh-oleh pribadi',
            guide: {
                name: 'Bapak Made - Pemandu Ahli',
                bio: 'Bapak Made adalah penduduk asli desa yang telah menjadi pemandu wisata selama 15 tahun. Pengetahuannya tentang sejarah dan budaya desa sangat mendalam.',
                contact: '0812-3456-7890'
            },
            bookingLink: 'mailto:booking@kampungwisata.com?subject=Pemesanan Tur Desa Budaya'
        },
        {
            id: 'pelatihan-batik',
            name: 'Workshop Membatik Tulis',
            category: 'pelatihan-seni',
            image: 'images/batik.jpg',
            price: 'Rp100.000/sesi',
            shortDescription: 'Belajar teknik membatik tulis dari pengrajin ahli, bawa pulang karyamu!',
            fullDescription: 'Ikuti pelatihan membatik tulis interaktif kami. Anda akan diajarkan teknik dasar menggunakan canting dan lilin panas, serta cara mewarnai batik. Pengrajin ahli kami akan memandu Anda langkah demi langkah. Di akhir sesi, Anda akan memiliki kain batik buatan tangan sendiri yang bisa dibawa pulang sebagai kenang-kenangan unik.',
            duration: '3 Jam',
            inclusions: 'Semua peralatan membatik, kain mori kecil, pewarna, pengajar ahli',
            exclusions: 'Makan siang',
            guide: {
                name: 'Ibu Fatma - Seniman Batik',
                bio: 'Ibu Fatma adalah seniman batik generasi keempat yang berdedikasi melestarikan seni ini. Beliau memiliki kesabaran dan keahlian luar biasa dalam mengajar.',
                contact: '0857-1122-3344'
            },
            bookingLink: 'mailto:booking@kampungwisata.com?subject=Pemesanan Workshop Membatik Tulis'
        },
        {
            id: 'tari-tradisional',
            name: 'Belajar Tari Tradisional',
            category: 'pelatihan-seni',
            image: 'images/tari.jpg',
            price: 'Rp80.000/sesi',
            shortDescription: 'Pelatihan singkat tari tradisional Indonesia, cocok untuk pemula.',
            fullDescription: 'Nikmati sesi singkat belajar tari tradisional. Anda akan diajarkan gerakan dasar dari salah satu tari daerah yang populer, seperti Tari Saman atau Tari Pendet. Instruktur kami akan memastikan Anda memahami makna di balik setiap gerakan dan merasakan keindahan seni tari Indonesia.',
            duration: '2 Jam',
            inclusions: 'Instruktur tari, musik pengiring, penggunaan kostum dasar (opsional)',
            exclusions: 'Transportasi',
            guide: {
                name: 'Kak Sita - Penari Profesional',
                bio: 'Kak Sita adalah penari profesional dengan pengalaman panggung internasional. Ia bersemangat berbagi kecintaannya pada tari tradisional Indonesia.',
                contact: '0813-5566-7788'
            },
            bookingLink: 'mailto:booking@kampungwisata.com?subject=Pemesanan Pelatihan Tari Tradisional'
        }
    ];

    const whyChooseUsData = [
        {
            title: 'Pengalaman Autentik',
            description: 'Kami menawarkan pengalaman yang benar-benar asli, jauh dari keramaian turis biasa.'
        },
        {
            title: 'Dipandu Ahli Lokal',
            description: 'Pemandu dan pengajar kami adalah penduduk asli yang memiliki pengetahuan mendalam.'
        },
        {
            title: 'Dampak Komunitas',
            description: 'Setiap pemesanan Anda secara langsung mendukung UMKM dan komunitas lokal.'
        },
        {
            title: 'Layanan Personalisasi',
            description: 'Kami melayani dengan sepenuh hati, siap menyesuaikan pengalaman sesuai kebutuhan Anda.'
        }
    ];

    function displayJasaItems(category = 'all', searchQuery = '') {
        jasaGrid.innerHTML = ''; 
        let filteredData = category === 'all' ? jasaData : jasaData.filter(item => item.category === category);

        // Filter berdasarkan pencarian
        if (searchQuery) {
            filteredData = filteredData.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        if (filteredData.length === 0) {
            jasaGrid.innerHTML = '<p>Tidak ada jasa dalam kategori ini.</p>';
            return;
        }

        filteredData.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('jasa-card');
            card.dataset.id = item.id;
            card.style.animationDelay = `${index * 0.1}s`; 

            card.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="jasa-card-content">
                    <h3>${item.name}</h3>
                    <p class="price">${item.price}</p>
                    <p class="description">${item.shortDescription}</p>
                </div>
            `;
            jasaGrid.appendChild(card);

            card.addEventListener('click', () => openJasaModal(item));
        });

        const revealElements = document.querySelectorAll('.jasa-card');
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-item');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        revealElements.forEach(el => observer.observe(el));
    }

    function displayWhyChooseUsFeatures() {
        whyChooseUsGrid.innerHTML = ''; 

        whyChooseUsData.forEach((feature, index) => {
            const featureCard = document.createElement('div');
            featureCard.classList.add('feature-card');
            featureCard.style.animationDelay = `${index * 0.15}s`;

            featureCard.innerHTML = `
                <h3>${feature.title}</h3>
                <p>${feature.description}</p>
            `;
            whyChooseUsGrid.appendChild(featureCard);
        });

        const revealFeatures = document.querySelectorAll('.feature-card');
        const featureObserverOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
        const featureObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-item');
                    observer.unobserve(entry.target);
                }
            });
        }, featureObserverOptions);
        revealFeatures.forEach(el => featureObserver.observe(el));
    }

    function openJasaModal(item) {
        modalImage.src = item.image;
        modalImage.alt = item.name;
        modalTitle.textContent = item.name;
        modalPrice.textContent = item.price;
        modalCategory.textContent = item.category.replace(/-/g, ' ');
        modalFullDescriptionText.textContent = item.fullDescription;
        modalDuration.textContent = item.duration;
        modalInclusions.textContent = item.inclusions;
        modalExclusions.textContent = item.exclusions || 'Tidak ada';

        modalGuideName.textContent = `Pemandu/Pengajar: ${item.guide.name}`;
        modalGuideBio.textContent = item.guide.bio;
        modalGuideContact.textContent = `Kontak: ${item.guide.contact}`;

        modalBookingLink.href = item.bookingLink;

        jasaModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeJasaModal() {
        jasaModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listener untuk tombol filter
    jasaFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            jasaFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.dataset.category;
            const searchQuery = searchInput.value; 
            displayJasaItems(category, searchQuery);
        });
    });

    // Event listener untuk input pencarian
    searchInput.addEventListener('input', () => {
        const category = document.querySelector('.jasa-filters .filter-btn.active').dataset.category; 
        const searchQuery = searchInput.value; 
        console.log('Search input changed:', searchQuery);
        displayJasaItems(category, searchQuery);
    });

    // Event listener untuk menutup modal
    closeButton.addEventListener('click', closeJasaModal);

    window.addEventListener('click', (event) => {
        if (event.target === jasaModal) {
            closeJasaModal();
        }
    });

    // Tampilkan semua jasa dan fitur saat halaman dimuat
    displayJasaItems('all');
    displayWhyChooseUsFeatures();
});