const express = require('express');
const router = express.Router();
// let's create a const called data and set it to an empty object
const data = {};
// this kinda connecting to the database***
data.employees = require('../../data/employess.json');

// let's create routes
//router.get('/');
// you know instead of the having multiply router.get(), router.post(), router.put()
// we can chain these http request methods👇
router.route('/')
    .get((req, res) => {
        res.json(data.employees);
    })
    .post((req, res) => {
        // post is a method used when posting a new data to the database or creating a data in database
        res.json({
            "firstname":req.body.firtname,
            "lastname":req.body.lastname
        })
    })
    .put((req, res) => {
        // similarly put request is when we updating data****
        res.json({
            "firstname":req.body.firstname,
            "lastname":req.body.lastname
        })
    })
    .delete((req, res) => {
        res.json({
            "id":req.body.id
        })
    })
// let's add one more route ==>> what if we get request like this
//('/:id') 
router.route('/:id')
    .get((req, res) => {
        res.json({
            "id":req.params.id
        })
    })

module.exports = router;














