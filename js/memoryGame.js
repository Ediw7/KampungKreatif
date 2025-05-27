document.addEventListener('DOMContentLoaded', () => {
    const memoryGrid = document.getElementById('memory-grid');
    const restartMemoryBtn = document.getElementById('restart-memory-btn');
    const restartResultBtn = document.getElementById('restart-result-btn');
    const memoryResult = document.querySelector('.memory-result');
    const memoryContainer = document.querySelector('.memory-container');

    // Daftar ikon budaya (8 pasang)
    const icons = [
        '🎵', '🎵', // Angklung
        '🧵', '🧵', // Batik
        '🍲', '🍲', // Rendang
        '💃', '💃', // Tari Kecak
        '🏯', '🏯', // Candi Borobudur
        '🎭', '🎭', // Wayang Kulit
        '🥁', '🥁', // Gamelan
        '🌸', '🌸'  // Bunga Teratai
    ];

    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;

    // Inisialisasi permainan
    function initGame() {
        cards = [...icons].sort(() => Math.random() - 0.5);
        memoryGrid.innerHTML = '';
        matchedPairs = 0;
        flippedCards = [];

        cards.forEach((icon, index) => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.dataset.icon = icon;
            card.addEventListener('click', flipCard);
            memoryGrid.appendChild(card);
        });

        memoryResult.style.display = 'none';
        memoryContainer.style.display = 'block';
    }

    // Flip kartu
    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
            this.classList.add('flipped');
            this.textContent = this.dataset.icon;
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 1000);
            }
        }
    }

    // Cek kecocokan
    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.icon === card2.dataset.icon) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            if (matchedPairs === icons.length / 2) {
                setTimeout(showResult, 500);
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
        }
        flippedCards = [];
    }

    // Tampilkan hasil
    function showResult() {
        memoryContainer.style.display = 'none';
        memoryResult.style.display = 'block';
    }

    // Restart permainan
    [restartMemoryBtn, restartResultBtn].forEach(btn => {
        btn.addEventListener('click', initGame);
    });

    // Mulai permainan
    initGame();
});