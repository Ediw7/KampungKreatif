document.addEventListener('DOMContentLoaded', () => {
    console.log('Memory Game JavaScript loaded.');

    const memoryGrid = document.getElementById('memory-grid');
    const restartMemoryBtn = document.getElementById('restart-memory-btn');
    const restartResultBtn = document.getElementById('restart-result-btn');
    const memoryContainer = document.querySelector('.memory-container');
    const memoryResult = document.querySelector('.memory-result');

    // Daftar gambar (8 pasang untuk grid 4x4)
    const images = [
        'https://via.placeholder.com/100x100?text=Angklung',
        'https://via.placeholder.com/100x100?text=Batik',
        'https://via.placeholder.com/100x100?text=Rendang',
        'https://via.placeholder.com/100x100?text=Tari+Kecak',
        'https://via.placeholder.com/100x100?text=Candi+Borobudur',
        'https://via.placeholder.com/100x100?text=Sasando',
        'https://via.placeholder.com/100x100?text=Wayang',
        'https://via.placeholder.com/100x100?text=Gamelan'
    ];

    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    const totalPairs = images.length;

    // Fungsi untuk mengacak array
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Inisialisasi game
    function initializeGame() {
        cards = [];
        flippedCards = [];
        matchedPairs = 0;
        memoryGrid.innerHTML = '';
        memoryContainer.style.display = 'block';
        memoryResult.style.display = 'none';

        // Buat array kartu (duplikat setiap gambar untuk pasangan)
        const cardImages = [...images, ...images];
        shuffle(cardImages);

        // Buat elemen kartu
        cardImages.forEach((image, index) => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.dataset.image = image;

            const cardInner = document.createElement('div');
            cardInner.classList.add('card-inner');

            const cardFront = document.createElement('div');
            cardFront.classList.add('card-front');

            const cardBack = document.createElement('div');
            cardBack.classList.add('card-back');
            const img = document.createElement('img');
            img.src = image;
            img.alt = 'Memory Card';
            cardBack.appendChild(img);

            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            card.appendChild(cardInner);

            card.addEventListener('click', () => flipCard(card));
            memoryGrid.appendChild(card);
            cards.push(card);
        });
    }

    // Fungsi untuk membalik kartu
    function flipCard(card) {
        if (flippedCards.length < 2 && !flippedCards.includes(card) && !card.classList.contains('matched')) {
            const cardInner = card.querySelector('.card-inner');
            cardInner.classList.add('flipped');
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                checkMatch();
            }
        }
    }

    // Fungsi untuk memeriksa kecocokan
    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.image === card2.dataset.image) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            flippedCards = [];

            if (matchedPairs === totalPairs) {
                setTimeout(showGame, 500);
            }
        } else {
            setTimeout(() => {
                card1.querySelector('.card-inner').classList.remove('flipped');
                card2.querySelector('.card-inner').classList.remove('flipped');
                flippedCards = [];
            }, 1000);
        }
    }

    // Fungsi untuk mengakhiri game
    function endGame() {
        memoryContainer.style.display = 'none';
        memoryResult.style.display = 'block';
    }

    // Event listener untuk tombol restart
    restartMemoryBtn.addEventListener('click', initializeGame);
    restartResultBtn.addEventListener('click', initializeGame);

    // Inisialisasi game saat pertama kali dimuat
    initializeGame();
});