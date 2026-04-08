const quizData = {
    html: [
        { q: "What does HTML stand for?", a: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Markup Language"], c: 0 },
        { q: "Who is making the Web standards?", a: ["Google", "The World Wide Web Consortium", "Microsoft", "Mozilla"], c: 1 },
        { q: "Choose the correct HTML element for the largest heading:", a: ["<heading>", "<h1>", "<h6>", "<head>"], c: 1 },
        { q: "What is the correct HTML element for inserting a line break?", a: ["<lb>", "<break>", "<br>", "<li>"], c: 2 },
        { q: "Which character is used to indicate an end tag?", a: ["*", "/", "<", "^"], c: 1 },
        { q: "How can you make a numbered list?", a: ["<ul>", "<list>", "<ol>", "<dl>"], c: 2 },
        { q: "How can you make a bulleted list?", a: ["<ol>", "<ul>", "<list>", "<dl>"], c: 1 },
        { q: "What is the correct HTML for making a checkbox?", a: ["<check>", "<checkbox>", "<input type='check'>", "<input type='checkbox'>"], c: 3 },
        { q: "Which HTML element is used to specify a footer for a document?", a: ["<section>", "<footer>", "<bottom>", "<aside>"], c: 1 },
        { q: "What is the correct HTML for inserting an image?", a: ["<img alt='MyImage'>image.gif</img>", "<img href='image.gif'>", "<img src='image.gif' alt='MyImage'>", "<image src='image.gif'>"], c: 2 }
    ],
    css: [
        { q: "What does CSS stand for?", a: ["Colorful Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets"], c: 1 },
        { q: "Which HTML tag is used to define an internal style sheet?", a: ["<css>", "<script>", "<style>", "<link>"], c: 2 },
        { q: "Which HTML attribute is used to define inline styles?", a: ["font", "styles", "class", "style"], c: 3 },
        { q: "Which CSS property is used to change the text color?", a: ["fgcolor", "color", "text-color", "font-color"], c: 1 },
        { q: "Which CSS property controls the text size?", a: ["font-style", "text-size", "font-size", "text-style"], c: 2 },
        { q: "How do you display hyperlinks without an underline?", a: ["a {text-decoration:none;}", "a {underline:none;}", "a {text-decoration:no-underline;}", "a {decoration:no-underline;}"], c: 0 },
        { q: "Which property is used to change the background color?", a: ["bgcolor", "background-color", "color", "back-color"], c: 1 },
        { q: "How do you make the text bold?", a: ["font:bold;", "font-weight:bold;", "style:bold;", "text-decoration:bold;"], c: 1 },
        { q: "Which property is used to change the left margin?", a: ["padding-left", "margin-left", "indent", "margin-right"], c: 1 },
        { q: "What is the default value of the position property?", a: ["relative", "fixed", "absolute", "static"], c: 3 }
    ],
    js: [
        { q: "Inside which HTML element do we put the JavaScript?", a: ["<js>", "<scripting>", "<script>", "<javascript>"], c: 2 },
        { q: "How do you write 'Hello World' in an alert box?", a: ["msgBox('Hello World');", "alert('Hello World');", "msg('Hello World');", "alertBox('Hello World');"], c: 1 },
        { q: "How do you create a function in JavaScript?", a: ["function:myFunction()", "function myFunction()", "function = myFunction()", "def myFunction()"], c: 1 },
        { q: "How do you call a function named 'myFunction'?", a: ["call myFunction()", "myFunction()", "call function myFunction()", "execute myFunction()"], c: 1 },
        { q: "How to write an IF statement in JavaScript?", a: ["if i = 5 then", "if (i == 5)", "if i == 5", "if i = 5"], c: 1 },
        { q: "How does a FOR loop start?", a: ["for (i <= 5; i++)", "for i = 1 to 5", "for (i = 0; i <= 5; i++)", "for (i = 0; i <= 5)"], c: 2 },
        { q: "How can you add a comment in JavaScript?", a: ["'This is a comment", "<!--This is a comment-->", "//This is a comment", "*This is a comment*"], c: 2 },
        { q: "What is the correct way to write a JavaScript array?", a: ["var colors = 1:('red'), 2:('blue')", "var colors = ['red', 'green', 'blue']", "var colors = 'red', 'green', 'blue'", "var colors = (1:'red', 2:'green')"], c: 1 },
        { q: "Which operator is used to assign a value to a variable?", a: ["*", "-", "=", "x"], c: 2 },
        { q: "What will 'typeof []' return?", a: ["array", "object", "list", "undefined"], c: 1 }
    ]
};

let quizQuestions = [];

let currentSubject = '';
let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;
let isLogin = true;

const authMessageDiv = document.getElementById('auth-message');
const infoMessageDiv = document.getElementById('info-message');

function displayMessage(element, message, type) {
    element.innerText = message;
    element.className = `message ${type}`;
    element.classList.remove('hidden');
}

function clearMessages() {
    authMessageDiv.classList.add('hidden');
    infoMessageDiv.classList.add('hidden');
}

function toggleAuth() {
    isLogin = !isLogin;
    document.getElementById('auth-title').innerText = isLogin ? "Sign In" : "Sign Up";
    document.querySelector('#auth-section p').innerText = isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In";
    
    const extraFields = document.querySelectorAll('.auth-extra');
    extraFields.forEach(field => {
        if (isLogin) field.classList.add('hidden');
        else field.classList.remove('hidden');
    });
    clearMessages();
}

function handleAuth() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;
    const city = document.getElementById('city').value;

    clearMessages();

    if (!email || !pass || (!isLogin && (!phone || !city))) {
        displayMessage(authMessageDiv, "Please fill in all fields.", "error");
        return;
    }

    if (pass.length < 6) {
        displayMessage(authMessageDiv, "Password must be at least 6 digits.", "error");
        return;
    }
    
    document.getElementById('auth-section').classList.add('hidden');
    document.getElementById('info-section').classList.remove('hidden');
}

