import ejs from "ejs";
import express from "express"; // Import express js 
import bodyParser from "body-parser";  // Import body parser to read icoming data and process it
import mongoose from "mongoose"; // Import mongoose to manage data entered by the user
import path from "path"; // TO manage various links betweent the code
import { fileURLToPath } from "url"; 
import questions from './data/questions.js';  // Importing the question data
import User from './models/user.js'; // Importing the users Registration details
import bcrypt from 'bcrypt'; // To ensure the same username or any corruption does not occurs

const port = 3000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

let score = 0;  
let currentQuestionIndex = 0;
let selectedCategory = '';
let totalQuestions = 0;
let startTime = 0;
const timerDuration = 20; 

// Categories for quiz

const categories = {
    'mathematics': questions.mathematics,
    'science': questions.science,
    'history': questions.history,
    'sports': questions.sports,
};

// Database connection

mongoose.connect('mongodb://localhost:27017/Quiz-game', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Server is connected');
}).catch(err => {
    console.error('Server is not connected', err);
});

// Home route
app.get("/", (req, res) => {
    res.render("index");
});

// Instructions route
app.get('/Instructions', (req, res) => {
    res.render('Instructions'); 
});

// Contact page route
app.get('/contact', (req, res) => {
    res.render('contact'); 
});

// Results route
app.get('/results', (req, res) => {
    res.render('results', { score, totalQuestions });
});

// Play route 
app.get("/play", (req, res) => {
    res.render("play", { category: null, questions: [] });
});

// After category selection displays questions 
app.post("/play", (req, res) => {
    selectedCategory = req.body.category;
    currentQuestionIndex = 0;
    score = 0;
    totalQuestions = categories[selectedCategory].length;
    startTime = Math.floor(Date.now() / 1000);
    res.redirect("/quiz");
});

// Quiz route to display question
app.get("/quiz", (req, res) => {
    if (currentQuestionIndex < totalQuestions) {
        const question = categories[selectedCategory][currentQuestionIndex];
        res.render("quiz", { question, index: currentQuestionIndex + 1, totalQuestions, timerDuration });
    } else {
        res.redirect("/results");
    }
});

// submit the answers and move to the next question
app.post("/submit-answer", (req, res) => {
    const selectedAnswer = req.body.answer;
    const correctAnswer = categories[selectedCategory][currentQuestionIndex].answer;
    const currentTime = Math.floor(Date.now() / 1000);
    const elapsedTime = currentTime - startTime;

    if (elapsedTime <= timerDuration) {  
        if (selectedAnswer === correctAnswer) {   // if time is over then score is not provided
            score++;
        }
    }
    
    currentQuestionIndex++;
    res.redirect("/quiz");
});

// Registration process
app.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email already registered.');
        }

        // Hash the password for security purposes
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, username, password: hashedPassword });
        await newUser.save();

        // Redirect to login page
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Login route 
app.get("/login", (req, res) => {
    res.render('login'); // Serve the login page
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username }); // to find user is there or not
    if (!user) {
        return res.status(401).send('Invalid username or password');
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).send('Invalid username or password');
    }

    // Successful login
    res.redirect('/login-success');
});

db.createUser({
    user: "Harshal",
    pwd: "123",
    roles: [{ role: "readWrite", db: "mydatabase" }]
})
