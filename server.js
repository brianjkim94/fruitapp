const express = require('express');
const app = express(); // our app
const PORT = process.env.PORT || 3000;
const methodOverride = require('method-override');

// ------------ DATA -----------------
// inside of fruits.js
const { fruits } = require('./models/fruits');
const { veggies } = require('./models/veggies');
const { meats } = require('./models/meats');

// ------------ MIDDLEWARE ------------
app.use(methodOverride('_method'));
app.set('view engine', 'ejs'); // come back to this
app.use('/', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// add middleware for PUT and DELETE methods


// ------------ ROUTES ---------------
// ******* FRUITS INDEX ROUTE **********
app.get('/fruits', (req, res) => {
    // send array as a response
    res.render('fruits/index', { allFruits: fruits, allVeggies: veggies, allMeats: meats });
});

//***** New Fruits ROUTE **** 
app.get('/fruits/new',(req, res) => {
    res.render('fruits/new.ejs', {});
});

// ******* FRUITS SHOW ROUTE **********
app.get('/fruits/:indexOfFruitsArray', (req, res) => {
    let idx = parseInt(req.params.indexOfFruitsArray);
    if (idx >= fruits.length) {
        // res.send('There is no fruit at that index.'); // one solution
        // res.send(fruits);
        res.render('404', {});
    } else {
        // res.send(fruits[idx]);
        res.render('fruits/show', { fruit: fruits[idx], id: idx });
    }
});

// ****** GET ROUTE -- EDIT PAGE ******
app.get('/fruits/:id/edit', (req, res) => {
    const fruit = fruits[req.params.id];
    let id = parseInt(req.params.id);
    res.render('fruits/edit', { fruit, id });
});

// **** GET - DELETE PAGE *****
app.get('/fruits/:id/delete', (req, res) => {
    const fruit = fruits[req.params.id];
    let id = parseInt(req.params.id);
    res.sender('fruits/delete', { fruit, id});
});


// ***** POST NEW FRUIT *****
app.post('/fruits', (req, res) => {
    console.log('------ FORM BODY ------\n', req.body);
    // add more code here
    if (req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else { // req.body.readyToEat will be undefined (unchecked)
        req.body.readyToEat = false;
    }
    fruits.push(req.body);
    res.redirect('/fruits')
});

//******PUT - UPDATE FRUIT  */
app.put('/fruits/:id', (req,res) => {
    console.log('----UPDATE FRUIT----\n', req.body);
    if (req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    fruits[parseInt(req.params.id)] = req.body; //
    res.redirect('/fruits'); // redirect to /fruits route to get to index page
});

// ****** VEGGIES INDEX ROUTE *******
app.get('/veggies', (req, res) => {
    // send array as a response
    res.render('veggies/index', { allFruits: fruits, allVeggies: veggies, allMeats: meats });
});


// ****** VEGGIES SHOW ROUTE ********
app.get('/veggies/:indexOfVeggiesArray', (req, res) => {
    let idx = parseInt(req.params.indexOfVeggiesArray);
    if (idx >= veggies.length) {
        // res.send('There is no fruit at that index.'); // one solution
        // res.send(fruits);
        res.render('404', {});
    } else {
        // res.send(fruits[idx]);
        res.render('veggies/show', { veggie: veggies[idx] });
    }
});


// ****** MEATS INDEX ROUTE *******

app.get('/meats', (req, res) => {
    // send array as a response
    res.render('meats/index', { allFruits: fruits, allVeggies: veggies, allMeats: meats });
});


// ****** MEATS SHOW ROUTE *******
app.get('/meats/:indexOfMeatsArray', (req, res) => {
    let idx = parseInt(req.params.indexOfMeatsArray);
    if (idx >= meats.length) {
        // res.send('There is no fruit at that index.'); // one solution
        // res.send(fruits);
        res.render('404', {});
    } else {
        // res.send(fruits[idx]);
        res.render('meats/show', { meat: meats[idx] });
    }
});


// ***** FOOD BLOG *****
// ***** FOOD BLOG INDEX ROUTE *****

app.get('/overnightoats', (req, res) => {
    res.render('overnightoats/index.ejs')
});

// ***** FOOD BLOG SHOW ROUTE *****
app.get('/overnightoats/:oohome', (req, res) => {
    res.render('/overnightoats/showHome.ejs')
});

app.get('/ooabout', (req, res) => {
    res.send('/overnightoats/showAbout.ejs')
});


// ----------- LISTEN FOR SERVER ----------
app.listen(PORT, () => {
    console.log('🎧 Server is running on PORT 🎧', PORT);
});