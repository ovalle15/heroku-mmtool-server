const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db');
const routerTable = require('./routes/table-router');
const hisRouter = require('./routes/history-yml-router');
const userRouter = require('./routes/users-router')
const passport = require("passport");

const app = express();
const apiPort = process.env.PORT || 5001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

if (process.env.NODE_ENV === 'production'){
    console.log("env ======>", process.env.NODE_ENV)

    app.use((req, res, next) => {
        app.use(function (req, res, next) {

            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', 'https://management-mern-app.herokuapp.com');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

            // Pass to next layer of middleware
            next();
        });
      });

    app.use('/api', routerTable);

    app.use('/api', hisRouter)
    // Passport middleware
    app.use(passport.initialize());
    // Passport config
    require("./config/passport")(passport);
    // Routes
    app.use('/api', userRouter);

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

}
app.listen(apiPort, () => {
    console.log(` ====== Server running on port ====> ${apiPort}`);
});