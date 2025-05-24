// js/kerajinan.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Kerajinan page JavaScript loaded.');

    const kerajinanGrid = document.querySelector('.kerajinan-grid');
    const filterButtons = document.querySelectorAll('.kerajinan-filters .filter-btn');
    const processStepsGrid = document.querySelector('.process-steps-grid');

    const kerajinanModal = document.getElementById('kerajinan-modal');
    const closeButton = document.querySelector('.kerajinan-modal .close-button');

    // Elemen modal
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalCategory = document.getElementById('modal-category');
    const modalShortDescription = document.getElementById('modal-short-description'); // Ini bisa disembunyikan/dihapus jika modal full desc
    const modalFullDescriptionText = document.getElementById('modal-full-description-text');
    const modalMaterials = document.getElementById('modal-materials');
    const modalDimensions = document.getElementById('modal-dimensions');
    const modalArtisanName = document.getElementById('modal-artisan-name');
    const modalArtisanStory = document.getElementById('modal-artisan-story');
    const modalArtisanContact = document.getElementById('modal-artisan-contact');
    const modalProcessLinkContainer = document.querySelector('.modal-process-link');
    const modalProcessVideoLink = document.getElementById('modal-process-video');


    // Data Produk Kerajinan
    const kerajinanData = [
        {
            id: 'batik-parang',
            name: 'Batik Tulis Motif Parang',
            category: 'batik',
            image: 'images/batik_tulis_parang.jpg', // Pastikan gambar ini ada
            price: 'Rp150.000',
            shortDescription: 'Motif klasik Parang, dibuat dengan canting dan lilin panas.',
            fullDescription: 'Kain batik tulis motif Parang ini adalah simbol kekuatan dan kesinambungan. Dibuat secara tradisional menggunakan canting dan lilin panas, setiap garis dan titik mencerminkan ketelitian dan kesabaran pengrajin. Proses pembuatannya bisa memakan waktu 3 hari hingga 1 minggu, tergantung kerumitan motif. Cocok sebagai kain sarung, kemeja, atau hiasan dinding.',
            materials: 'Katun Primisima, Lilin batik, Pewarna alami',
            dimensions: 'Panjang 2 meter x Lebar 1.15 meter',
            artisan: {
                name: 'Batik Studio Mbok Rahayu',
                story: 'Mbok Rahayu adalah generasi ketiga pembatik di keluarganya, meneruskan tradisi nenek moyang sejak 1950-an. Tangannya yang terampil telah menghasilkan ribuan lembar batik indah.',
                contact: '0812-9876-5432'
            },
            processLink: 'https://www.youtube.com/watch?v=deGQ6T3SKzY' // Ganti dengan link video nyata
        },
        {
            id: 'tas-anyaman',
            name: 'Tas Anyaman Bambu "Lestari"',
            category: 'anyaman',
            image: 'images/anyaman_bambu.jpg', // Pastikan gambar ini ada
            price: 'Rp50.000',
            shortDescription: 'Tas ramah lingkungan, buatan tangan dari anyaman bambu berkualitas.',
            fullDescription: 'Tas anyaman "Lestari" ini adalah contoh sempurna keindahan kerajinan tangan yang ramah lingkungan. Dibuat dari serat bambu pilihan yang dianyam secara tradisional, tas ini tidak hanya fungsional tetapi juga stylish. Ideal untuk kegiatan sehari-hari, belanja, atau sebagai aksesoris gaya etnik Anda. Setiap tas memiliki keunikan tersendiri karena proses pengerjaan manual.',
            materials: 'Bambu pilihan, Pewarna alami (opsional)',
            dimensions: '25 cm x 15 cm x 20 cm (PxLxT)',
            artisan: {
                name: 'Kelompok Penganyam Ibu Pertiwi',
                story: 'Kelompok Ibu Pertiwi adalah kumpulan ibu-ibu pengrajin yang berupaya melestarikan seni anyaman bambu. Setiap anyaman adalah wujud cinta kami pada alam dan warisan budaya.',
                contact: '0857-1122-3344'
            },
            processLink: null // Tidak ada video untuk produk ini
        },
        {
            id: 'ukiran-kayu',
            name: 'Ukiran Kayu "Garuda Wisnu"',
            category: 'ukiran',
            image: 'images/ukiran_kayu.jpg', // Pastikan gambar ini ada
            price: 'Rp350.000',
            shortDescription: 'Detail ukiran kayu mahoni menggambarkan figur mitologi yang agung.',
            fullDescription: 'Patung ukiran kayu "Garuda Wisnu" ini adalah simbol keagungan dan kekuatan. Diukir dengan presisi tinggi dari kayu mahoni berkualitas, setiap detailnya mencerminkan keahlian pengrajin kami. Cocok sebagai dekorasi rumah atau koleksi seni.',
            materials: 'Kayu mahoni solid',
            dimensions: 'Tinggi 30 cm, Lebar 20 cm',
            artisan: {
                name: 'Sanggar Ukir Cahaya Abadi',
                story: 'Sanggar Ukir Cahaya Abadi adalah rumah bagi para seniman ukir yang mewarisi teknik ukiran tradisional. Kami percaya bahwa setiap pahatan memiliki jiwa yang bisa diukir menjadi sebuah mahakarya.',
                contact: '0813-5566-7788'
            },
            processLink: null
        },
        {
            id: 'gerabah-vas',
            name: 'Vas Gerabah Motif Etnik',
            category: 'gerabah',
            image: 'images/gerabah_vas.jpg', // Pastikan gambar ini ada
            price: 'Rp75.000',
            shortDescription: 'Vas tanah liat dengan motif etnik, dibakar sempurna, cocok untuk dekorasi rumah.',
            fullDescription: 'Vas gerabah ini dibuat dari tanah liat pilihan, dibentuk dengan tangan di roda putar, kemudian dihiasi motif etnik khas daerah. Setelah proses pengeringan, vas dibakar pada suhu tinggi untuk kekuatan maksimal. Hasilnya adalah vas yang kokoh dan artistik, sempurna untuk mempercantik ruangan Anda.',
            materials: 'Tanah liat, Pewarna alami',
            dimensions: 'Tinggi 25 cm, Diameter 15 cm',
            artisan: {
                name: 'Pusat Gerabah Kreatif',
                story: 'Kami adalah pengrajin gerabah yang terus berinovasi sambil tetap melestarikan teknik tradisional. Setiap gerabah adalah wujud kreasi kami dari tanah menjadi karya seni.',
                contact: '0877-1234-9876'
            },
            processLink: null
        },
        {
            id: 'batik-cap',
            name: 'Kain Batik Cap Parang',
            category: 'batik',
            image: 'images/batik_cap_parang.jpg', // Pastikan gambar ini ada
            price: 'Rp85.000',
            shortDescription: 'Kain batik motif Parang dengan teknik cap, proses lebih cepat, detail tetap terjaga.',
            fullDescription: 'Kain batik ini menggunakan teknik cap, memungkinkan produksi yang lebih efisien namun tetap mempertahankan keindahan motif Parang yang ikonik. Setiap cap dicetak dengan teliti, menghasilkan pola yang konsisten dan rapi. Pilihan tepat bagi Anda yang mencari batik berkualitas dengan harga terjangkau.',
            materials: 'Kain katun, Lilin batik, Pewarna sintetis',
            dimensions: 'Panjang 2 meter x Lebar 1.10 meter',
            artisan: {
                name: 'Kain Batik Modern',
                story: 'Kami adalah pengrajin batik yang memadukan tradisi dengan inovasi. Melalui teknik cap, kami ingin menjadikan batik lebih mudah dijangkau oleh semua kalangan tanpa mengurangi esensi keindahannya.',
                contact: '0812-3456-1122'
            },
            processLink: null
        }
    ];

    
    // Fungsi untuk menampilkan item kerajinan ke dalam grid
    function displayKerajinanItems(category = 'all') {
        kerajinanGrid.innerHTML = ''; // Bersihkan grid sebelumnya
        const filteredData = category === 'all'
            ? kerajinanData
            : kerajinanData.filter(item => item.category === category);

        filteredData.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('kerajinan-card');
            card.dataset.id = item.id;
            card.style.animationDelay = `${index * 0.1}s`; // Stagger animation

            card.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="kerajinan-card-content">
                    <h3>${item.name}</h3>
                    <p class="price">${item.price}</p>
                    <p class="description">${item.shortDescription}</p>
                </div>
            `;
            kerajinanGrid.appendChild(card);

            // Tambahkan event listener untuk membuka modal
            card.addEventListener('click', () => openKerajinanModal(item));
        });

        // Inisialisasi animasi reveal untuk item yang baru ditampilkan
        const revealElements = document.querySelectorAll('.kerajinan-card');
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1 // Trigger saat 10% elemen terlihat
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-item');
                    observer.unobserve(entry.target); // Berhenti mengamati setelah muncul
                }
            });
        }, observerOptions);

        revealElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Fungsi untuk menampilkan langkah-langkah proses pembuatan
    function displayProcessSteps() {
        processStepsGrid.innerHTML = ''; // Bersihkan grid sebelumnya

        processStepsData.forEach((stepItem, index) => {
            const stepCard = document.createElement('div');
            stepCard.classList.add('process-step-card');
            stepCard.style.animationDelay = `${index * 0.15}s`; // Stagger animation

            stepCard.innerHTML = `
                <img src="${stepItem.image}" alt="Langkah ${stepItem.step}: ${stepItem.title}">
                <h3>Langkah ${stepItem.step}: ${stepItem.title}</h3>
                <p>${stepItem.description}</p>
            `;
            processStepsGrid.appendChild(stepCard);
        });

        // Inisialisasi animasi reveal untuk langkah proses
        const revealProcessSteps = document.querySelectorAll('.process-step-card');
        const processObserverOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const processObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-item');
                    observer.unobserve(entry.target);
                }
            });
        }, processObserverOptions);

        revealProcessSteps.forEach(el => {
            processObserver.observe(el);
        });
    }


    // Fungsi untuk membuka modal detail kerajinan
    function openKerajinanModal(item) {
        modalImage.src = item.image;
        modalImage.alt = item.name;
        modalTitle.textContent = item.name;
        modalPrice.textContent = item.price;
        modalCategory.textContent = item.category.replace(/-/g, ' ');
        modalShortDescription.textContent = item.shortDescription; // Ini bisa disembunyikan/dihapus jika fullDescription dipakai
        modalFullDescriptionText.textContent = item.fullDescription;
        modalMaterials.textContent = item.materials;
        modalDimensions.textContent = item.dimensions;

        // Info Pengrajin
        modalArtisanName.textContent = `Pengrajin: ${item.artisan.name}`;
        modalArtisanStory.textContent = item.artisan.story;
        modalArtisanContact.textContent = `Kontak: ${item.artisan.contact}`;

        // Link Proses Pembuatan (jika ada)
        if (item.processLink) {
            modalProcessLinkContainer.style.display = 'block';
            modalProcessVideoLink.href = item.processLink;
        } else {
            modalProcessLinkContainer.style.display = 'none';
        }

        kerajinanModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Nonaktifkan scroll body
    }

    // Fungsi untuk menutup modal
    function closeKerajinanModal() {
        kerajinanModal.classList.remove('active');
        document.body.style.overflow = ''; // Aktifkan kembali scroll body
    }

    // Event listener untuk tombol filter kategori
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active')); // Hapus active dari semua
            button.classList.add('active'); // Tambahkan active ke yang diklik
            const category = button.dataset.category; // Ambil kategori dari data-category
            displayKerajinanItems(category); // Tampilkan item sesuai kategori
        });
    });

    // Event listener untuk tombol tutup modal (x)
    closeButton.addEventListener('click', closeKerajinanModal);

    // Event listener untuk menutup modal jika klik di luar area modal
    window.addEventListener('click', (event) => {
        if (event.target === kerajinanModal) {
            closeKerajinanModal();
        }
    });

    // Inisialisasi: Tampilkan semua item kerajinan dan langkah proses saat halaman dimuat
    displayKerajinanItems('all');
    displayProcessSteps();
});