// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000; // Step 1

// HTTP request logger
app.use(morgan('tiny'));

// Routes
app.get('/api',(req,res) => {
    const data = {
        username: 'sam',
        age: 21
    };
    res.json(data);
});
app.get('/api/name',(req,res) => {
    const data = {
        username: 'mark',
        age: 431
    };
    res.json(data);
});

app.listen(PORT, console.log(`Server is starting at ${PORT} port`));