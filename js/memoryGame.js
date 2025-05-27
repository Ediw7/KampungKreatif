document.addEventListener('DOMContentLoaded', () => {
    const memoryGrid = document.getElementById('memory-grid');
    const restartMemoryBtn = document.getElementById('restart-memory-btn');
    const restartResultBtn = document.getElementById('restart-result-btn');
    const memoryResult = document.querySelector('.memory-result');
    const memoryContainer = document.querySelector('.memory-container');

    const items = [
        { image: 'images/gudeg.jpg', text: 'Gudeg' },
        { image: 'images/gudeg.jpg', text: 'Gudeg' },
        { image: 'images/KalungResin.jpg', text: 'Resin' },
        { image: 'images/KalungResin.jpg', text: 'Resin' },
        { image: 'images/sotoBangkong.jpg', text: 'Soto Bangkong' },
        { image: 'images/sotoBangkong.jpg', text: 'Soto Bangkong' },
        { image: 'images/gerabah.jpg', text: 'Gerabah' },
        { image: 'images/gerabah.jpg', text: 'Gerabah' },
        { image: 'images/kudaLumping.jpg', text: 'Kuda Lumping' },
        { image: 'images/kudaLumping.jpg', text: 'Kuda Lumping' },
        { image: 'images/wayang.jpg', text: 'Wayang Orang' },
        { image: 'images/wayang.jpg', text: 'Wayang Orang' },
        { image: 'images/tahuGimbal.jpg', text: 'Tahu Gimbal' },
        { image: 'images/tahuGimbal.jpg', text: 'Tahu Gimbal' },
        { image: 'images/aquascape.jpg', text: 'Aquascape' },
        { image: 'images/aquascape.jpg', text: 'Aquascape' },
    ];

    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;

    function initGame() {
        cards = [...items].sort(() => Math.random() - 0.5);
        memoryGrid.innerHTML = '';
        matchedPairs = 0;
        flippedCards = [];

        cards.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.dataset.image = item.image;
            card.dataset.text = item.text;
            card.addEventListener('click', flipCard);
            memoryGrid.appendChild(card);

            // Tanda tanya
            const questionMark = document.createElement('div');
            questionMark.classList.add('question-mark');
            questionMark.textContent = '?';
            questionMark.style.fontSize = '3rem';
            questionMark.style.color = '#333';

            // Konten gambar dan teks
            const cardContent = document.createElement('div');
            cardContent.classList.add('card-content');
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.text;
            img.style.width = '100%';
            img.style.height = '150px';
            img.style.display = 'none'; // Gambar awalnya disembunyikan
            const text = document.createElement('p');
            text.textContent = item.text;
            text.style.display = 'none'; // Teks awalnya disembunyikan
            cardContent.appendChild(img);
            cardContent.appendChild(text);

            // Tambahkan elemen ke kartu
            card.appendChild(questionMark);
            card.appendChild(cardContent);
        });

        memoryResult.style.display = 'none';
        memoryContainer.style.display = 'block';
    }

    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
            this.classList.add('flipped');
            const questionMark = this.querySelector('.question-mark');
            const cardContent = this.querySelector('.card-content');
            const img = cardContent.querySelector('img');
            const text = cardContent.querySelector('p');
            questionMark.style.display = 'none'; // Sembunyikan tanda tanya
            img.style.display = 'block'; // Tampilkan gambar
            text.style.display = 'block'; // Tampilkan teks
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 1000);
            }
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        const content1 = card1.querySelector('.card-content');
        const content2 = card2.querySelector('.card-content');
        if (card1.dataset.image === card2.dataset.image) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            content1.querySelector('p').style.display = 'block';
            content2.querySelector('p').style.display = 'block';
            matchedPairs++;
            if (matchedPairs === items.length / 2) {
                setTimeout(showResult, 500);
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            const questionMark1 = card1.querySelector('.question-mark');
            const questionMark2 = card2.querySelector('.question-mark');
            questionMark1.style.display = 'block'; // Tampilkan kembali tanda tanya
            questionMark2.style.display = 'block';
            content1.querySelector('img').style.display = 'none';
            content1.querySelector('p').style.display = 'none';
            content2.querySelector('img').style.display = 'none';
            content2.querySelector('p').style.display = 'none';
        }
        flippedCards = [];
    }

    function showResult() {
        memoryContainer.style.display = 'none';
        memoryResult.style.display = 'block';
    }

    [restartMemoryBtn, restartResultBtn].forEach(btn => {
        btn.addEventListener('click', initGame);
    });

    initGame();
});