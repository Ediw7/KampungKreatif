document.addEventListener('DOMContentLoaded', () => {
    console.log('Kerajinan page JavaScript loaded.');

    const kulinerGrid = document.querySelector('.kuliner-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');


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
            id: 'kerajinan-resin-semarang',
            name: 'Resin Art Semarang',
            category: 'kerajinan resin',
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
            name: 'Toko Gerabah Semarang',
            category: 'gerabah',
            image: 'images/gerabah.jpg',
            description: 'Menyediakan berbagai produk gerabah tradisional dan modern, mulai dari vas bunga hingga peralatan dapur.',
            rating: 4.6
        }
    ];

    function displayToko(category = 'all') {
        console.log('Displaying toko for category:', category);
        kulinerGrid.innerHTML = '';

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
        
            setTimeout(() => {
                tokoCard.classList.add('reveal-item');
            }, index * 200); 
            tokoCard.addEventListener('click', () => {
                console.log('Redirecting to toko.html for:', toko.id);
                window.location.href = `toko.html?id=${toko.id}`;
            });
            kulinerGrid.appendChild(tokoCard);
        });
    }


    displayToko();


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