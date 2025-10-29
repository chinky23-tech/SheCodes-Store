const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

app.use(helmet());
app.use(cors());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use(limiter);
app.use(express.json());


// add database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shecodes')

.then(() => {
    console.log('mongoDb connected');
})
.catch((error) => {
    console.error('mongoDb connection error:', error);
});


app.get('/', (req,res) => {
res.json({
    message: 'Welcome to SheCodes-Store',
    security: 'helmet, cors, rate limiting active'
});
});


//import routes
const authRoutes = require('./routes/auth');

//use routes
app.use('/api/auth' , authRoutes);

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});