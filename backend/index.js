import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import chalk from 'chalk';
import morgan from 'morgan';
import dotenv from 'dotenv';
import logMiddleware from './middleware/logMiddleware.js';
import { coloredStatus } from './configs/morganConfig.js';
// import { initialDataStart } from './initial-data/initial-data.js';
import { getContent } from './configs/contentConfig.js';
import userRoutes from './routes/userRoutes.js';

// Environment setup
const env = dotenv.config({ path: './.env' }); // for mongoDb Atlas use path: './prod.env'
const port = env.parsed.PORT || 5000;

// MongoDB Connection
async function main() {
    try {
        await mongoose.connect(env.parsed.REMOTE_URL);
        console.log(chalk.green(`mongodb connection established on port : ${chalk.bgGreen('27017')}`));
        // await initialDataStart(); // start to create the initial-data;
    }
    catch (err) {
        console.error(chalk.bgRed(err));
    }
}
main();


// Express App Config
const app = express();
app.use(express.json());

// cors 
app.use(cors({
    origin: true,
    methods: 'GET,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
}));

app.use(express.static("public"));

// Morgan Config - "terminal logs"
morgan.token('coloredStatus', coloredStatus);
app.use(morgan(':coloredStatus :response-time ms'));

// middleWare that log to a log folder
app.use(logMiddleware);

// Routes
app.get('/', (req, res) => res.send(`Welcome 😊 \n Project Event Mangment, 2024`)); // Base route

userRoutes(app);

// Server Listening
app.listen(port, () => {
    console.log(chalk.green(`app is listening to port : ${chalk.bgGreen(port)}`));
});

// Error Handling 
app.all("*", async (req, res) => {
    const combinedContent = await getContent(res);
    res.send(combinedContent);
});   