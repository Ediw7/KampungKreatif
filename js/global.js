// js/global.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Global JavaScript loaded.');

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
                    if (callback) callback(); 
                } else {
                    console.error(`Placeholder element with ID "${elementId}" not found.`);
                }
            })
            .catch(error => console.error(`Failed to load ${url}:`, error));
    };


    loadHTML('footer.html', 'footer-placeholder', () => {
        initializeScrollToTop();
    });


    initializeNavbarToggle();
    initializeNavLinks();


    function initializeNavbarToggle() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navbarNav = document.querySelector('.navbar-nav');

        if (menuToggle && navbarNav) {
            menuToggle.addEventListener('click', () => {
                navbarNav.classList.toggle('open');
                menuToggle.classList.toggle('open');
                console.log('Menu toggled:', navbarNav.classList.contains('open')); 
            });
            console.log('Navbar toggle initialized.');
        } else {
            console.warn('Menu toggle or navbar nav not found for initialization.'); 
        }
    }


    function initializeNavLinks() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]'); 
        const currentPagePath = window.location.pathname.split('/').pop(); 

        const updateActiveLink = () => {
            let currentActiveSectionId = '';
            const headerOffset = document.querySelector('.main-header') ? document.querySelector('.main-header').offsetHeight : 0;

            
            if (currentPagePath === 'home.html' || currentPagePath === '') { 
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - headerOffset - 20;

                    if (window.scrollY >= sectionTop) {
                        currentActiveSectionId = section.id;
                    }
                });
            }


            navLinks.forEach(link => {
                link.classList.remove('active');

                const linkHref = link.getAttribute('href');
                const linkPath = linkHref.split('/').pop().split('#')[0]; 
                const linkHash = linkHref.split('#')[1]; 

                if (linkPath === currentPagePath || (currentPagePath === '' && linkPath === 'home.html')) {
                    if (linkHash) {
                        if (currentActiveSectionId === linkHash) {
                            link.classList.add('active');
                        }
                    } else { 
                        if (currentPagePath === 'home.html' || currentPagePath === '') {
                            if (!currentActiveSectionId || currentActiveSectionId === 'hero') { 
                                link.classList.add('active');
                            }
                        } else {
                            link.classList.add('active');
                        }
                    }
                }
            });
        };

    
        updateActiveLink();
        window.addEventListener('scroll', updateActiveLink);

        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const linkHref = this.getAttribute('href');
                const linkPath = linkHref.split('/').pop().split('#')[0];
                const linkHash = linkHref.split('#')[1];

        
                if (linkPath === currentPagePath || (currentPagePath === '' && linkPath === 'home.html') && linkHash) {
                    e.preventDefault(); 

                    const targetSection = document.getElementById(linkHash);
                    if (targetSection) {
                        const headerOffset = document.querySelector('.main-header') ? document.querySelector('.main-header').offsetHeight : 0;
                        const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                        const offsetPosition = elementPosition - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth"
                        });

                        const menuToggle = document.querySelector('.menu-toggle');
                        const navbarNav = document.querySelector('.navbar-nav');
                        if (navbarNav.classList.contains('open')) {
                            navbarNav.classList.remove('open');
                            menuToggle.classList.remove('open');
                        }

                        
                        navLinks.forEach(l => l.classList.remove('active'));
                        this.classList.add('active');
                    }
                } else {
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