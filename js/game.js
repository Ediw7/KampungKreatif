// js/game.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Game page JavaScript loaded.');

    // Elemen Bagian Halaman
    const gameSelectionSection = document.getElementById('game-selection');
    const gameAreaSection = document.getElementById('game-area');
    const gameOptionLinks = document.querySelectorAll('.game-selection-grid .game-option');
    const gameContentWrappers = document.querySelectorAll('.game-content-wrapper');
    const backToSelectionButtons = document.querySelectorAll('.back-to-selection');

    // Elemen Memory Match Game
    const memoryBoard = document.querySelector('.memory-board');
    const startGameBtn = document.getElementById('start-game-btn');
    const resetGameBtn = document.getElementById('reset-game-btn');
    const timerDisplay = document.getElementById('timer-display');
    const movesDisplay = document.getElementById('moves-display');
    const winModal = document.getElementById('win-modal');
    const closeWinModalBtn = document.querySelector('.close-game-modal');
    const playAgainBtn = document.querySelector('.play-again-btn');
    const finalTimeDisplay = document.getElementById('final-time');
    const finalMovesDisplay = document.getElementById('final-moves');

    // Variabel Game State Memory Match
    let cards = [];
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false; // Mencegah klik kartu lain saat 2 kartu terbuka
    let matchesFound = 0;
    let moves = 0;
    let timer = 0; // Waktu dalam detik
    let timerInterval = null; // Untuk setInterval

    // Gambar-gambar untuk kartu Memory Match (pastikan ada di folder images/)
    // Harus ada setidaknya 6-8 gambar unik untuk 12-16 kartu!
    const memoryImages = [
        { id: 'gamelan', src: 'images/game_gamelan.jpg' },
        { id: 'wayang', src: 'images/game_wayang.jpg' },
        { id: 'batik', src: 'images/game_batik.jpg' },
        { id: 'rendang', src: 'images/game_rendang.jpg' },
        { id: 'reog', src: 'images/game_reog.jpg' },
        { id: 'angklung', src: 'images/game_angklung.jpg' },
        // Jika ingin papan 4x4 (16 kartu), tambahkan 2 gambar unik lagi:
        // { id: 'saman', src: 'images/game_saman.jpg' },
        // { id: 'komodo', src: 'images/game_komodo.jpg' },
    ];

    // --- Fungsionalitas Pemilihan Game ---
    gameOptionLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const gameId = link.dataset.gameId;

            // Sembunyikan Bagian Pemilihan Game
            gameSelectionSection.style.display = 'none';
            // Tampilkan Bagian Area Game
            gameAreaSection.style.display = 'block';

            // Sembunyikan semua wrapper konten game
            gameContentWrappers.forEach(wrapper => {
                wrapper.style.display = 'none';
            });

            // Tampilkan wrapper konten game yang dipilih
            const selectedGameWrapper = document.getElementById(`${gameId}-game-section`);
            if (selectedGameWrapper) {
                selectedGameWrapper.style.display = 'block';

                // Jika game Memory Match, inisialisasi atau reset
                if (gameId === 'memory-match') {
                    resetMemoryGame(); // Pastikan game direset dan siap dimainkan
                }
            }
            // Gulir ke bagian atas area game
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Tombol "Kembali ke Pilihan Game"
    backToSelectionButtons.forEach(button => {
        button.addEventListener('click', () => {
            gameAreaSection.style.display = 'none';
            gameSelectionSection.style.display = 'block';

            // Hentikan timer jika kembali dari Memory Match
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
            }
            // Gulir ke bagian atas pilihan game
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });


    // --- Fungsionalitas Game Memory Match ---

    // Fungsi untuk membuat satu elemen kartu
    function createMemoryCardElement(cardData) {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.id = cardData.id; // ID unik untuk identifikasi pasangan

        card.innerHTML = `
            <div class="front-face"><img src="${cardData.src}" alt="${cardData.id}"></div>
            <div class="back-face"><img src="images/card_back.jpg" alt="Bagian Belakang"></div>
        `;
        return card;
    }

    // Fungsi untuk menginisialisasi papan permainan
    function initializeMemoryGame() {
        memoryBoard.innerHTML = ''; // Bersihkan papan sebelumnya
        resetGameStates(); // Reset semua variabel game

        // Buat pasangan kartu dari gambar yang ada
        const gamePairs = memoryImages; // Menggunakan semua gambar unik yang ada
        const duplicatedCardsData = [...gamePairs, ...gamePairs]; // Duplikasi untuk pasangan

        // Acak kartu
        duplicatedCardsData.sort(() => 0.5 - Math.random());

        // Tambahkan kartu ke papan
        duplicatedCardsData.forEach(cardData => {
            const cardElement = createMemoryCardElement(cardData);
            memoryBoard.appendChild(cardElement);
        });

        // Pastikan kartu tidak bisa diklik sebelum permainan dimulai
        disableAllCardsClick();
    }

    // Fungsi untuk mereset semua variabel game state
    function resetGameStates() {
        firstCard = null;
        secondCard = null;
        lockBoard = false;
        matchesFound = 0;
        moves = 0;
        timer = 0;
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = null;

        updateTimerDisplay();
        movesDisplay.textContent = moves;

        // Pastikan modal kemenangan tertutup
        winModal.classList.remove('active');
        document.body.style.overflow = ''; // Aktifkan scroll body
    }

    // Fungsi untuk memulai timer
    function startTimer() {
        if (timerInterval) clearInterval(timerInterval); // Hentikan timer sebelumnya jika ada
        timerInterval = setInterval(() => {
            timer++;
            updateTimerDisplay();
        }, 1000);
    }

    // Fungsi untuk menghentikan timer
    function stopTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }

    // Fungsi untuk mengupdate tampilan timer
    function updateTimerDisplay() {
        const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
        const seconds = String(timer % 60).padStart(2, '0');
        timerDisplay.textContent = `${minutes}:${seconds}`;
    }

    // Fungsi untuk menambah dan menampilkan langkah
    function incrementMoves() {
        moves++;
        movesDisplay.textContent = moves;
    }

    // Fungsi saat kartu diklik (membalik kartu)
    function flipCard() {
        // Jangan lakukan apa-apa jika papan terkunci, atau kartu yang sama diklik dua kali, atau kartu sudah cocok
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        incrementMoves(); // Tambah langkah setelah dua kartu dibalik
        lockBoard = true; // Kunci papan sementara

        checkForMatch(); // Periksa apakah cocok
    }

    // Fungsi untuk memeriksa apakah dua kartu cocok
    function checkForMatch() {
        const isMatch = firstCard.dataset.id === secondCard.dataset.id;
        isMatch ? disableCards() : unflipCards();
    }

    // Fungsi jika kartu cocok
    function disableCards() {
        // Hapus event listener agar kartu tidak bisa diklik lagi
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        // Tambahkan kelas 'match' untuk efek visual
        firstCard.classList.add('match');
        secondCard.classList.add('match');

        matchesFound++;
        if (matchesFound === memoryImages.length) { // Jika semua pasangan ditemukan
            checkWin(); // Panggil fungsi menang
        }

        resetBoardForNextTurn(); // Reset state untuk giliran berikutnya
    }

    // Fungsi jika kartu tidak cocok (balik kembali)
    function unflipCards() {
        // Tambahkan kelas 'no-match' untuk efek bergetar
        firstCard.classList.add('no-match');
        secondCard.classList.add('no-match');

        setTimeout(() => {
            firstCard.classList.remove('flip', 'no-match');
            secondCard.classList.remove('flip', 'no-match');
            resetBoardForNextTurn(); // Reset state
        }, 1000); // Balik setelah 1 detik
    }

    // Fungsi untuk mereset state papan setelah 2 kartu diuji
    function resetBoardForNextTurn() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    // Fungsi saat game dimenangkan
    function checkWin() {
        stopTimer(); // Hentikan timer
        finalTimeDisplay.textContent = timerDisplay.textContent;
        finalMovesDisplay.textContent = movesDisplay.textContent;
        winModal.classList.add('active'); // Tampilkan modal kemenangan
        document.body.style.overflow = 'hidden'; // Nonaktifkan scroll body
        disableAllCardsClick(); // Nonaktifkan klik semua kartu
    }

    // Fungsi untuk menonaktifkan klik pada semua kartu
    function disableAllCardsClick() {
        document.querySelectorAll('.memory-card').forEach(card => {
            card.removeEventListener('click', flipCard);
        });
    }

    // Fungsi untuk mengaktifkan klik pada semua kartu yang belum cocok
    function enableAllCardsClick() {
        document.querySelectorAll('.memory-card').forEach(card => {
            // Hanya tambahkan listener jika kartu belum cocok dan belum terbalik
            if (!card.classList.contains('match') && !card.classList.contains('flip')) {
                card.addEventListener('click', flipCard);
            }
        });
    }

    // --- Event Listeners untuk Tombol Game ---

    // Tombol "Mulai Permainan"
    startGameBtn.addEventListener('click', () => {
        resetGameStates(); // Reset semua state
        // Hapus kelas flip/match dari semua kartu
        document.querySelectorAll('.memory-card').forEach(card => {
            card.classList.remove('flip', 'match', 'no-match');
        });
        // Beri jeda singkat sebelum kartu dibalikkan ke belakang
        setTimeout(() => {
            initializeMemoryGame(); // Buat papan baru dan acak
            enableAllCardsClick(); // Aktifkan klik pada kartu
            startTimer(); // Mulai timer
        }, 500); // Jeda 0.5 detik
    });

    // Tombol "Ulangi Permainan"
    resetGameBtn.addEventListener('click', () => {
        resetGameStates(); // Reset state
        // Hapus kelas flip/match dari semua kartu
        document.querySelectorAll('.memory-card').forEach(card => {
            card.classList.remove('flip', 'match', 'no-match');
        });
        setTimeout(() => {
            initializeMemoryGame(); // Buat papan baru dan acak
            // Biarkan kartu tidak aktif sampai "Mulai Permainan" ditekan lagi
            disableAllCardsClick();
        }, 500);
    });

    // Tombol "Main Lagi!" di modal kemenangan
    playAgainBtn.addEventListener('click', () => {
        winModal.classList.remove('active');
        document.body.style.overflow = '';
        startGameBtn.click(); // Simulasikan klik tombol "Mulai Permainan"
    });

    // Tombol tutup modal (x) di modal kemenangan
    closeWinModalBtn.addEventListener('click', () => {
        winModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // --- Animasi Reveal untuk Pilihan Game ---
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

    // Inisialisasi awal papan saat halaman dimuat
    initializeMemoryGame(); // Papan dibuat tetapi kartu nonaktif
});