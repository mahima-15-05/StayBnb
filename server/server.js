const express = require('express');
const app = express();
const cors = require('cors');
const {connectDB} = require('./config/db.js');

const authRoutes = require('./routes/auth.route.js');
const adminRoutes = require('./routes/admin.route.js')
const seedAdmin = require('./config/seedAdmin.js')
const roomRoute = require('./routes/room.route.js');


require('dotenv').config();


app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
connectDB().then(()=>seedAdmin());


app.get('/', (req,res)=>{
    res.json({message:"This is home route"})
})


app.use('/api/auth',authRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/rooms', roomRoute);
app.use( (req,res)=>{
    res.status(404).json({message:"This page is not found"})
})
const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log("Server started");
});

