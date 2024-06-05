const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const workLog = require('./routes/workLogs.route')

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(bodyParser.json());

// Define Routes
app.use('/worklog', workLog);

const PORT =  3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
