document.addEventListener('DOMContentLoaded', () => {
    console.log('Kuliner page JavaScript loaded.');

    const kulinerGrid = document.querySelector('.kuliner-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-input'); 
    if (!kulinerGrid) {
        console.error('Element .kuliner-grid not found!');
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
    console.log('kulinerGrid found:', kulinerGrid);
    console.log('filterButtons found:', filterButtons);
    console.log('searchInput found:', searchInput);

    // Data Warung
    const warungData = [
        {
            id: 'tahu-gimbal-pak-edi',
            name: 'Tahu Gimbal Pak Edi',
            category: 'makanan-berat',
            image: 'images/tahuGimbal.jpg',
            description: 'Tahu gimbal dengan lontong, kol, udang goreng, dan bumbu kacang khas.',
            rating: 4.7
        },
        {
            id: 'lumpia-gang-lombok',
            name: 'Lumpia Gang Lombok',
            category: 'makanan-ringan',
            image: 'images/lumpia.jpg',
            description: 'Lumpia legendaris khas Semarang dengan isian rebung, telur, dan ayam udang.',
            rating: 4.7
        },
        {
            id: 'soto-bangkong',
            name: 'Soto Bangkong',
            category: 'makanan-berat',
            image: 'images/sotoBangkong.jpg',
            description: 'Soto ayam bening khas Semarang dengan suwiran ayam kampung dan sambal segar.',
            rating: 4.6
        }
    ];

    // Fungsi untuk menampilkan warung dengan filter kategori dan pencarian
    function displayWarung(category = 'all', searchQuery = '') {
        console.log('Displaying warung for category:', category, 'with search query:', searchQuery);
        kulinerGrid.innerHTML = ''; 

        // Filter berdasarkan kategori
        let filteredData = category === 'all' ? warungData : warungData.filter(warung => warung.category === category);

        // Filter berdasarkan pencarian
        if (searchQuery) {
            filteredData = filteredData.filter(warung => warung.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        if (filteredData.length === 0) {
            kulinerGrid.innerHTML = '<p>Tidak ada warung yang sesuai dengan kriteria ini.</p>';
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
          
            setTimeout(() => {
                warungCard.classList.add('reveal-item');
            }, index * 200); 
            warungCard.addEventListener('click', () => {
                console.log('Redirecting to warung.html for:', warung.id);
                window.location.href = `warung.html?id=${warung.id}`;
            });
            kulinerGrid.appendChild(warungCard);
        });
    }

    // Tampilkan semua warung saat halaman dimuat
    displayWarung();

    // Event listener untuk tombol filter
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Filter button clicked:', button.dataset.category);
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.dataset.category;
            const searchQuery = searchInput.value;
            displayWarung(category, searchQuery);
        });
    });

    // Event listener untuk input pencarian
    searchInput.addEventListener('input', () => {
        const category = document.querySelector('.filter-btn.active').dataset.category;
        const searchQuery = searchInput.value;
        console.log('Search input changed:', searchQuery);
        displayWarung(category, searchQuery);
    });
});