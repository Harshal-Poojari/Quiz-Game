import express from 'express';
const app = express.Router();

app.get('/', (req, res) => {
    res.render('index'); // For index.ejs
});

export default app;