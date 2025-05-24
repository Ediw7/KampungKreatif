// js/global.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Global JavaScript loaded.');

    // --- Fungsi untuk Memuat HTML Parsial (TIDAK DIPERLUKAN LAGI UNTUK NAVBAR) ---
    // Fungsi ini hanya akan dipanggil untuk footer saja sekarang.
    // Jika nanti ada bagian lain yang dimuat asinkron, fungsi ini tetap berguna.
    const loadHTML = (url, elementId, callback) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                const placeholder = document.getElementById(elementId);
                if (placeholder) {
                    placeholder.innerHTML = html;
                    if (callback) callback(); // Panggil callback setelah konten dimuat
                } else {
                    console.error(`Placeholder element with ID "${elementId}" not found.`);
                }
            })
            .catch(error => console.error(`Failed to load ${url}:`, error));
    };

    // --- Panggil Fungsi untuk Memuat Footer ---
    // Karena navbar sudah ada di setiap HTML, kita hanya perlu memuat footer.
    loadHTML('footer.html', 'footer-placeholder', () => {
        initializeScrollToTop();
    });

    // --- Inisialisasi Navbar (Sekarang dipanggil langsung karena sudah ada di DOM) ---
    initializeNavbarToggle();
    initializeNavLinks();


    // --- Fungsionalitas Toggle Navbar untuk Mobile ---
    function initializeNavbarToggle() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navbarNav = document.querySelector('.navbar-nav');

        if (menuToggle && navbarNav) {
            menuToggle.addEventListener('click', () => {
                navbarNav.classList.toggle('open');
                menuToggle.classList.toggle('open');
                console.log('Menu toggled:', navbarNav.classList.contains('open')); // Debugging
            });
            console.log('Navbar toggle initialized.'); // Debugging
        } else {
            console.warn('Menu toggle or navbar nav not found for initialization.'); // Debugging
        }
    }

    // --- Fungsionalitas Link Navigasi Aktif dan Scroll Halus ---
    function initializeNavLinks() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]'); // Ambil semua section yang punya ID
        const currentPagePath = window.location.pathname.split('/').pop(); // Mendapatkan nama file HTML saat ini (e.g., "home.html")

        const updateActiveLink = () => {
            let currentActiveSectionId = '';
            const headerOffset = document.querySelector('.main-header') ? document.querySelector('.main-header').offsetHeight : 0;

            // Logika untuk menentukan section aktif berdasarkan scroll (hanya jika di halaman home.html)
            if (currentPagePath === 'home.html' || currentPagePath === '') { // Jika di home.html atau root path
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - headerOffset - 20; // Offset sedikit

                    if (window.scrollY >= sectionTop) {
                        currentActiveSectionId = section.id;
                    }
                });
            }


            navLinks.forEach(link => {
                link.classList.remove('active'); // Hapus active dari semua link

                const linkHref = link.getAttribute('href');
                const linkPath = linkHref.split('/').pop().split('#')[0]; // Nama file HTML dari link (e.g., "home.html")
                const linkHash = linkHref.split('#')[1]; // ID hash dari link (e.g., "categories")

                // Logika untuk link halaman
                if (linkPath === currentPagePath || (currentPagePath === '' && linkPath === 'home.html')) {
                    if (linkHash) { // Ini adalah link internal (misal home.html#categories)
                        if (currentActiveSectionId === linkHash) {
                            link.classList.add('active');
                        }
                    } else { // Ini adalah link ke halaman itu sendiri tanpa hash (misal home.html)
                        if (currentPagePath === 'home.html' || currentPagePath === '') {
                             // Hanya aktifkan jika di home page DAN scroll di bagian paling atas atau hero
                            if (!currentActiveSectionId || currentActiveSectionId === 'hero') { // Jika tidak ada section aktif atau section hero
                                link.classList.add('active');
                            }
                        } else {
                             // Untuk halaman lain, cukup aktifkan jika nama filenya cocok
                            link.classList.add('active');
                        }
                    }
                }
            });
        };

        // Panggil saat load dan scroll
        updateActiveLink();
        window.addEventListener('scroll', updateActiveLink);

        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const linkHref = this.getAttribute('href');
                const linkPath = linkHref.split('/').pop().split('#')[0];
                const linkHash = linkHref.split('#')[1];

                // Jika link menuju ke halaman yang berbeda ATAU ke halaman yang sama tapi ke hash
                if (linkPath === currentPagePath || (currentPagePath === '' && linkPath === 'home.html') && linkHash) {
                    e.preventDefault(); // Mencegah refresh halaman jika itu hash di halaman yang sama

                    const targetSection = document.getElementById(linkHash);
                    if (targetSection) {
                        const headerOffset = document.querySelector('.main-header') ? document.querySelector('.main-header').offsetHeight : 0;
                        const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                        const offsetPosition = elementPosition - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth"
                        });

                        // Tutup menu mobile setelah mengklik link
                        const menuToggle = document.querySelector('.menu-toggle');
                        const navbarNav = document.querySelector('.navbar-nav');
                        if (navbarNav.classList.contains('open')) {
                            navbarNav.classList.remove('open');
                            menuToggle.classList.remove('open');
                        }

                        // Update active link segera (optional, updateActiveLink akan menangani saat scroll berhenti)
                        navLinks.forEach(l => l.classList.remove('active'));
                        this.classList.add('active');
                    }
                } else {
                    // Ini adalah navigasi ke halaman lain, biarkan default behavior
                    // Hapus kelas 'active' dari semua kecuali link yang baru diklik
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });
        console.log('Nav links initialized.');
    }


    // --- Fungsionalitas Tombol Scroll to Top ---
    function initializeScrollToTop() {
        const scrollToTopBtn = document.querySelector('.scroll-to-top-btn');

        if (scrollToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    scrollToTopBtn.classList.add('show');
                } else {
                    scrollToTopBtn.classList.remove('show');
                }
            });

            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            console.log('Scroll to top initialized.');
        } else {
            console.warn('Scroll to top button not found.');
        }
    }
});