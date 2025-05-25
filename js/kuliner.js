document.addEventListener('DOMContentLoaded', () => {
    console.log('Kuliner page JavaScript loaded.');

    const kulinerGrid = document.querySelector('.kuliner-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Pastikan elemen ditemukan
    if (!kulinerGrid) {
        console.error('Element .kuliner-grid not found!');
        return;
    }
    if (!filterButtons) {
        console.error('Filter buttons not found!');
        return;
    }
    console.log('kulinerGrid found:', kulinerGrid);
    console.log('filterButtons found:', filterButtons);

    // Data Warung
    const warungData = [
        {
            id: 'gudeg-bu-sari',
            name: 'Warung Gudeg Bu Sari',
            category: 'makanan-berat',
            image: 'https://via.placeholder.com/300x200?text=Gudeg+Bu+Sari',
            description: 'Gudeg lezat dengan resep turun-temurun sejak 1970.',
            rating: 4.8
        },
        {
            id: 'bakpia-mbak-ani',
            name: 'Bakpia Mbak Ani',
            category: 'makanan-ringan',
            image: 'https://via.placeholder.com/300x200?text=Bakpia+Mbak+Ani',
            description: 'Bakpia isi kacang hijau dan cokelat yang manis.',
            rating: 4.7
        },
        {
            id: 'es-dawet-bu-wulan',
            name: 'Es Dawet Bu Wulan',
            category: 'minuman',
            image: 'https://via.placeholder.com/300x200?text=Es+Dawet+Bu+Wulan',
            description: 'Minuman segar dawet dengan gula merah asli.',
            rating: 4.6
        }
    ];

    // Fungsi untuk menampilkan daftar warung
    function displayWarung(category = 'all') {
        console.log('Displaying warung for category:', category);
        kulinerGrid.innerHTML = ''; // Kosongkan grid sebelum menampilkan

        const filteredData = category === 'all' ? warungData : warungData.filter(warung => warung.category === category);

        if (filteredData.length === 0) {
            kulinerGrid.innerHTML = '<p>Tidak ada warung dalam kategori ini.</p>';
            return;
        }

        filteredData.forEach((warung, index) => {
            console.log('Adding warung:', warung.name);
            const warungCard = document.createElement('div');
            warungCard.classList.add('kuliner-card');
            warungCard.innerHTML = `
                <img src="${warung.image}" alt="${warung.name}" class="kuliner-image">
                <div class="kuliner-card-content">
                    <h3 class="kuliner-title">${warung.name}</h3>
                    <div class="rating">Rating: ${warung.rating} ⭐</div>
                    <p class="description">${warung.description}</p>
                </div>
            `;
            // Tambahkan class reveal-item dengan delay untuk animasi berurutan
            setTimeout(() => {
                warungCard.classList.add('reveal-item');
            }, index * 200); // Delay 200ms per card
            // Klik card untuk redirect ke warung.html
            warungCard.addEventListener('click', () => {
                console.log('Redirecting to warung.html for:', warung.id);
                window.location.href = `warung.html?id=${warung.id}`;
            });
            kulinerGrid.appendChild(warungCard);
        });
    }

    // Inisialisasi: Tampilkan semua warung
    displayWarung();

    // Event listener untuk filter
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Filter button clicked:', button.dataset.category);
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.dataset.category;
            displayWarung(category);
        });
    });
});