const express = require('express');
const app = express(); // our app
const PORT = process.env.PORT || 3000;
const methodOverride = require('method-override');

// ------------ DATA -----------------
// inside of fruits.js
const { fruits } = require('./models/fruits');
const { veggies } = require('./models/veggies');
const { meats } = require('./models/meats');
const { ooflavors } = require('./models/overnightoats');

// ------------ MIDDLEWARE ------------
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use('/', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// add middle for PUT AND DELETE methods

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));


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

// *********** FRUITS GET - EDIT PAGE **********
app.get('/fruits/:id/edit', (req, res) => {
    const fruit = fruits[req.params.id];
    let id = parseInt(req.params.id);
    res.render('fruits/edit', { fruit, id });
});

// ********* FRUITS GET - DELETE PAGE ************
app.get('/fruits/:id/delete', (req, res) => {
    const fruit = fruits[req.params.id];
    let id = parseInt(req.params.id);
    res.render('fruits/delete', { fruit, id });
});


// ********** POST NEW FRUIT ************
app.post('/fruits', (req, res) => {
    console.log('---------- FORM BODY ---------\n', req.body);
    // add more code here
    if (req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else { // req.body.readyToEat will be undefined (unchecked)
        req.body.readyToEat = false;
    }
    fruits.push(req.body);
    res.redirect('/fruits');
});

// ************** PUT - UPDATE FRUIT *************
app.put('/fruits/:id', (req, res) => {
    console.log('------- UPDATE FRUIT -------\n', req.body);
    if (req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    fruits[parseInt(req.params.id)] = req.body; //
    res.redirect('/fruits'); // redirect to /fruits route to get to index page
});

// ************* DELETE - DELETE FRUIT ***********
app.delete('/fruits/:id', (req, res) => {
    // remove the fruit item from the fruits array
    fruits.splice(parseInt(req.params.id), 1);
    console.log(fruits);
    res.redirect('/fruits'); // redirect back to index page (/fruits)
});

// ****** VEGGIES INDEX ROUTE *******
app.get('/veggies', (req, res) => {
    // send array as a response
    res.render('veggies/index', { allFruits: fruits, allVeggies: veggies, allMeats: meats });
});

//***** NEW VEGGIE ROUTE **** 
app.get('/veggies/new',(req, res) => {
    res.render('veggies/new.ejs', {});
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

// *********** VEGGIES GET - EDIT PAGE **********
app.get('/veggies/:id/edit', (req, res) => {
    const veggie = veggies[req.params.id];
    let id = parseInt(req.params.id);
    res.render('veggies/edit', { veggie, id });
});

// ********* VEGGIES GET - DELETE PAGE ************
app.get('/veggies/:id/delete', (req, res) => {
    const veggie = veggies[req.params.id];
    let id = parseInt(req.params.id);
    res.render('veggies/delete', { veggie, id });
});


// ********** POST NEW VEGGIE ************
app.post('/veggies', (req, res) => {
    console.log('---------- FORM BODY ---------\n', req.body);
    // add more code here
    if (req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else { // req.body.readyToEat will be undefined (unchecked)
        req.body.readyToEat = false;
    }
    veggies.push(req.body);
    res.redirect('/veggies');
});

// ************** PUT - UPDATE VEGGIE *************
app.put('/veggies/:id', (req, res) => {
    console.log('------- UPDATE FRUIT -------\n', req.body);
    if (req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    fruits[parseInt(req.params.id)] = req.body; //
    res.redirect('/veggies'); // redirect to /fruits route to get to index page
});

// ************* DELETE - DELETE VEGGIE ***********
app.delete('/veggies/:id', (req, res) => {
    // remove the fruit item from the fruits array
    fruits.splice(parseInt(req.params.id), 1);
    console.log(veggies);
    res.redirect('/veggies'); // redirect back to index page (/fruits)
});

// ****** MEATS INDEX ROUTE *******

app.get('/meats', (req, res) => {
    // send array as a response
    res.render('meats/index', { allFruits: fruits, allVeggies: veggies, allMeats: meats });
});

//***** NEW MEAT ROUTE **** 
app.get('/meats/new',(req, res) => {
    res.render('meats/new.ejs', {});
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

// *********** MEATS GET - EDIT PAGE **********
app.get('/meats/:id/edit', (req, res) => {
    const meat = meats[req.params.id];
    let id = parseInt(req.params.id);
    res.render('meats/edit', { veggie, id });
});

// ********* MEATS GET - DELETE PAGE ************
app.get('/meats/:id/delete', (req, res) => {
    const meat = meats[req.params.id];
    let id = parseInt(req.params.id);
    res.render('meats/delete', { meat, id });
});


// ********** POST NEW MEAT ************
app.post('/meat', (req, res) => {
    console.log('---------- FORM BODY ---------\n', req.body);
    // add more code here
    if (req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else { // req.body.readyToEat will be undefined (unchecked)
        req.body.readyToEat = false;
    }
    meats.push(req.body);
    res.redirect('/meats');
});

// ************** PUT - UPDATE MEAT *************
app.put('/meats/:id', (req, res) => {
    console.log('------- UPDATE FRUIT -------\n', req.body);
    if (req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    fruits[parseInt(req.params.id)] = req.body; //
    res.redirect('/meats'); // redirect to /fruits route to get to index page
});

// ************* DELETE - DELETE MEAT ***********
app.delete('/meats/:id', (req, res) => {
    // remove the fruit item from the fruits array
    fruits.splice(parseInt(req.params.id), 1);
    console.log(meats);
    res.redirect('/meats'); // redirect back to index page (/fruits)
});




// ***** OVERNIGHT OATS *****
// ***** OVERNIGHT OATS INDEX ROUTE *****

app.get('/overnightoatshome', (req, res) => {
    res.render('overnightoats/index.ejs', {});
});

// ***** OVERNIGHT OATS FLAVOR ROUTE *****
app.get('/overnightoatsflavors', (req, res) => {
    // send array as a response
    res.render('overnightoats/showflavors.ejs', {allOoflavors: ooflavors});
});

// **** OVERNIGHT OATS ABOUT ROUTE *****
app.get('/ooabout', (req, res) => {
    res.render('overnightoats/showAbout.ejs', {});
});


// ----------- LISTEN FOR SERVER ----------
app.listen(PORT, () => {
    console.log('🎧 Server is running on PORT 🎧', PORT);
});