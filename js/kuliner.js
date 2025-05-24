// js/kuliner.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Kuliner page JavaScript loaded.');

    const kulinerGrid = document.querySelector('.kuliner-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const kulinerModal = document.getElementById('kuliner-modal');
    const closeButton = document.querySelector('.kuliner-modal .close-button');

    // Elemen modal
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalCategory = document.getElementById('modal-category');
    const modalShortDescription = document.getElementById('modal-short-description');
    const modalFullDescriptionText = document.getElementById('modal-full-description-text');
    const modalIngredientsList = document.getElementById('modal-ingredients-list');
    const modalUmkmName = document.getElementById('modal-umkm-name');
    const modalUmkmStory = document.getElementById('modal-umkm-story');
    const modalUmkmContact = document.getElementById('modal-umkm-contact');


    // Data Kuliner Produk (Anda bisa menambahkan lebih banyak data di sini)
    const kulinerData = [
        {
            id: 'gudeg',
            name: 'Gudeg Nangka Muda',
            category: 'makanan-berat',
            image: 'images/gudeg.jpg', // Pastikan gambar ini ada di folder images/
            price: 'Rp20.000',
            shortDescription: 'Makanan khas Yogyakarta, manis dan gurih legit dengan nangka muda pilihan.',
            fullDescription: 'Gudeg ini adalah mahakarya dari Warung Gudeg Bu Sari, sebuah resep turun-temurun yang telah disajikan sejak 1970. Nangka muda dimasak berjam-jam dengan santan kental dan bumbu rempah pilihan, menghasilkan tekstur lembut dan rasa manis gurih yang autentik. Cocok disantap dengan nasi hangat, telur pindang, dan sambal krecek.',
            ingredients: ['Nangka muda', 'Santan kelapa', 'Gula merah', 'Bumbu rempah (bawang, kemiri, ketumbar, lengkuas)', 'Daun salam', 'Daun jati'],
            umkm: {
                name: 'Warung Gudeg Bu Sari',
                story: 'Warung Gudeg Bu Sari berdiri sejak 1970, menyajikan resep turun-temurun yang menjaga keaslian rasa dan kualitas. Dikelola oleh keluarga, setiap hidangan dibuat dengan cinta dan dedikasi.',
                contact: 'Hubungi Bu Sari di 0812-3456-7890'
            }
        },
        {
            id: 'klepon',
            name: 'Klepon Gula Merah',
            category: 'makanan-ringan',
            image: 'images/klepon.jpg', // Pastikan gambar ini ada
            price: 'Rp10.000/5 pcs',
            shortDescription: 'Kue kenyal dari tepung ketan dengan lelehan gula merah cair di dalamnya, bertabur kelapa parut.',
            fullDescription: 'Klepon kami adalah jajanan pasar yang dibuat segar setiap hari. Terbuat dari adonan tepung ketan yang diberi warna hijau alami dari daun pandan, diisi dengan potongan gula merah asli, kemudian direbus hingga matang. Saat digigit, gula merah cair akan meleleh di mulut, memberikan sensasi manis yang tak terlupakan. Disajikan dengan taburan kelapa parut yang gurih.',
            ingredients: ['Tepung ketan', 'Air daun pandan/suji', 'Gula merah', 'Kelapa parut', 'Garam'],
            umkm: {
                name: 'Dapur Jajanan Mak Nenek',
                story: 'Dapur Jajanan Mak Nenek adalah usaha rumahan yang melestarikan resep-resep jajanan tradisional warisan nenek moyang. Kami berkomitmen menggunakan bahan alami dan segar.',
                contact: 'Hubungi Mak Nenek di 0857-1234-5678'
            }
        },
        {
            id: 'es-dawet',
            name: 'Es Dawet Ayu',
            category: 'minuman',
            image: 'images/es_dawet.jpg', // Pastikan gambar ini ada
            price: 'Rp8.000',
            shortDescription: 'Minuman segar dari dawet hijau kenyal dengan santan dan sirup gula aren.',
            fullDescription: 'Es Dawet Ayu adalah minuman pelepas dahaga yang sempurna. Dawetnya terbuat dari tepung beras berkualitas tinggi yang diolah menjadi buliran hijau kenyal. Disajikan dengan kuah santan segar dan sirup gula aren asli, serta es batu untuk kesegaran maksimal. Perpaduan rasa manis, gurih, dan dingin yang menyegarkan.',
            ingredients: ['Dawet hijau', 'Santan kelapa', 'Gula aren', 'Air', 'Es batu'],
            umkm: {
                name: 'Kedai Es Segar Mbak Siti',
                story: 'Kedai Es Segar Mbak Siti dikenal dengan minuman tradisionalnya yang menyegarkan. Kami menggunakan bahan-bahan pilihan dari petani lokal untuk menjaga kualitas dan rasa autentik.',
                contact: 'Hubungi Mbak Siti di 0899-8765-4321'
            }
        },
        {
            id: 'sate-ayam',
            name: 'Sate Ayam Madura',
            category: 'makanan-berat',
            image: 'images/sate_ayam.jpg', // Pastikan gambar ini ada
            price: 'Rp15.000/porsi',
            shortDescription: 'Potongan ayam empuk yang dibakar dengan bumbu kacang khas Madura.',
            fullDescription: 'Sate Ayam Madura adalah favorit semua kalangan. Daging ayam pilihan ditusuk dan dibakar hingga matang sempurna, disiram dengan bumbu kacang yang kaya rasa, sedikit manis, dan gurih. Ditambah irisan bawang merah dan lontong, siap memanjakan lidah Anda.',
            ingredients: ['Daging ayam', 'Bumbu kacang', 'Kecap manis', 'Bawang merah', 'Lontong'],
            umkm: {
                name: 'Sate Pak Min Jatim',
                story: 'Sate Pak Min Jatim telah melayani penggemar sate sejak tahun 2000. Resep bumbu kacang asli Madura menjadi rahasia kelezatan yang tak tertandingi.',
                contact: 'Hubungi Pak Min di 0811-2233-4455'
            }
        },
        {
            id: 'getuk-lindri',
            name: 'Getuk Lindri Pelangi',
            category: 'makanan-ringan',
            image: 'images/getuk_lindri.jpg', // Pastikan gambar ini ada
            price: 'Rp12.000/porsi',
            shortDescription: 'Camilan manis dari singkong dengan warna-warni ceria, disajikan dengan taburan kelapa parut.',
            fullDescription: 'Getuk lindri adalah jajanan pasar tradisional yang terbuat dari singkong kukus yang dihaluskan, lalu diberi pewarna makanan alami (atau sintetis) dan dicetak melalui alat khusus sehingga berbentuk seperti mi. Disajikan dengan taburan kelapa parut kukus yang gurih, menciptakan kombinasi rasa manis dan sedikit asin.',
            ingredients: ['Singkong', 'Gula pasir', 'Pewarna makanan alami (pandan, ubi ungu)', 'Kelapa parut', 'Garam'],
            umkm: {
                name: 'Pusat Jajanan Tradisional',
                story: 'Pusat Jajanan Tradisional adalah kolektif UMKM yang berfokus pada pelestarian jajanan pasar Indonesia. Kami memastikan keaslian rasa dan kualitas bahan.',
                contact: 'Hubungi Ibu Ana di 0878-9988-7766'
            }
        },
        {
            id: 'soto-ayam',
            name: 'Soto Ayam Khas',
            category: 'makanan-berat',
            image: 'images/soto_ayam.jpg', // Pastikan gambar ini ada
            price: 'Rp18.000',
            shortDescription: 'Soto ayam berkuah bening dengan bumbu rempah melimpah, dilengkapi suwiran ayam dan tauge.',
            fullDescription: 'Soto ayam kami dimasak dengan kaldu ayam asli yang kaya rasa dan bumbu rempah pilihan yang dihaluskan, menghasilkan kuah bening yang segar dan aromatik. Disajikan hangat dengan suwiran ayam, tauge, seledri, bawang goreng, dan irisan jeruk nipis. Cocok untuk sarapan atau makan siang.',
            ingredients: ['Daging ayam', 'Soun', 'Tauge', 'Seledri', 'Bawang goreng', 'Jeruk nipis', 'Bumbu soto (bawang, kunyit, jahe, kemiri)'],
            umkm: {
                name: 'Warung Soto Bu Ratna',
                story: 'Warung Soto Bu Ratna telah menjadi langganan para pecinta soto sejak 1995. Kami bangga dengan resep soto turun-temurun yang telah memuaskan ribuan pelanggan.',
                contact: 'Hubungi Bu Ratna di 0813-1234-5678'
            }
        }
        // Tambahkan lebih banyak produk kuliner di sini...
    ];

    // Fungsi untuk menampilkan item kuliner ke dalam grid
    function displayKulinerItems(category = 'all') {
        kulinerGrid.innerHTML = ''; // Bersihkan grid sebelumnya
        const filteredData = category === 'all'
            ? kulinerData
            : kulinerData.filter(item => item.category === category);

        filteredData.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('kuliner-card');
            card.dataset.id = item.id; // Simpan ID untuk modal
            card.style.animationDelay = `${index * 0.1}s`; // Stagger animation

            card.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="kuliner-card-content">
                    <h3>${item.name}</h3>
                    <p class="price">${item.price}</p>
                    <p class="description">${item.shortDescription}</p>
                </div>
            `;
            kulinerGrid.appendChild(card);

            // Tambahkan event listener untuk membuka modal saat kartu diklik
            card.addEventListener('click', () => openKulinerModal(item));
        });

        // Inisialisasi animasi reveal untuk item yang baru ditampilkan
        const revealElements = document.querySelectorAll('.kuliner-card');
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

    // Fungsi untuk membuka modal detail kuliner
    function openKulinerModal(item) {
        modalImage.src = item.image;
        modalImage.alt = item.name;
        modalTitle.textContent = item.name;
        modalPrice.textContent = item.price;
        modalCategory.textContent = item.category.replace(/-/g, ' '); // Format kategori (misal: "makanan-berat" jadi "makanan berat")
        modalShortDescription.textContent = item.shortDescription;
        modalFullDescriptionText.textContent = item.fullDescription;

        // Isi daftar bahan
        modalIngredientsList.innerHTML = '';
        item.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = ingredient;
            modalIngredientsList.appendChild(li);
        });

        // Isi info UMKM
        modalUmkmName.textContent = `Nama UMKM: ${item.umkm.name}`;
        modalUmkmStory.textContent = item.umkm.story;
        modalUmkmContact.textContent = `Kontak: ${item.umkm.contact}`;


        kulinerModal.classList.add('active'); // Tampilkan modal
        document.body.style.overflow = 'hidden'; // Nonaktifkan scroll body
    }

    // Fungsi untuk menutup modal
    function closeKulinerModal() {
        kulinerModal.classList.remove('active'); // Sembunyikan modal
        document.body.style.overflow = ''; // Aktifkan kembali scroll body
    }

    // Event listener untuk tombol filter kategori
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active')); // Hapus active dari semua
            button.classList.add('active'); // Tambahkan active ke yang diklik
            const category = button.dataset.category; // Ambil kategori dari data-category
            displayKulinerItems(category); // Tampilkan item sesuai kategori
        });
    });

    // Event listener untuk tombol tutup modal (x)
    closeButton.addEventListener('click', closeKulinerModal);

    // Event listener untuk menutup modal jika klik di luar area modal
    window.addEventListener('click', (event) => {
        if (event.target === kulinerModal) {
            closeKulinerModal();
        }
    });

    // Inisialisasi: Tampilkan semua item kuliner saat halaman pertama kali dimuat
    displayKulinerItems('all');
});