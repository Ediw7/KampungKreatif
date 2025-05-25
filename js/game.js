document.addEventListener('DOMContentLoaded', () => {
    console.log('Game page JavaScript loaded.');

   
    const revealGameOptions = document.querySelectorAll('.game-selection-grid .game-option');
    const gameOptionObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const gameOptionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-item');
                observer.unobserve(entry.target);
            }
        });
    }, gameOptionObserverOptions);

    revealGameOptions.forEach(el => {
        gameOptionObserver.observe(el);
    });

   
});