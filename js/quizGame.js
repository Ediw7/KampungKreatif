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
            question: 'Apa nama tarian tradisional yang berasal dari Bali dan menggambarkan kisah Ramayana?',
            options: ['Tari Saman', 'Tari Kecak', 'Tari Jaipong', 'Tari Piring'],
            correctAnswer: 'Tari Kecak'
        },
        {
            question: 'Alat musik tradisional Indonesia yang terbuat dari bambu dan dimainkan dengan ditiup adalah...',
            options: ['Sasando', 'Angklung', 'Saron', 'Suling'],
            correctAnswer: 'Angklung'
        },
        {
            question: 'Makanan khas Indonesia yang terbuat dari daging sapi dimasak dengan rempah kaya adalah...',
            options: ['Rendang', 'Sate', 'Gado-gado', 'Nasi Goreng'],
            correctAnswer: 'Rendang'
        },
        {
            question: 'Candi terbesar di Indonesia yang merupakan warisan budaya UNESCO adalah...',
            options: ['Candi Prambanan', 'Candi Borobudur', 'Candi Sewu', 'Candi Kalasan'],
            correctAnswer: 'Candi Borobudur'
        },
        {
            question: 'Apa nama kain tradisional Indonesia yang dikenal dengan motif khas dan proses tulis?',
            options: ['Songket', 'Batik', 'Tenun Ikat', 'Ulos'],
            correctAnswer: 'Batik'
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