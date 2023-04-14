import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan';
import connnectDB from './config/db.js';
import authRoute from './routes/authRoute.js'
//configure env
dotenv.config();

// database config
connnectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth', authRoute);

//rest api
app.get("/", (req, res) => {
    res.send({
        message: "welcome to ecommmerce app"
    })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
})