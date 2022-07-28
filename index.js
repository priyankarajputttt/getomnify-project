const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const route = require('./routes/route');
const multer = require('multer');
const cookieParser = require('cookie-parser')

const app = express();

mongoose.connect("mongodb+srv://priyanka:PriyankaRajput@cluster0.fhqcn.mongodb.net/getOmnify?retryWrites=true&w=majority").then(() => {
    console.log("MongoDB Connected");
}).catch((err) => {
    console.log(err.message);
});

app.use(express.static(path.join(__dirname, 'ui')));
app.get('/profile', (req, res)=>{
    res.sendFile(path.join(__dirname, './ui/profile/profile.html'));
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any());
app.use(cookieParser());

app.use('/', route);

app.listen(8000, () => {
    console.log("Server is running on Port 8000");
}); 