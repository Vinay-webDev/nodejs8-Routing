const express = require('express');
// here instead of app we say router
const router = express.Router();
const path = require('path');

//1. Let's handle the subdir inside the views folder that we haven't handled at all yet***
//instead of app.get() we need to use router.get();

router.get('^/$|/index(.html)?', (req, res) => {
    // carefull here!!! 
    // we are inside the router folder we no longer inside the parent folder 
    // so we need to go one step up '..'
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'index.html'));
})
//2. now let's also handle the other test.html file present in our subdir
router.get('/test(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'test.html'));
})

module.exports = router;






