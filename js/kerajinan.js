document.addEventListener('DOMContentLoaded', () => {
    console.log('Kerajinan page JavaScript loaded.');

    const kerajinanGrid = document.querySelector('.kerajinan-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-input');

    if (!kerajinanGrid) {
        console.error('Element .kerajinan-grid not found!');
        return;
    }
    if (!filterButtons) {
        console.error('Filter buttons not found!');
        return;
    }
    if (!searchInput) {
        console.error('Search input not found!');
        return;
    }
    console.log('kerajinanGrid found:', kerajinanGrid);
    console.log('filterButtons found:', filterButtons);
    console.log('searchInput found:', searchInput);

    // Data Toko Kerajinan
    const tokoData = [
        {
            id: 'kerajinan-resin-semarang',
            name: 'Resin Art Semarang',
            category: 'resin', 
            image: 'images/jamResin.jpg',
            description: 'Spesialis kerajinan resin seperti aksesoris unik, hiasan meja, dan souvenir kreatif khas Semarang.',
            rating: 4.7
        },
        {
            id: 'aquascape-semarang',
            name: 'Aquascape Semarang',
            category: 'aquascape',
            image: 'images/aquascape.jpg',
            description: 'Pusat aquascape dengan desain kreatif dan tanaman air berkualitas, cocok untuk dekorasi rumah dan kantor.',
            rating: 4.8
        },
        {
            id: 'toko-gerabah-semarang',
            name: 'Gerabah Semarang',
            category: 'gerabah', 
            image: 'images/gerabah.jpg',
            description: 'Menyediakan berbagai produk gerabah tradisional dan modern, mulai dari vas bunga hingga peralatan dapur.',
            rating: 4.6
        }
    ];

    // Fungsi untuk menampilkan toko dengan filter kategori dan pencarian
    function displayToko(category = 'all', searchQuery = '') {
        console.log('Displaying toko for category:', category, 'with search query:', searchQuery);
        kerajinanGrid.innerHTML = '';

        // Filter berdasarkan kategori
        let filteredData = category === 'all' ? tokoData : tokoData.filter(toko => toko.category === category);

        // Filter berdasarkan pencarian
        if (searchQuery) {
            filteredData = filteredData.filter(toko => toko.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        if (filteredData.length === 0) {
            kerajinanGrid.innerHTML = '<p>Tidak ada toko dalam kategori ini.</p>';
            return;
        }

        filteredData.forEach((toko, index) => {
            console.log('Adding toko:', toko.name);
            const tokoCard = document.createElement('div');
            tokoCard.classList.add('kerajinan-card');
            tokoCard.innerHTML = `
                <img src="${toko.image}" alt="${toko.name}" class="kerajinan-image">
                <div class="kerajinan-card-content">
                    <h3 class="kerajinan-title">${toko.name}</h3>
                    <div class="rating">Rating: ${toko.rating} ⭐</div>
                    <p class="description">${toko.description}</p>
                </div>
            `;
        
            setTimeout(() => {
                tokoCard.classList.add('reveal-item');
            }, index * 200); 
            tokoCard.addEventListener('click', () => {
                console.log('Redirecting to toko.html for:', toko.id);
                window.location.href = `toko.html?id=${toko.id}`;
            });
            kerajinanGrid.appendChild(tokoCard);
        });
    }

    // Tampilkan semua toko saat halaman dimuat
    displayToko();

    // Event listener untuk tombol filter
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Filter button clicked:', button.dataset.category);
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.dataset.category;
            const searchQuery = searchInput.value; 
            displayToko(category, searchQuery);
        });
    });

    // Event listener untuk input pencarian
    searchInput.addEventListener('input', () => {
        const category = document.querySelector('.filter-btn.active').dataset.category; 
        const searchQuery = searchInput.value;
        console.log('Search input changed:', searchQuery);
        displayToko(category, searchQuery);
    });
});