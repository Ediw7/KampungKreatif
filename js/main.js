document.addEventListener('DOMContentLoaded', () => {
    // Navbar Toggle for Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarNav = document.getElementById('navbarNav');

    if (menuToggle && navbarNav) {
        menuToggle.addEventListener('click', () => {
            navbarNav.classList.toggle('active');
            menuToggle.classList.toggle('active'); // Animate the hamburger icon
        });

        // Close menu when a link is clicked (for single-page nav or just user convenience)
        navbarNav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navbarNav.classList.contains('active')) {
                    navbarNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });
    }

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



    // Scroll-triggered animations (for .reveal-image, .reveal-card)
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of element visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-image, .reveal-card').forEach(el => {
        observer.observe(el);
    });
});