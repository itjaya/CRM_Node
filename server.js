const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./routes');
const config = require('./config/config');
const db = require('./config/database');
db();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use(routes);

app.listen(config.port, () => {
    console.log(`Server is listening on ${config.port}`)
})