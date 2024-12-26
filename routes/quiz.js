import express from 'express';
const app = express.Router();

app.get('/quiz', (req, res) => {
    res.render('questions.js'); 
});

export default app;