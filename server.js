const express = require('express');
const cors =require('cors')
const app = express();

const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

//connect database
connectDB();

app.use(cors());
//Init middelware 
app.use(express.json()); 

app.get('/', (req,res) => {
    res.json({msg: 'Welcome to the contact keeper api'});
});   

//Define routes 
app.use('/users', require('./routes/users'));
app.use('/exercises', require('./routes/exercises'));

app.listen(PORT, ()=> console.log(`listening on port ${PORT}`))       