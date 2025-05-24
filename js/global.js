// js/global.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Fungsi untuk Memuat HTML Parsial ---
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

    // --- Panggil Fungsi untuk Memuat Navbar dan Footer ---
    // Pastikan path ke navbar.html dan footer.html sudah benar.
    // Asumsi navbar.html dan footer.html masih di root folder proyek.
    loadHTML('navbar.html', 'navbar-placeholder', () => {
        initializeNavbarToggle();
        initializeNavLinks();
    });
    loadHTML('footer.html', 'footer-placeholder', () => {
        initializeScrollToTop();
    });


    // --- Fungsionalitas Toggle Navbar untuk Mobile ---
    function initializeNavbarToggle() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navbarNav = document.querySelector('.navbar-nav');

        if (menuToggle && navbarNav) {
            menuToggle.addEventListener('click', () => {
                navbarNav.classList.toggle('open');
                menuToggle.classList.toggle('open');
            });
        }
    }

    // --- Fungsionalitas Link Navigasi Aktif dan Scroll Halus ---
    function initializeNavLinks() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]'); // Ambil semua section yang punya ID

        const updateActiveLink = () => {
            let currentActive = '';
            // Dapatkan ID section aktif berdasarkan posisi scroll
            sections.forEach(section => {
                const headerOffset = document.querySelector('.main-header') ? document.querySelector('.main-header').offsetHeight : 0;
                // Mengurangi sedikit offset agar link aktif lebih cepat berubah saat scrolling ke bawah
                const sectionTop = section.offsetTop - headerOffset - 20;

                if (window.scrollY >= sectionTop) {
                    currentActive = section.id;
                }
            });

            // Set kelas 'active' pada link navbar yang sesuai
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(currentActive) && currentActive !== '') {
                    link.classList.add('active');
                } else if (currentActive === 'hero' && link.getAttribute('href').includes('#hero')) {
                     link.classList.add('active'); // Pastikan hero link aktif saat di paling atas
                } else if (currentActive === '' && link.getAttribute('href').includes('#hero') && window.scrollY < sections[0].offsetTop - headerOffset) {
                    // Fallback jika belum ada section yang masuk view, dan di bagian atas halaman
                    link.classList.add('active');
                }
            });
        };

        // Periksa tautan aktif saat memuat dan saat scroll
        updateActiveLink();
        window.addEventListener('scroll', updateActiveLink);

        // Scroll halus saat klik link dan update status aktif segera
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);

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

                    // Set kelas aktif secara manual segera
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });
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
        }
    }
});