document.addEventListener('DOMContentLoaded', () => {
    console.log('Tebak Game JavaScript loaded.');

    // Elemen untuk tombol Mulai dan container awal
    const tebakStart = document.querySelector('.tebak-start');
    const startTebakBtn = document.getElementById('start-tebak-btn');
    const tebakContainer = document.querySelector('.tebak-container');
    const tebakRows = document.querySelectorAll('.tebak-row');
    const answerSelects = document.querySelectorAll('.answer-select');
    const submitAnswerBtn = document.getElementById('submit-answer-btn');
    const tebakResult = document.querySelector('.tebak-result');
    const resultTitle = document.querySelector('.result-title');
    const resultDescription = document.querySelector('.result-description');
    const answerList = document.querySelector('.answer-list');
    const restartTebakBtn = document.getElementById('restart-tebak-btn');

    // Logika tombol Mulai
    startTebakBtn.addEventListener('click', () => {
        tebakStart.style.display = 'none';
        tebakContainer.style.display = 'block';
    });

    // Styling untuk dropdown
    answerSelects.forEach(select => {
        select.style.color = '#ffffff';
        select.style.backgroundColor = 'var(--color-dark-bg)';
        Array.from(select.options).forEach(option => {
            option.style.color = '#ffffff';
            option.style.backgroundColor = 'var(--color-dark-bg)';
        });
    });

    // Logika tombol Yakin
    submitAnswerBtn.addEventListener('click', () => {
        let correctCount = 0;
        const totalImages = tebakRows.length;

        // Reset daftar kunci jawaban
        answerList.innerHTML = '';

        // Periksa jawaban dan tambahkan kunci jawaban
        tebakRows.forEach((row, index) => {
            const imageItem = row.querySelector('.image-item');
            const select = row.querySelector('.answer-select');
            const correctAnswer = imageItem.dataset.answer;
            const userAnswer = select.value;

            if (!userAnswer) {
                alert('Silakan pilih jawaban untuk semua gambar!');
                return;
            }

            if (userAnswer === correctAnswer) {
                imageItem.classList.add('correct');
                correctCount++;
            } else {
                imageItem.classList.add('incorrect');
            }

            select.disabled = true;

            // Tambahkan kunci jawaban ke daftar
            const listItem = document.createElement('li');
            listItem.textContent = `Gambar ${index + 1}: ${correctAnswer}`;
            answerList.appendChild(listItem);
        });

        tebakContainer.style.display = 'none';
        tebakResult.style.display = 'block';
        resultTitle.textContent = `Hasil Tebak Gambar: ${correctCount}/${totalImages}`;
        resultDescription.textContent = `Anda menebak ${correctCount} dari ${totalImages} gambar dengan benar!`;
    });

    // Logika tombol Main Lagi
    restartTebakBtn.addEventListener('click', () => {
        tebakResult.style.display = 'none';
        tebakContainer.style.display = 'block';
        tebakRows.forEach(row => {
            const imageItem = row.querySelector('.image-item');
            const select = row.querySelector('.answer-select');
            imageItem.classList.remove('correct', 'incorrect');
            select.disabled = false;
            select.value = '';
        });
    });

    // Pastikan tebak-result awalnya disembunyikan
    tebakResult.style.display = 'none';
});