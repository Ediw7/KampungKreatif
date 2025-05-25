document.addEventListener('DOMContentLoaded', () => {
    console.log('Acara page JavaScript loaded.');

    const eventGrid = document.querySelector('.event-grid');
    const pastEventGalleryGrid = document.querySelector('.past-event-gallery-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const acaraModal = document.getElementById('acara-modal');
    const bookingConfirmModal = document.getElementById('booking-confirm-modal');
    const closeButtons = document.querySelectorAll('.close-button');
    const bookingForm = document.getElementById('booking-form');
    const processBookingBtn = document.getElementById('process-booking-btn');


    const upcomingEvents = [
        {
            id: 'festival-seni-kuliner',
            title: 'Festival Seni & Kuliner Tradisional',
            category: 'festival',
            image: 'https://wallpapercave.com/wp/wp4223905.jpg',
            date: '28 Juli 2025',
            time: '08:00 - 17:00 WIB',
            location: 'Lapangan Utama Kampung',
            price: 50000,
            description: 'Nikmati perpaduan memukau antara pertunjukan seni tradisional, pameran kerajinan tangan, dan aneka hidangan kuliner khas yang menggugah selera. Acara ini terbuka untuk umum dan menjanjikan pengalaman budaya yang tak terlupakan bagi seluruh keluarga.'
        },
        {
            id: 'pertunjukan-tari',
            title: 'Pertunjukan Tari Kecak',
            category: 'pertunjukan',
            image: 'https://example.com/tari_kecak.jpg',
            date: '15 Agustus 2025',
            time: '18:00 - 20:00 WIB',
            location: 'Panggung Terbuka Kampung',
            price: 30000,
            description: 'Saksikan keindahan Tari Kecak yang memukau, menceritakan kisah Ramayana dengan iringan suara "cak" yang khas. Acara ini akan membawa Anda lebih dekat pada kekayaan budaya Bali.'
        },
        {
            id: 'workshop-batik',
            title: 'Workshop Membatik untuk Pemula',
            category: 'workshop',
            image: 'https://example.com/workshop_batik.jpg',
            date: '20 Agustus 2025',
            time: '09:00 - 12:00 WIB',
            location: 'Sanggar Seni Kampung',
            price: 75000,
            description: 'Belajar teknik dasar membatik langsung dari pengrajin berpengalaman. Setiap peserta akan membawa pulang karya batik mereka sendiri sebagai kenang-kenangan.'
        },
        {
            id: 'komunitas-seni',
            title: 'Pameran Komunitas Seni Lokal',
            category: 'komunitas',
            image: 'https://example.com/pameran_seni.jpg',
            date: '25 Agustus 2025',
            time: '10:00 - 16:00 WIB',
            location: 'Balai Kampung',
            price: 0,
            description: 'Pameran seni yang menampilkan karya-karya dari komunitas lokal, mulai dari lukisan, ukiran, hingga anyaman. Acara ini gratis dan terbuka untuk umum.'
        }
    ];

    const pastEvents = [
        {
            title: 'Festival Kuliner 2024',
            image: 'https://example.com/festival_kuliner_2024.jpg'
        },
        {
            title: 'Pertunjukan Wayang Kulit 2024',
            image: 'https://example.com/wayang_kulit_2024.jpg'
        },
        {
            title: 'Workshop Anyaman 2024',
            image: 'https://example.com/workshop_anyaman_2024.jpg'
        },
        {
            title: 'Pameran Seni Rupa 2024',
            image: 'https://example.com/pameran_seni_2024.jpg'
        }
    ];

    let selectedEvent = null;

    function displayEvents(filter = 'all') {
        console.log('Displaying events for filter:', filter);
        eventGrid.innerHTML = '';

        const filteredEvents = filter === 'all' ? upcomingEvents : upcomingEvents.filter(event => event.category === filter);

        if (filteredEvents.length === 0) {
            eventGrid.innerHTML = '<p>Tidak ada acara dalam kategori ini.</p>';
            return;
        }

        filteredEvents.forEach((event, index) => {
            const eventCard = document.createElement('div');
            eventCard.classList.add('event-card');
            eventCard.innerHTML = `
                <img src="${event.image}" alt="${event.title}" class="event-image">
                <div class="event-content">
                    <h3>${event.title}</h3>
                    <p class="event-meta">${event.date} | ${event.time}</p>
                    <p class="event-description">${event.description}</p>
                </div>
            `;
            eventCard.addEventListener('click', () => openAcaraModal(event));
            eventGrid.appendChild(eventCard);

            setTimeout(() => {
                eventCard.classList.add('reveal-item');
            }, index * 200);
        });
    }

    function displayPastEvents() {
        pastEvents.forEach((event, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');
            galleryItem.innerHTML = `
                <img src="${event.image}" alt="${event.title}">
                <div class="gallery-overlay">
                    <p>${event.title}</p>
                </div>
            `;
            pastEventGalleryGrid.appendChild(galleryItem);

            setTimeout(() => {
                galleryItem.classList.add('reveal-item');
            }, index * 200);
        });
    }

    function openAcaraModal(event) {
        selectedEvent = event;
        document.getElementById('modal-event-image').src = event.image;
        document.getElementById('modal-event-image').alt = event.title;
        document.getElementById('modal-event-title').textContent = event.title;
        document.getElementById('modal-event-category').textContent = event.category.charAt(0).toUpperCase() + event.category.slice(1);
        document.getElementById('modal-event-date').textContent = event.date;
        document.getElementById('modal-event-time').textContent = event.time;
        document.getElementById('modal-event-location').textContent = event.location;
        document.getElementById('modal-event-price').textContent = event.price === 0 ? 'Gratis' : `Rp ${event.price.toLocaleString('id-ID')}`;
        document.getElementById('modal-event-full-description').textContent = event.description;
        acaraModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function openBookingConfirmModal(quantity) {
        document.getElementById('confirm-event-name').textContent = selectedEvent.title;
        const ticketQuantityInput = document.getElementById('ticket-quantity');
        ticketQuantityInput.value = quantity;
        const totalPrice = selectedEvent.price * quantity;
        document.getElementById('confirm-total-price').textContent = `Rp ${totalPrice.toLocaleString('id-ID')}`;
        acaraModal.classList.remove('active');
        bookingConfirmModal.classList.add('active');
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        document.getElementById('booking-message').textContent = '';
        document.getElementById('booking-message-final').textContent = '';
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.dataset.filter;
            displayEvents(filter);
        });
    });

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const quantity = parseInt(document.getElementById('booking-quantity').value);
        if (quantity < 1) {
            document.getElementById('booking-message').textContent = 'Jumlah tiket minimal adalah 1.';
            return;
        }
        openBookingConfirmModal(quantity);
    });


    processBookingBtn.addEventListener('click', () => {
        const name = document.getElementById('booking-name').value.trim();
        const email = document.getElementById('booking-email').value.trim();
        const quantity = parseInt(document.getElementById('ticket-quantity').value);

        if (!name || !email) {
            document.getElementById('booking-message-final').textContent = 'Silakan isi nama dan email.';
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            document.getElementById('booking-message-final').textContent = 'Email tidak valid.';
            return;
        }

        setTimeout(() => {
            document.getElementById('booking-message-final').textContent = `Pemesanan untuk ${quantity} tiket ${selectedEvent.title} berhasil! Detail telah dikirim ke ${email}.`;
            document.getElementById('booking-name').value = '';
            document.getElementById('booking-email').value = '';
            document.getElementById('ticket-quantity').value = 1;
        }, 1000);
    });


    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeModal(button.closest('.acara-modal') || button.closest('.event-modal'));
        });
    });


    window.addEventListener('click', (event) => {
        if (event.target === acaraModal) {
            closeModal(acaraModal);
        }
        if (event.target === bookingConfirmModal) {
            closeModal(bookingConfirmModal);
        }
    });

    displayEvents();
    displayPastEvents();
});