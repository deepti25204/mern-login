require('dotenv').config();

const express = require('express');
const cors = require('cors')        //  Connect/Express middleware - CORS, Cross-Origin Resource Sharing 
const bodyParser = require('body-parser')

// const db = require('./models')       // just try removal
const routes = require('./routes');
const handle = require('./handlers');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true })); 

app.get('/', (req, res) => res.json({"hello": "world"}));
app.use('/api/auth', routes.auth);

app.use(handle.notFound);
app.use(handle.errors);

app.listen(port, console.log(`Server started on port ${port}`))
