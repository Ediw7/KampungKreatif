document.addEventListener('DOMContentLoaded', () => {
    console.log('Quiz Game JavaScript loaded.');

    const quizContainer = document.querySelector('.quiz-container');
    const quizStart = document.querySelector('.quiz-start');
    const quizQuestion = document.querySelector('.quiz-question');
    const quizOptions = document.querySelector('.quiz-options');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const finishQuizBtn = document.getElementById('finish-quiz-btn');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const scoreDisplay = document.getElementById('score-display');
    const quizResult = document.querySelector('.quiz-result');
    const resultTitle = document.querySelector('.result-title');
    const resultDescription = document.querySelector('.result-description');
    const restartQuizBtn = document.getElementById('restart-quiz-btn');

    // Data Pertanyaan Quiz (5 pertanyaan)
    const quizData = [
        {
            question: 'Apa kepanjangan dari UMKM dalam konteks ekonomi Indonesia?',
            options: ['Usaha Mikro Kecil dan Menengah', 'Usaha Mandiri Koperasi Masyarakat', 'Unit Masyarakat Kreatif Mandiri', 'Usaha Milik Komunitas Mandiri'],
            correctAnswer: 'Usaha Mikro Kecil dan Menengah'
        },
        {
            question: 'Bahan dasar yang sering digunakan dalam kerajinan anyaman di Indonesia adalah...',
            options: ['Logam', 'Bambu', 'Kaca', 'Keramik'],
            correctAnswer: 'Bambu'
        },
        {
            question: 'Produk UMKM berikut ini biasanya menggunakan resin sebagai bahan utama, kecuali...',
            options: ['Gantungan kunci', 'Kalung', 'Topi bambu', 'Jam dinding'],
            correctAnswer: 'Topi bambu'
        },
        {
            question: 'Salah satu manfaat mendukung produk UMKM lokal adalah...',
            options: ['Meningkatkan harga impor', 'Mengurangi lapangan kerja', 'Memajukan ekonomi lokal', 'Mengurangi produksi nasional'],
            correctAnswer: 'Memajukan ekonomi lokal'
        },
        {
            question: 'Kerajinan tangan berbahan dasar batok kelapa sering dijadikan...',
            options: ['Perhiasan emas', 'Mainan plastik', 'Lampu hias dan wadah', 'Tas kulit'],
            correctAnswer: 'Lampu hias dan wadah'
        }
    ];
    
    let currentQuestionIndex = 0;
    let score = 0;
    let selectedAnswer = null;

    function loadQuestion() {
        const currentQuestion = quizData[currentQuestionIndex];
        quizQuestion.textContent = currentQuestion.question;
        quizOptions.innerHTML = '';

        currentQuestion.options.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('quiz-option');
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectAnswer(optionElement, option));
            quizOptions.appendChild(optionElement);
        });

        nextQuestionBtn.style.display = selectedAnswer ? 'inline-block' : 'none';
        finishQuizBtn.style.display = (currentQuestionIndex === quizData.length - 1) ? 'inline-block' : 'none';
        scoreDisplay.textContent = `Skor: ${score}/${quizData.length}`;
    }

    function selectAnswer(optionElement, answer) {
        if (selectedAnswer) return;

        selectedAnswer = answer;
        const currentQuestion = quizData[currentQuestionIndex];

        quizOptions.querySelectorAll('.quiz-option').forEach(el => {
            el.classList.remove('selected', 'correct', 'incorrect');
            if (el.textContent === currentQuestion.correctAnswer) {
                el.classList.add('correct');
            }
        });

        optionElement.classList.add('selected');
        if (answer === currentQuestion.correctAnswer) {
            score++;
            optionElement.classList.add('correct');
        } else {
            optionElement.classList.add('incorrect');
        }

        nextQuestionBtn.style.display = 'inline-block';
        finishQuizBtn.style.display = (currentQuestionIndex === quizData.length - 1) ? 'inline-block' : 'none';
    }
    function nextQuestion() {
        if (currentQuestionIndex < quizData.length - 1) {
            currentQuestionIndex++;
            selectedAnswer = null;
            loadQuestion();
        }
    }

    function finishQuiz() {
        quizContainer.style.display = 'none';
        quizResult.style.display = 'block';
        const percentage = ((score / quizData.length) * 100).toFixed(0);
        resultTitle.textContent = `Skor Anda: ${score}/5`;
        resultDescription.textContent = `Anda mendapatkan ${percentage}% poin! ${percentage >= 70 ? 'Selamat, pengetahuan budaya Anda luar biasa!' : 'Coba lagi untuk meningkatkan skor Anda!'}`;
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        selectedAnswer = null;
        quizResult.style.display = 'none';
        quizContainer.style.display = 'block';
        loadQuestion();
    }

    startQuizBtn.addEventListener('click', () => {
        quizStart.style.display = 'none';
        quizContainer.style.display = 'block';
        loadQuestion();
    });
    nextQuestionBtn.addEventListener('click', nextQuestion);
    finishQuizBtn.addEventListener('click', finishQuiz);
    restartQuizBtn.addEventListener('click', restartQuiz);

    quizContainer.style.display = 'none';
    quizResult.style.display = 'none';
});