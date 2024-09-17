const express = require('express');
const app = express();
const path = require('path');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');

const PORT = process.env.PORT || 3500;

app.use(logger);

const whitelist = ['https://www.yoursite.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];

const corsOptions = {
    origin: (origin, callback) => {
        if ( whitelist.indexOf(origin) !== -1 || !origin ) {
            callback(null, true); 
        } else {
            callback(new Error('not allowed by the CORS'));
        }
    }
}

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
//===================so in the new versions of express================//
// we no longer need to use these type of additional middlewares which serve static files
// the app.use(express.static(path.join(__dirname, 'public'))) will look for each and sub-directories as long as that have a linked static files that are present in 'public' folder  
//app.use('/subdir', express.static(path.join(__dirname, 'public'))); // we no longer need this❌
//////////////////////////////////////////////////////
//===========[1] handling subdir with router===========//
// app.use('/route', require('./routes/router'));
app.use('/subdir', require('./routes/subdir'));








/////////////////////////////////////////////////////
app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})
app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
})
app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html'); 
})
// Route handlers
app.get('/hello(.html)?', (req, res, next) => {
    console.log('attemped to load hello.html!');
    next();
}, (req, res) => {
    res.send('hello bro!');
})

const one = (req, res, next) => {
    console.log('one');
    next();
}
const two = (req, res, next) => {
    console.log('two');
    next();
}
const three = (req, res, next) => {
    console.log('three');
    res.send('finished!');
}
app.get('/chain(.html)?', [one, two, three]);

app.all('/*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: '404 not found'});
    } else {
        res.type('txt').send('404 not found');
    }
})

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
})
















