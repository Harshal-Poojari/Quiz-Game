import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import session from "express-session";
import questions from "./data/questions.js"; // Ensure the correct path to your questions.js file

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// Set up session management
app.use(session({
    secret: '12345678', // Change this to a secure random string in production
    resave: false,
    saveUninitialized: true,
}));

// Middleware for serving static files and parsing requests
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, './views'));

// Middleware to initialize session state for the quiz
app.use((req, res, next) => {
    req.session.score = req.session.score || 0;
    req.session.currentQuestionIndex = req.session.currentQuestionIndex || 0;
    req.session.selectedCategory = req.session.selectedCategory || null;
    req.session.timerDuration = req.session.timerDuration || 30; // Default timer
    req.session.remainingTime = req.session.remainingTime || req.session.timerDuration; // Track remaining time
    req.session.lastAnswerCorrect = req.session.lastAnswerCorrect || null;
    next();
});

// Utility functions to read and write users.json
const getUsers = () => {
    if (!fs.existsSync('users.json')) {
        fs.writeFileSync('users.json', JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync('users.json', 'utf-8'));
};

const saveUsers = (users) => {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
};

// Routes
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/login", (req, res) => {
    res.render('login', { error: null });
});

app.get('/instructions', (req, res) => {
    res.render('instructions');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/results', (req, res) => {
    const totalQuestions = req.session.selectedCategory ? questions[req.session.selectedCategory].length : 0;
    res.render('results', { score: req.session.score, totalQuestions });
    req.session.destroy(); // Reset session after showing results
});

app.get("/play", (req, res) => {
    res.render("play", { category: null, questions: [], result: null });
});

app.post("/play", (req, res) => {
    req.session.selectedCategory = req.body.category;
    req.session.currentQuestionIndex = 0;
    req.session.score = 0;
    req.session.remainingTime = req.session.timerDuration; // Reset remaining time
    req.session.lastAnswerCorrect = null; // Reset last answer status
    res.redirect("/quiz");
});

app.route("/quiz")
    .get((req, res) => {
        const { selectedCategory } = req.session;
        const currentQuestionIndex = req.session.currentQuestionIndex;

        if (!selectedCategory || !questions[selectedCategory]) {
            return res.redirect("/play");
        }

        const totalQuestions = questions[selectedCategory].length;

        if (currentQuestionIndex < totalQuestions && currentQuestionIndex >= 0) {
            const question = questions[selectedCategory][currentQuestionIndex];
            res.render("quiz", {
                question,
                index: currentQuestionIndex + 1,
                totalQuestions,
                remainingTime: req.session.remainingTime,
                score: req.session.score,
                lastAnswerCorrect: req.session.lastAnswerCorrect
            });
        } else {
            res.redirect("/results");
        }
    })
    app.post("/quiz", (req, res) => {
        const selectedAnswer = req.body.answer; // The answer selected by the user
        const currentCategory = req.session.selectedCategory;
    
        // Check if the current question index is valid
        if (!currentCategory || !questions[currentCategory] || req.session.currentQuestionIndex === undefined) {
            return res.status(400).send("Invalid question or category.");
        }
    
        // Get the current question
        const currentQuestion = questions[currentCategory][req.session.currentQuestionIndex];
        
        // Ensure the current question is valid
        if (!currentQuestion) {
            return res.status(400).send("Current question is undefined.");
        }
    
        // Define correctAnswer from the current question
        const correctAnswer = currentQuestion.answer;
    
        // Check if the selected answer is valid and update the score
        if (selectedAnswer && selectedAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
            req.session.score++;
            req.session.lastAnswerCorrect = true;
        } else {
            req.session.lastAnswerCorrect = false;
        }
    
        // Handle navigation logic
        if (req.body.navigation === "next") {
            if (req.session.currentQuestionIndex < questions[currentCategory].length - 1) {
                req.session.currentQuestionIndex++;
            }
        } else if (req.body.navigation === "prev") {
            if (req.session.currentQuestionIndex > 0) {
                req.session.currentQuestionIndex--;
            }
        }
    
        // Redirect back to the quiz page
        res.redirect("/quiz");
    });
    

    

// Registration route
app.get("/register", (req, res) => {
    res.render('register', { error: null });
});

app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const users = getUsers();

        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.json({
                success: false,
                message: 'You have already registered. Please log in to continue.'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { name, email, password: hashedPassword };
        users.push(newUser);
        saveUsers(users);

        req.session.userName = name;
        res.json({ success: true });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ success: false, message: 'Error registering user' });
    }
});

// Login route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const users = getUsers();
    const user = users.find(user => user.email === email);

    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userName = user.name;
        res.redirect("/welcome");
    } else {
        res.render('login', { error: 'Invalid email or password.' });
    }
});

app.get("/welcome", (req, res) => {
    if (req.session.userName) {
        res.render("welcome", { user: { name: req.session.userName } });
    } else {
        res.redirect("/login");
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
