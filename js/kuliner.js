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
    const modalWhatsapp = document.getElementById('modal-whatsapp');
    const modalMapIframe = document.getElementById('modal-map-iframe');
    const modalMapLink = document.getElementById('modal-map-link');

    // Data Kuliner Produk
    const kulinerData = [
        {
            id: 'gudeg',
            name: 'Gudeg Nangka Muda',
            category: 'makanan-berat',
            image: 'https://grosirmesin.com/wp-content/uploads/2019/03/gudeg-nangka-telur.jpg',
            price: 'Rp20.000',
            shortDescription: 'Makanan khas Yogyakarta, manis dan gurih legit dengan nangka muda pilihan.',
            fullDescription: 'Gudeg ini adalah mahakarya dari Warung Gudeg Bu Sari, sebuah resep turun-temurun yang telah disajikan sejak 1970. Nangka muda dimasak berjam-jam dengan santan kental dan bumbu rempah pilihan, menghasilkan tekstur lembut dan rasa manis gurih yang autentik. Cocok disantap dengan nasi hangat, telur pindang, dan sambal krecek.',
            ingredients: ['Nangka muda', 'Santan kelapa', 'Gula merah', 'Bumbu rempah (bawang, kemiri, ketumbar, lengkuas)', 'Daun salam', 'Daun jati'],
            umkm: {
                name: 'Warung Gudeg Bu Sari',
                story: 'Warung Gudeg Bu Sari berdiri sejak 1970, menyajikan resep turun-temurun yang menjaga keaslian rasa dan kualitas. Dikelola oleh keluarga, setiap hidangan dibuat dengan cinta dan dedikasi.',
                contact: '081234567890',
                location: {
                    lat: -7.110228909132271,
                    lng: 110.34346129472787,
                    url: 'https://maps.app.goo.gl/zqLXyiX91vynuwZs7'
                }
            }
        },
        {
            id: 'klepon',
            name: 'Klepon Gula Merah',
            category: 'makanan-ringan',
            image: 'https://topmetro.news/wp-content/uploads/2022/07/Resep-dan-Cara-Membuat-Klepon-Ketan-Gula-Merah-Enak-dan-Anti-Gagal....jpeg', 
            price: 'Rp10.000/5 pcs',
            shortDescription: 'Kue kenyal dari tepung ketan dengan lelehan gula merah cair di dalamnya, bertabur kelapa parut.',
            fullDescription: 'Klepon kami adalah jajanan pasar yang dibuat segar setiap hari. Terbuat dari adonan tepung ketan yang diberi warna hijau alami dari daun pandan, diisi dengan potongan gula merah asli, kemudian direbus hingga matang. Saat digigit, gula merah cair akan meleleh di mulut, memberikan sensasi manis yang tak terlupakan. Disajikan dengan taburan kelapa parut yang gurih.',
            ingredients: ['Tepung ketan', 'Air daun pandan/suji', 'Gula merah', 'Kelapa parut', 'Garam'],
            umkm: {
                name: 'Dapur Jajanan Mak Nenek',
                story: 'Dapur Jajanan Mak Nenek adalah usaha rumahan yang melestarikan resep-resep jajanan tradisional warisan nenek moyang. Kami berkomitmen menggunakan bahan alami dan segar.',
                contact: '085712345678',
                location: {
                    lat: -7.112228909132271,
                    lng: 110.34546129472787,
                    url: 'https://maps.google.com/?q=-7.112228909132271,110.34546129472787'
                }
            }
        },
        {
            id: 'es-dawet',
            name: 'Es Dawet Ayu',
            category: 'minuman',
            image: 'https://tse4.mm.bing.net/th?id=OIP.BMz3c6NFTXA_11nhkDZiHwHaEw&pid=Api&P=0&h=180',
            price: 'Rp8.000',
            shortDescription: 'Minuman segar dari dawet hijau kenyal dengan santan dan sirup gula aren.',
            fullDescription: 'Es Dawet Ayu adalah minuman pelepas dahaga yang sempurna. Dawetnya terbuat dari tepung beras berkualitas tinggi yang diolah menjadi buliran hijau kenyal. Disajikan dengan kuah santan segar dan sirup gula aren asli, serta es batu untuk kesegaran maksimal. Perpaduan rasa manis, gurih, dan dingin yang menyegarkan.',
            ingredients: ['Dawet hijau', 'Santan kelapa', 'Gula aren', 'Air', 'Es batu'],
            umkm: {
                name: 'Kedai Es Segar Mbak Siti',
                story: 'Kedai Es Segar Mbak Siti dikenal dengan minuman tradisionalnya yang menyegarkan. Kami menggunakan bahan-bahan pilihan dari petani lokal untuk menjaga kualitas dan rasa autentik.',
                contact: '089987654321',
                location: {
                    lat: -7.108228909132271,
                    lng: 110.34146129472787,
                    url: 'https://maps.google.com/?q=-7.108228909132271,110.34146129472787'
                }
            }
        },
        {
            id: 'sate-ayam',
            name: 'Sate Ayam Madura',
            category: 'makanan-berat',
            image: 'https://i1.wp.com/resepkoki.id/wp-content/uploads/2017/02/Resep-Sate-Ayam-Madura.jpg?resize=860%2C380&ssl=1',
            price: 'Rp15.000/porsi',
            shortDescription: 'Potongan ayam empuk yang dibakar dengan bumbu kacang khas Madura.',
            fullDescription: 'Sate Ayam Madura adalah favorit semua kalangan. Daging ayam pilihan ditusuk dan dibakar hingga matang sempurna, disiram dengan bumbu kacang yang kaya rasa, sedikit manis, dan gurih. Ditambah irisan bawang merah dan lontong, siap memanjakan lidah Anda.',
            ingredients: ['Daging ayam', 'Bumbu kacang', 'Kecap manis', 'Bawang merah', 'Lontong'],
            umkm: {
                name: 'Sate Pak Min Jatim',
                story: 'Sate Pak Min Jatim telah melayani penggemar sate sejak tahun 2000. Resep bumbu kacang asli Madura menjadi rahasia kelezatan yang tak tertandingi.',
                contact: '081122334455',
                location: {
                    lat: -7.111228909132271,
                    lng: 110.34446129472787,
                    url: 'https://maps.google.com/?q=-7.111228909132271,110.34446129472787'
                }
            }
        },
        {
            id: 'getuk-lindri',
            name: 'Getuk Lindri Pelangi',
            category: 'makanan-ringan',
            image: 'https://img-global.cpcdn.com/recipes/e898594099e32d45/1200x630cq70/photo.jpg',
            price: 'Rp12.000/porsi',
            shortDescription: 'Camilan manis dari singkong dengan warna-warni ceria, disajikan dengan taburan kelapa parut.',
            fullDescription: 'Getuk lindri adalah jajanan pasar tradisional yang terbuat dari singkong kukus yang dihaluskan, lalu diberi pewarna makanan alami (atau sintetis) dan dicetak melalui alat khusus sehingga berbentuk seperti mi. Disajikan dengan taburan kelapa parut kukus yang gurih, menciptakan kombinasi rasa manis dan sedikit asin.',
            ingredients: ['Singkong', 'Gula pasir', 'Pewarna makanan alami (pandan, ubi ungu)', 'Kelapa parut', 'Garam'],
            umkm: {
                name: 'Pusat Jajanan Tradisional',
                story: 'Pusat Jajanan Tradisional adalah kolektif UMKM yang berfokus pada pelestarian jajanan pasar Indonesia. Kami memastikan keaslian rasa dan kualitas bahan.',
                contact: '087899887766',
                location: {
                    lat: -7.109228909132271,
                    lng: 110.34246129472787,
                    url: 'https://maps.google.com/?q=-7.109228909132271,110.34246129472787'
                }
            }
        },
        {
            id: 'soto-ayam',
            name: 'Soto Ayam Khas',
            category: 'makanan-berat',
            image: 'https://cdn-2.tstatic.net/travel/foto/bank/images/resep-soto-ayam-kuning-untuk-sahur.jpg',
            price: 'Rp18.000',
            shortDescription: 'Soto ayam berkuah bening dengan bumbu rempah melimpah, dilengkapi suwiran ayam dan tauge.',
            fullDescription: 'Soto ayam kami dimasak dengan kaldu ayam asli yang kaya rasa dan bumbu rempah pilihan yang dihaluskan, menghasilkan kuah bening yang segar dan aromatik. Disajikan hangat dengan suwiran ayam, tauge, seledri, bawang goreng, dan irisan jeruk nipis. Cocok untuk sarapan atau makan siang.',
            ingredients: ['Daging ayam', 'Soun', 'Tauge', 'Seledri', 'Bawang goreng', 'Jeruk nipis', 'Bumbu soto (bawang, kunyit, jahe, kemiri)'],
            umkm: {
                name: 'Warung Soto Bu Ratna',
                story: 'Warung Soto Bu Ratna telah menjadi langganan para pecinta soto sejak 1995. Kami bangga dengan resep soto turun-temurun yang telah memuaskan ribuan pelanggan.',
                contact: '081312345678',
                location: {
                    lat: -7.113228909132271,
                    lng: 110.34646129472787,
                    url: 'https://maps.google.com/?q=-7.113228909132271,110.34646129472787'
                }
            }
        }
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
        modalCategory.textContent = item.category.replace(/-/g, ' '); // Format kategori
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

        //  Tombol WhatsApp
        const whatsappNumber = item.umkm.contact.replace(/\D/g, ''); // Ambil hanya angka dari nomor kontak
        modalWhatsapp.href = `https://wa.me/${whatsappNumber}?text=Halo%20${item.umkm.name},%20saya%20tertarik%20dengan%20${item.name}.%20Bisa%20beri%20info%20lebih%20lanjut?`;

        // Peta dan tautan lokasi
        if (item.id === 'gudeg') {
            modalMapIframe.innerHTML = `
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3263.6318100126023!2d110.43332398885495!3d-7.048357099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708c0230b5b061%3A0xfef333e5f3860212!2sUPT%20Perpustakaan%20dan%20UNDIP%20Press!5e1!3m2!1sid!2sid!4v1748096941014!5m2!1sid!2sid" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            `;
        } else {
            const mapEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${item.umkm.location.lat},${item.umkm.location.lng}&zoom=15`;
            modalMapIframe.innerHTML = `<iframe width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="${mapEmbedUrl}"></iframe>`;
        }
        modalMapLink.href = item.umkm.location.url;

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










