document.addEventListener('DOMContentLoaded', () => {
    console.log('Acara page JavaScript loaded.');

    const eventGrid = document.querySelector('.event-grid');
    const pastEventGalleryGrid = document.querySelector('.past-event-gallery-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-input'); 
    const acaraModal = document.getElementById('acara-modal');
    const bookingConfirmModal = document.getElementById('booking-confirm-modal');
    const closeButtons = document.querySelectorAll('.close-button');
    const bookingForm = document.getElementById('booking-form');
    const processBookingBtn = document.getElementById('process-booking-btn');

    const upcomingEvents = [
        {
            id: 'festival-cheng-ho',
            title: 'Festival Arak-Arakan Cheng Ho',
            category: 'festival',
            image: 'images/festival.jpg',
            date: '03-04 Agustus 2025',
            time: '08:00 - 17:00 WIB',
            location: 'Kota Semarang',
            price: 50000,
            description: 'Dalam rangka menyambut Hari Kedatangan Laksama Zheng He yang ke-619 tahun, maka akan diselenggarakan Festival Arak–Arakan Cheng Ho 2025. Festival Arak–Arakan Cheng Ho 2024 memiliki beragam rangkaian, di antaranya Ritual Sembahyangan sebagai wujud syukur atas kedatangan Laksamana Cheng Ho ke Indonesia, Pertunjukan Seni dan Hiburan dari kolaborasi akulturasi budaya Tiongkok dan Jawa, Arak-arakan Patung Dewa (Kimsien) dari Klenteng Tay Kak Sie menuju Klenteng Sam Poo Kong, Bazar Kuliner, dan lain-lain.'
        },
        {
            id: 'pertunjukan-wayang-orang',
            title: 'Pertunjukan Wayang Orang',
            category: 'pertunjukan',
            image: 'images/wayang.jpg',
            date: '15 Agustus 2025',
            time: '18:00 - 20:00 WIB',
            location: 'Taman Budaya Raden Saleh',
            price: 30000,
            description: 'Nikmati keagungan budaya Jawa dalam Pertunjukan Wayang Orang yang akan digelar di Taman Budaya Raden Saleh, Semarang. Acara ini menyuguhkan kisah-kisah epik dari Mahabharata dan Ramayana yang diperankan secara langsung oleh para seniman profesional dengan balutan kostum tradisional yang memukau. Iringan gamelan yang syahdu dan dialog berbahasa Jawa kromo alus akan membawa Anda merasakan atmosfer klasik yang sarat nilai sejarah dan filosofi kehidupan.'
        },
        {
            id: 'semarang-night-carnival',
            title: 'Semarang Night Carnival',
            category: 'festival',
            image: 'images/nightCarnival.jpg',
            date: '20 Agustus 2025',
            time: '09:00 - 12:00 WIB',
            location: 'Start dari Titik 0 Km, Jl. Pemuda, Semarang',
            price: 75000,
            description: 'Karnaval malam spektakuler dengan parade kostum tematik, musik, dan seni jalanan yang memukau. Acara ini menjadi ikon budaya tahunan yang meriah dan penuh warna di pusat kota Semarang'
        }
    ];

    const pastEvents = [
        {
            title: 'Dugderan 2024',
            image: 'images/dugder.jpg'
        },
        {
            title: 'Kuda Lumping',
            image: 'images/kudaLumping2.jpg'
        },
        {
            title: 'Edu Kids Festival',
            image: 'images/edukids.jpg'
        }
    ];

    let selectedEvent = null;

    function displayEvents(filter = 'all', searchQuery = '') {
        console.log('Displaying events for filter:', filter, 'with search query:', searchQuery);
        eventGrid.innerHTML = '';

        let filteredEvents = filter === 'all' ? upcomingEvents : upcomingEvents.filter(event => event.category === filter);

        // Filter berdasarkan pencarian
        if (searchQuery) {
            filteredEvents = filteredEvents.filter(event => event.title.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        if (filteredEvents.length === 0) {
            eventGrid.innerHTML = '<p>Tidak ada acara yang sesuai dengan kriteria ini.</p>';
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

    // Event listener untuk tombol filter
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.dataset.filter;
            const searchQuery = searchInput.value;
            displayEvents(filter, searchQuery);
        });
    });

    // Event listener untuk input pencarian
    searchInput.addEventListener('input', () => {
        const filter = document.querySelector('.filter-btn.active').dataset.filter; 
        const searchQuery = searchInput.value; 
        console.log('Search input changed:', searchQuery);
        displayEvents(filter, searchQuery);
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