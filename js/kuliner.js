document.addEventListener('DOMContentLoaded', () => {
    console.log('Kuliner page JavaScript loaded.');

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

    function displayWarung(category = 'all') {
        console.log('Displaying warung for category:', category);
        kulinerGrid.innerHTML = ''; 

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

    displayWarung();

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