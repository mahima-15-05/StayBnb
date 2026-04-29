const express = require('express');
const app = express();
const cors = require('cors');
const {connectDB} = require('./config/db.js');

const authRoutes = require('./routes/auth.route.js');
const seedAdmin = require('./config/seedAdmin.js')

require('dotenv').config();


app.use(express.json());
app.use(cors());
connectDB().then(()=>seedAdmin());


app.get('/', (req,res)=>{
    res.json({message:"This is home route"})
})


app.use(authRoutes);
app.use( (req,res)=>{
    res.status(404).json({message:"This page is not found"})
})
const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log("Server started");
});

