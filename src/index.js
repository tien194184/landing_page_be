const path = require('path');
const express = require('express');
// const morgan = require('morgan');
const methodOverride = require('method-override');
const app = express();
const port = 3001;
const route = require('./routes'); // tự nạp file index
const db = require('./config/db');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

console.log(process.env.PORT);
// Connect to DB
db.connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`);
        });
    })
    .catch();

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(methodOverride('_method'));

// Rotes init
route(app);
