// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000; // Step 1

app.use(cors());

mongoose.connect('mongodb://localhost/calculatorDB',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected',() => {
    console.log('Mongoose is connected!!!');
});

// Schema
const Schema = mongoose.Schema;
const calculatorSchema = new Schema({
    buttons: Array
});

// Model
const Calculator = mongoose.model('Calc',calculatorSchema);

// Saving data to our mongo db
// const data = {
//     buttons: [
//         "C", "+-", "%", "/",
//         7, 8, 9, "X",
//         4, 5, 6, "-",
//         1, 2, 3, "+",
//         0, ".", "=",
//         ]
// }

// const newCalculator= new Calculator(data); // instance of the model

// newCalculator.save((error) => {
//     if(error) console.log('Oops something has happened!!!');
//     else console.log('Data has been saved');
// });

// HTTP request logger
app.use(morgan('tiny'));

// Routes
app.get('/api',(req,res) => {
    Calculator.find({})
    .then((data)=>{
        console.log('Data : ',data);
        res.json(data);
    })
    .catch((error)=>{
        console.log('Error : ',error);
    })
});

app.listen(PORT, console.log(`Server is starting at ${PORT} port`));