function startQuiz() {
    const name = document.getElementById('student-name').value;
    const cnic = document.getElementById('student-cnic').value;
    const subject = document.getElementById('quiz-subject').value;
    
    clearMessages();
    if (!name || !cnic || !subject) {
        displayMessage(infoMessageDiv, "Please provide your name, CNIC, and select a subject.", "error");
        return;
    }

    // CNIC validation: Check for exactly 13 digits (handles optional dashes)
    const cnicRegex = /^\d{5}-?\d{7}-?\d{1}$|^\d{13}$/;
    if (!cnicRegex.test(cnic)) {
        displayMessage(infoMessageDiv, "Please enter a valid 13-digit CNIC.", "error");
        return;
    }
    
    // Load questions locally
    quizQuestions = quizData[subject] || [];
    currentSubject = subject;
    currentQuestionIndex = 0;
    score = 0;

    document.getElementById('info-section').classList.add('hidden');
    document.getElementById('quiz-section').classList.remove('hidden');
    document.getElementById('subject-title').innerText = `${subject.toUpperCase()} Quiz - Good Luck ${name}!`;

    // Quiz shuru hotay hi fullscreen request karna
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(err => {
            console.warn("Fullscreen request failed. Some browsers require user interaction.", err);
        });
    }

    loadQuestion();
}

// Screen change detect karne ka event listener
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        const quizSection = document.getElementById('quiz-section');
        // Agar quiz chal raha hai aur user fullscreen se bahar nikalta hai (Cheat prevention)
        if (quizSection && !quizSection.classList.contains('hidden')) {
            showResult();
        }
    }
});

function loadQuestion() {
    const q = quizQuestions[currentQuestionIndex];
    selectedOption = null;

    document.getElementById('question-text').innerText = `${currentQuestionIndex + 1}. ${q.q}`;
    const optionsList = document.getElementById('options-list');
    optionsList.innerHTML = '';

    q.a.forEach((opt, index) => {
        const div = document.createElement('div');
        div.className = 'quiz-option';
        div.innerText = opt;
        div.onclick = () => selectOption(div, index);
        optionsList.appendChild(div);
    });

    document.getElementById('progress').innerText = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    document.getElementById('next-btn').innerText = currentQuestionIndex === quizQuestions.length - 1 ? "Show Results" : "Next Question";
}

function selectOption(element, index) {
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
    selectedOption = index;
}

function nextQuestion() {
    if (selectedOption === null) {
        // Temporary warning in progress area without losing state
        const progressEl = document.getElementById('progress');
        const oldText = progressEl.innerText;
        progressEl.innerText = "⚠️ Please select an option!";
        progressEl.style.color = "red";
        setTimeout(() => {
            progressEl.innerText = oldText;
            progressEl.style.color = "";
        }, 1500);
        return;
    }

    if (selectedOption === quizQuestions[currentQuestionIndex].c) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const name = document.getElementById('student-name').value;
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('result-section').classList.remove('hidden');

    const totalQuestions = quizQuestions.length || 1;
    const percentage = (score / totalQuestions) * 100;
    let message = percentage >= 70 ? "Congratulations! You Passed." : "Better luck next time.";
    if (percentage >= 70) {
        triggerCelebration(name, percentage);
    }

    // Result dikhatay waqt fullscreen se bahar nikalna
    if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen();
    }

    const messageColor = percentage >= 70 ? 'var(--success-color)' : 'var(--error-color)';

    document.getElementById('result-area').innerHTML = `
        <p>You scored ${score} out of ${totalQuestions}</p>
        <p>Percentage: ${percentage}%</p>
        <p style="color: ${messageColor}">${message}</p>
    `;
}

function backToInfoSection() {
    document.getElementById('result-section').classList.add('hidden');
    document.getElementById('info-section').classList.remove('hidden');
}

function triggerCelebration(name, percentage) {
    const overlay = document.getElementById('celebration-overlay');
    document.getElementById('celebration-msg').innerText = `${name}, you scored ${percentage}%! You are a superstar!`;
    overlay.classList.remove('hidden');

    // Create Confetti
    for (let i = 0; i < 50; i++) {
        createConfetti();
    }
}

function createConfetti() {
    const colors = ['#007bff', '#28a745', '#ffc107', '#dc3545', '#f39c12'];
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
    confetti.style.opacity = Math.random();
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 5000);
}

function closeCelebration() {
    document.getElementById('celebration-overlay').classList.add('hidden');
}