const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, 'views/partials'));
hbs.registerPartial('beerpartial', '{{beerpartial}}');

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index', {
    docTitle: 'IronBeers'
  });
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers().then(beersFromApi => {
    // console.log('Beers from the database: ', beersFromApi);
    res.render('beers', {
      beersArr: beersFromApi,
      docTitle: 'Top 20 beers from Punk API'
    });
  });
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom().then(beer => {
    // console.log(beer);
    res.render('random-beer', {
      ranBeer: beer,
      docTitle: 'Random Beer from punk API'
    });
  });
});

app.get('/beers/:beerId', (req, res) => {
  // console.log(req.params);
  punkAPI.getBeer(req.params.beerId).then(beer => {
    // console.log(String(beer[0].name));
    res.render('beer', {
      beer: beer,
      docTitle: beer[0].name
    });
  });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
