const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(__dirname + "/views/partials");

app.use(express.static(path.join(__dirname, 'public')));


// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get("/beers", function (request, response) {
  let beers = punkAPI.getBeers(request.query)
  beers.then(beers => {
    console.log(beers[0]);
    response.render("beers", {beers})
  })
});

app.get("/random-beer", function (request, response) {
  let beer = punkAPI.getRandom(request.query)
  beer.then(randomBeer => {
    let rb = randomBeer[0];
    console.log(rb.image_url);
    response.render("random-beer", {rb})
  })
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
