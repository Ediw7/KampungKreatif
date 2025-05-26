document.addEventListener('DOMContentLoaded', () => {
    console.log('Tebak Game JavaScript loaded.');

    const tebakContainer = document.querySelector('.tebak-container');
    const tebakRows = document.querySelectorAll('.tebak-row');
    const answerSelects = document.querySelectorAll('.answer-select');
    const submitAnswerBtn = document.getElementById('submit-answer-btn');
    const tebakResult = document.querySelector('.tebak-result');
    const resultTitle = document.querySelector('.result-title');
    const resultDescription = document.querySelector('.result-description');
    const restartTebakBtn = document.getElementById('restart-tebak-btn');

    answerSelects.forEach(select => {
        select.style.color = '#ffffff';
        select.style.backgroundColor = 'var(--color-dark-bg)';
        Array.from(select.options).forEach(option => {
            option.style.color = '#ffffff';
            option.style.backgroundColor = 'var(--color-dark-bg)';
        });
    });

    submitAnswerBtn.addEventListener('click', () => {
        let correctCount = 0;
        const totalImages = tebakRows.length;

        tebakRows.forEach(row => {
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
        });

        tebakContainer.style.display = 'none';
        tebakResult.style.display = 'block';
        resultTitle.textContent = `Hasil Tebak Gambar: ${correctCount}/${totalImages}`;
        resultDescription.textContent = `Anda menebak ${correctCount} dari ${totalImages} gambar dengan benar!`;
    });

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


    tebakResult.style.display = 'none';
});