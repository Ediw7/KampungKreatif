// js/acara.js (Konten ini TIDAK BERUBAH dari respons sebelumnya)

document.addEventListener('DOMContentLoaded', () => {
    console.log('Acara page JavaScript loaded.');

    const eventGrid = document.querySelector('.event-grid');
    const filterButtons = document.querySelectorAll('.event-filters .filter-btn');
    const pastEventsGallery = document.querySelector('#past-events-gallery .past-event-gallery-grid'); // Fixed selector in JS

    const eventDetailModal = document.getElementById('event-detail-modal');
    const bookingConfirmModal = document.getElementById('booking-confirm-modal');

    // Detail Modal Elements
    const detailModalCloseButtons = document.querySelectorAll('.event-modal .close-button');
    const modalEventImage = document.getElementById('modal-event-image');
    const modalEventTitle = document.getElementById('modal-event-title');
    const modalEventCategory = document.getElementById('modal-event-category');
    const modalEventDate = document.getElementById('modal-event-date');
    const modalEventTime = document.getElementById('modal-event-time');
    const modalEventLocation = document.getElementById('modal-event-location');
    const modalEventPrice = document.getElementById('modal-event-price');
    const modalEventFullDescription = document.getElementById('modal-event-full-description');
    const modalEventOrganizerName = document.getElementById('modal-event-organizer-name');
    const modalEventOrganizerContact = document.getElementById('modal-event-organizer-contact');
    const bookTicketBtn = document.getElementById('book-ticket-btn');

    // Booking Confirm Modal Elements
    const confirmEventName = document.getElementById('confirm-event-name');
    const ticketQuantityInput = document.getElementById('ticket-quantity');
    const confirmTotalPrice = document.getElementById('confirm-total-price');
    const bookingNameInput = document.getElementById('booking-name');
    const bookingEmailInput = document.getElementById('booking-email');
    const processBookingBtn = document.getElementById('process-booking-btn');
    const bookingMessage = document.getElementById('booking-message'); // This ID is in the first modal form-message. The second modal form-message is bookingMessageFinal. Let's make sure to use the correct one for the *second* modal.

    let currentSelectedEvent = null; // Store event data for booking

    // Data Acara & Festival
    const eventData = [
        {
            id: 'festival-budaya',
            title: 'Festival Budaya Kampung',
            category: 'festival',
            image: 'images/festival_budaya_kampung.jpg', // Pastikan gambar ini ada
            date: '28 Juli 2025',
            time: '09:00 - 22:00 WIB',
            location: 'Lapangan Utama Kampung',
            price: 'Gratis', // Ini bisa jadi string 'Gratis' atau 'Rp. XXXXX'
            shortDescription: 'Perayaan budaya tahunan dengan tari, musik, kuliner, dan kerajinan.',
            fullDescription: 'Festival Budaya Kampung adalah puncak perayaan identitas dan warisan kami. Acara ini menampilkan beragam pertunjukan tari tradisional, musik daerah, pameran kerajinan tangan dari UMKM lokal, dan pasar kuliner yang menyajikan hidangan autentik. Jangan lewatkan juga workshop interaktif seperti membatik dan menganyam yang sebagian berbayar. Ajak keluarga dan teman untuk merasakan kemeriahan budaya yang tak terlupakan!',
            organizer: { name: 'Panitia Adat Kampung', contact: 'panitia.adat@example.com' }
        },
        {
            id: 'pertunjukan-wayang',
            title: 'Pertunjukan Wayang Kulit "Arjuna"',
            category: 'pertunjukan',
            image: 'images/pertunjukan_wayang_kulit.jpg', // Pastikan gambar ini ada
            date: '15 Agustus 2025',
            time: '19:00 - Selesai WIB',
            location: 'Pendopo Agung',
            price: 'Rp50.000',
            shortDescription: 'Kisah epik Arjuna oleh dalang Ki Rono, diiringi gamelan syahdu.',
            fullDescription: 'Saksikan kemegahan seni pertunjukan wayang kulit semalam suntuk bersama dalang legendaris Ki Slamet. Anda akan dibawa masuk ke dalam kisah epik Mahabarata yang penuh makna, diiringi alunan gamelan yang merdu dan sinden yang menyanyikan tembang-tembang Jawa. Sebuah pengalaman budaya yang wajib dinikmati!',
            organizer: { name: 'Sanggar Seni Budaya', contact: 'sanggar.seni@example.com' }
        },
        {
            id: 'workshop-batik',
            title: 'Workshop Batik Tulis Dasar',
            category: 'workshop',
            image: 'images/workshop_batik_tulis.jpg', // Pastikan gambar ini ada
            date: '20 September 2025',
            time: '10:00 - 13:00 WIB',
            location: 'Batik Studio Mbok Rahayu',
            price: 'Rp100.000',
            shortDescription: 'Pelajari teknik dasar membatik langsung dari pengrajin ahli, bawa pulang karyamu!',
            fullDescription: 'Ikuti workshop membatik tulis dasar kami yang interaktif. Anda akan diajarkan pengenalan alat (canting), cara membuat pola, hingga teknik pewarnaan sederhana. Semua bahan sudah disediakan. Di akhir sesi, Anda akan memiliki kain batik buatan tangan sendiri yang bisa dibawa pulang sebagai kenang-kenangan unik. Sangat cocok untuk pemula dan pecinta seni!',
            organizer: { name: 'Batik Studio Mbok Rahayu', contact: 'mbok.rahayu@example.com' }
        },
        {
            id: 'festival-kuliner',
            title: 'Festival Kuliner Nusantara',
            category: 'festival',
            image: 'images/festival_kuliner_nusantara.jpg',
            date: '10 Oktober 2025',
            time: '10:00 - 20:00 WIB',
            location: 'Alun-alun Kampung',
            price: 'Gratis',
            shortDescription: 'Jelajahi kelezatan hidangan dari berbagai penjuru Nusantara dalam satu tempat.',
            fullDescription: 'Festival Kuliner Nusantara menghadirkan cita rasa autentik dari seluruh Indonesia. Dari Sabang sampai Merauke, Anda bisa menemukan hidangan favorit dan mencoba kuliner baru. Akan ada demo masak, kompetisi makan, dan pertunjukan musik akustik untuk memeriahkan suasana.',
            organizer: { name: 'Paguyuban Kuliner Kampung', contact: 'kuliner.kampung@example.com' }
        },
        {
            id: 'gelar-musik',
            title: 'Gelar Musik Tradisional',
            category: 'pertunjukan',
            image: 'images/gelar_musik_tradisional.jpg',
            date: '25 November 2025',
            time: '18:00 - 21:00 WIB',
            location: 'Panggung Terbuka Kampung',
            price: 'Rp30.000',
            shortDescription: 'Malam yang syahdu dengan alunan gamelan, angklung, dan musik tradisional lainnya.',
            fullDescription: 'Malam yang syahdu dengan alunan gamelan, angklung, dan musik tradisional lainnya. Berbagai alat musik seperti gamelan, angklung, siter, dan seruling akan dimainkan oleh seniman lokal. Ini adalah kesempatan sempurna untuk mengapresiasi kekayaan musik tradisional Indonesia dalam suasana yang intim dan menenangkan.',
            organizer: { name: 'Komunitas Musik Tradisi', contact: 'komunitas.musik@example.com' }
        }
    ];

    // Data Galeri Acara Sebelumnya (Past Events)
    const pastEventImages = [
        'past_event_1.jpg',
        'past_event_2.jpg',
        'past_event_3.jpg',
        'past_event_4.jpg',
        'past_event_5.jpg',
        'past_event_6.jpg',
    ];

    // Fungsi untuk menampilkan daftar acara
    function displayEvents(filter = 'all') {
        eventGrid.innerHTML = ''; // Clear grid

        const filteredEvents = filter === 'all'
            ? eventData
            : eventData.filter(event => event.category === filter);

        filteredEvents.forEach((event, index) => {
            const eventCard = document.createElement('div');
            eventCard.classList.add('event-card');
            eventCard.dataset.id = event.id; // For identification
            eventCard.style.animationDelay = `${index * 0.1}s`; // Stagger animation

            eventCard.innerHTML = `
                <img src="images/${event.image.split('/').pop()}" alt="${event.title}">
                <div class="event-card-content">
                    <h3>${event.title}</h3>
                    <p class="event-meta">${event.date} | ${event.time} | ${event.location}</p>
                    <p class="event-price">${event.price}</p>
                    <p class="event-description">${event.shortDescription}</p>
                    <button class="cta-button outline-button view-detail-btn" data-event-id="${event.id}">Detail Acara</button>
                </div>
            `;
            eventGrid.appendChild(eventCard);
        });

        // Add event listeners for "Detail Acara" buttons AFTER cards are rendered
        document.querySelectorAll('.view-detail-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card click from also triggering
                const eventId = button.dataset.eventId;
                const event = eventData.find(e => e.id === eventId);
                if (event) {
                    openEventDetailModal(event);
                }
            });
        });
        // Add event listeners for clicking the entire card (to open modal)
        document.querySelectorAll('.event-card').forEach(card => {
             // Only add if not already handled by button click
            if (!card.querySelector('.view-detail-btn')) { // Prevent double-listening
                card.addEventListener('click', () => {
                    const eventId = card.dataset.id;
                    const event = eventData.find(e => e.id === eventId);
                    if (event) openEventDetailModal(event);
                });
            } else {
                // If there's a button, clicking the card background should also open modal
                card.addEventListener('click', (e) => {
                    if (!e.target.closest('.view-detail-btn')) { // If click isn't specifically on the button
                        const eventId = card.dataset.id;
                        const event = eventData.find(e => e.id === eventId);
                        if (event) openEventDetailModal(event);
                    }
                });
            }
        });


        // Initialize scroll reveal for newly rendered cards
        const revealElements = document.querySelectorAll('.event-card');
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-item');
                    obs.unobserve(entry.target);
                }
            });
        }, observerOptions);
        revealElements.forEach(el => observer.observe(el));
    }

    // Fungsi untuk menampilkan galeri acara terdahulu
    function displayPastEvents() {
        pastEventsGallery.innerHTML = ''; // Clear grid

        pastEventImages.forEach((imageSrc, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = `images/${imageSrc}`;
            imgElement.alt = `Acara Terdahulu ${index + 1}`;
            imgElement.classList.add('reveal-item'); // Add reveal class
            imgElement.style.animationDelay = `${index * 0.1}s`;
            pastEventsGallery.appendChild(imgElement);
        });

        // Initialize scroll reveal for past event images
        const revealPastEvents = document.querySelectorAll('.past-event-gallery-grid img');
        const pastObserverOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
        const pastObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-item');
                    obs.unobserve(entry.target);
                }
            });
        }, pastObserverOptions);
        revealPastEvents.forEach(el => pastObserver.observe(el));
    }

    // Fungsi untuk membuka modal detail acara
    function openEventDetailModal(event) {
        currentSelectedEvent = event; // Store active event

        modalEventImage.src = event.image;
        modalEventImage.alt = event.title;
        modalEventTitle.textContent = event.title;
        modalEventCategory.textContent = event.category.replace(/-/g, ' ');
        modalEventDate.textContent = event.date;
        modalEventTime.textContent = event.time;
        modalEventLocation.textContent = event.location;
        modalEventPrice.textContent = event.price;
        modalEventFullDescription.textContent = event.fullDescription;
        modalEventOrganizerName.textContent = event.organizer.name;
        modalEventOrganizerContact.textContent = event.organizer.contact;

        eventDetailModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Disable body scroll
    }

    // Fungsi untuk membuka modal konfirmasi pemesanan
    function openBookingConfirmModal() {
        if (!currentSelectedEvent) return;

        confirmEventName.textContent = currentSelectedEvent.title;
        ticketQuantityInput.value = 1; // Reset quantity
        updateTotalPrice(); // Update initial total price
        bookingNameInput.value = ''; // Clear form
        bookingEmailInput.value = '';
        bookingMessage.textContent = ''; // Clear messages
        bookingMessage.classList.remove('success', 'error'); // Remove classes

        eventDetailModal.classList.remove('active'); // Hide detail modal
        bookingConfirmModal.classList.add('active'); // Show confirmation modal
    }

    // Fungsi untuk mengupdate total harga di modal konfirmasi
    function updateTotalPrice() {
        const quantity = parseInt(ticketQuantityInput.value);
        let price = 0;
        if (currentSelectedEvent.price && currentSelectedEvent.price.toLowerCase() !== 'gratis') {
            // Remove non-numeric characters except comma for ID locale, then replace comma with dot for parsing
            price = parseFloat(currentSelectedEvent.price.replace(/[^0-9,-]+/g, "").replace(",", "."));
            if (isNaN(price)) price = 0; // Handle if parsing fails
        }
        const totalPrice = quantity * price;
        confirmTotalPrice.textContent = `Rp ${totalPrice.toLocaleString('id-ID')}`; // Format to ID locale
    }

    // Fungsi untuk proses pemesanan (simulasi)
    function processBooking() {
        const name = bookingNameInput.value.trim();
        const email = bookingEmailInput.value.trim();
        const quantity = parseInt(ticketQuantityInput.value);

        if (!name || !email || quantity <= 0) {
            showBookingMessage('error', 'Nama, email, dan jumlah tiket harus diisi dengan benar!');
            return;
        }
        if (!validateEmail(email)) {
            showBookingMessage('error', 'Format email tidak valid!');
            return;
        }

        // Simulate data submission
        console.log('Pemesanan Diproses:', {
            event: currentSelectedEvent.title,
            name: name,
            email: email,
            quantity: quantity,
            totalPrice: confirmTotalPrice.textContent
        });

        showBookingMessage('success', `Pemesanan ${quantity} tiket untuk ${currentSelectedEvent.title} berhasil! Konfirmasi akan dikirim ke email Anda.`);

        // Optional: send mailto after success message
        const mailtoSubject = encodeURIComponent(`Pemesanan Tiket: ${currentSelectedEvent.title}`);
        const mailtoBody = encodeURIComponent(`Halo penyelenggara ${currentSelectedEvent.organizer.name},\n\nSaya ingin memesan tiket untuk acara ${currentSelectedEvent.title}.\n\nNama: ${name}\nEmail: ${email}\nJumlah Tiket: ${quantity}\nTotal Harga: ${confirmTotalPrice.textContent}\n\nTerima kasih.`);
        setTimeout(() => {
            // For a static site contest, we might not want to open mailto automatically
            // console.log("Simulasi mailto link:", `mailto:${currentSelectedEvent.organizer.contact}?subject=${mailtoSubject}&body=${mailtoBody}`);
            closeAllModals(); // Close modals after simulation
        }, 3000); // Give user time to see success message
    }

    function showBookingMessage(type, msg) {
        bookingMessage.textContent = msg;
        bookingMessage.className = `form-message ${type}`;
        bookingMessage.style.opacity = 1;
        bookingMessage.style.transform = 'translateY(0)';
        setTimeout(() => {
            bookingMessage.style.opacity = 0;
            bookingMessage.style.transform = 'translateY(10px)';
            bookingMessage.textContent = '';
            bookingMessage.classList.remove(type);
        }, 5000); // Message disappears after 5 seconds
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Fungsi untuk menutup semua modal
    function closeAllModals() {
        eventDetailModal.classList.remove('active');
        bookingConfirmModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // --- Event Listeners ---
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            displayEvents(button.dataset.filter);
        });
    });

    // Tombol "Pesan Tiket Sekarang!" di modal detail
    bookTicketBtn.addEventListener('click', openBookingConfirmModal);

    // Tombol "Proses Pemesanan" di modal konfirmasi
    processBookingBtn.addEventListener('click', processBooking);

    // Update total harga saat kuantitas berubah
    ticketQuantityInput.addEventListener('input', updateTotalPrice);

    // Close buttons for both modals
    detailModalCloseButtons.forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    // Close modals when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === eventDetailModal || event.target === bookingConfirmModal) {
            closeAllModals();
        }
    });

    // Inisialisasi: Tampilkan semua acara dan galeri saat halaman dimuat
    displayEvents('all');
    displayPastEvents(); // Display past events
});