document.addEventListener('DOMContentLoaded', () => {
    console.log('Kerajinan page JavaScript loaded.');

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

    // Data Toko Kerajinan
    const tokoData = [
        {
            id: 'sanggar-anyaman',
            name: 'Sanggar Anyaman Lestari',
            category: 'anyaman',
            image: 'https://via.placeholder.com/300x200?text=Sanggar+Anyaman+Lestari',
            description: 'Spesialis anyaman bambu tradisional dengan kualitas tinggi.',
            rating: 4.7
        },
        {
            id: 'sanggar-batik',
            name: 'Sanggar Batik Modern',
            category: 'batik',
            image: 'https://via.placeholder.com/300x200?text=Sanggar+Batik+Modern',
            description: 'Pencipta batik cap dengan motif autentik.',
            rating: 4.8
        },
        {
            id: 'sanggar-ukiran',
            name: 'Ukiran Nusantara',
            category: 'ukiran',
            image: 'https://via.placeholder.com/300x200?text=Ukiran+Nusantara',
            description: 'Pengrajin ukiran kayu jati klasik.',
            rating: 4.6
        }
    ];

    // Fungsi untuk menampilkan daftar toko
    function displayToko(category = 'all') {
        console.log('Displaying toko for category:', category);
        kulinerGrid.innerHTML = ''; // Kosongkan grid sebelum menampilkan

        const filteredData = category === 'all' ? tokoData : tokoData.filter(toko => toko.category === category);

        if (filteredData.length === 0) {
            kulinerGrid.innerHTML = '<p>Tidak ada toko dalam kategori ini.</p>';
            return;
        }

        filteredData.forEach((toko, index) => {
            console.log('Adding toko:', toko.name);
            const tokoCard = document.createElement('div');
            tokoCard.classList.add('kuliner-card');
            tokoCard.innerHTML = `
                <img src="${toko.image}" alt="${toko.name}" class="kuliner-image">
                <div class="kuliner-card-content">
                    <h3 class="kuliner-title">${toko.name}</h3>
                    <div class="rating">Rating: ${toko.rating} ⭐</div>
                    <p class="description">${toko.description}</p>
                </div>
            `;
            // Tambahkan class reveal-item dengan delay untuk animasi berurutan
            setTimeout(() => {
                tokoCard.classList.add('reveal-item');
            }, index * 200); // Delay 200ms per card
            // Klik card untuk redirect ke toko.html
            tokoCard.addEventListener('click', () => {
                console.log('Redirecting to toko.html for:', toko.id);
                window.location.href = `toko.html?id=${toko.id}`;
            });
            kulinerGrid.appendChild(tokoCard);
        });
    }

    // Inisialisasi: Tampilkan semua toko
    displayToko();

    // Event listener untuk filter
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Filter button clicked:', button.dataset.category);
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.dataset.category;
            displayToko(category);
        });
    });
});