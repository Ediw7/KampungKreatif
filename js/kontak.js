document.addEventListener('DOMContentLoaded', () => {
    // --- Interactive Map Hotspots ---
    const hotspotModal = document.getElementById('hotspotModal');
    const hotspotModalCloseBtn = hotspotModal.querySelector('.close-button');
    const hotspots = document.querySelectorAll('.hotspot');

    // Data for hotspots (can be expanded)
    const hotspotData = {
        'gudeg-bu-sari': {
            title: 'Warung Gudeg Bu Sari',
            type: 'Kuliner',
            description: 'Nikmati gudeg legendaris dengan resep turun-temurun sejak 1970.',
            image: 'assets/images/gudeg-detail.jpg', // Specific image for modal
            link: 'kuliner.html#gudeg-section' // Link to specific section/product
        },
        'toko-batik-mandiri': {
            title: 'Toko Batik Mandiri',
            type: 'Kerajinan',
            description: 'Pusat koleksi batik tulis dan cap dengan motif klasik hingga modern.',
            image: 'assets/images/batik-detail.jpg', // Specific image for modal
            link: 'kerajinan.html#batik-section'
        },
        'sanggar-tari-lestari': {
            title: 'Sanggar Tari Lestari',
            type: 'Jasa Budaya',
            description: 'Pelatihan tari tradisional dengan instruktur berpengalaman. Rasakan indahnya seni gerak.',
            image: 'assets/images/tari-detail.jpg', // Specific image for modal
            link: 'jasa.html#tari-section'
        }
        // Add more hotspots as needed
    };

    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', () => {
            const locationId = hotspot.dataset.location;
            const data = hotspotData[locationId];

            if (data) {
                hotspotModal.querySelector('.modal-title').textContent = data.title;
                hotspotModal.querySelector('.modal-location-image').src = data.image;
                hotspotModal.querySelector('.modal-location-image').alt = data.title;
                hotspotModal.querySelector('.modal-text').textContent = `${data.type}: ${data.description}`;
                const modalLink = hotspotModal.querySelector('.modal-link');
                modalLink.href = data.link;
                modalLink.textContent = `Kunjungi Halaman ${data.type}`; // Dynamic link text

                hotspotModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    hotspotModalCloseBtn.addEventListener('click', () => {
        hotspotModal.style.display = 'none';
        document.body.style.overflow = '';
    });

    window.addEventListener('click', (event) => {
        if (event.target === hotspotModal) {
            hotspotModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && hotspotModal.style.display === 'block') {
            hotspotModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // --- Contact Card Hover Effect (CSS-driven with JS for triggering visibility if needed) ---
    // The main hover effects are handled by CSS directly on .info-card:hover

    // --- Scroll to Top Button ---
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show button after scrolling 300px
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Static Form Submission (Client-side validation/message) ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual form submission

            // Simple client-side validation example
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                alert('Terima kasih! Pesan Anda telah terkirim (fitur ini adalah simulasi).');
                // You can clear the form here if desired
                contactForm.reset();
            } else {
                alert('Harap isi semua kolom formulir.');
            }
        });
    }


    // --- Scroll-triggered Animations (from main.js) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-text, .reveal-image, .reveal-card').forEach(el => {
        observer.observe(el);
    });
});