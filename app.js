const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const workLog = require('./routes/workLogs.route')

const app = express();

connectDB();

app.use(bodyParser.json());

app.use('/worklog', workLog);

const PORT =  3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
