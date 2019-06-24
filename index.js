const express = require('express');
const ENV = process.env.ENV || "development"
const bcrypt = require('bcrypt')
const cookieSession = require('cookie-session')
const NodeGeocoder = require('node-geocoder');
const saltRounds = 10;
const path = require('path');
const app = express();
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const knexLogger = require('knex-logger');

require('dotenv').config()
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(knexLogger(knex));
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"]
  })
);

var options = {
  provider: 'google',
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: process.env.GOOGLEMAPS_APIKEY, // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);

// An api endpoint that returns a short list of items
app.get('/api/getList', (req, res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log('Sent list of items');
});

////Home page/////
app.get('/', (req, res) => {
  knex
    .select("*")
    .from("users")
    .then((results) => {
      res.json(results);
  });
});

////////////REGISTER ROUTES///////////////

app.post("/api/register", (req, res) => {

  const username = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const address = req.body.address;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  // if (req.body.type === 'grocer'){}
  knex.select('name', 'id').from('users').then((users) => {
    for (let i = 0; i < users.length; i ++) {
      if (email.length === 0 || password.length === 0) {
        res.status(400).send("Email or password is empty");
      } else if 
      (users[i].name === grocername ||users[i].email === email ) {
        res.status(403).send('User already exists')
        return false
      }
    }
    const latitude = ''
    const longitude = ''
    geocoder.geocode(req.body.address, function(err, res) {
      console.log(res);
      latitude = res[0].latitude
      longitude = res[0].longitude
    });

    knex('users')
      .returning('id')
      .insert([{
        name: username, 
        email: email,
        password: hashedPassword,
        address: address,
        latitude: latitude,
        longitude: longitude
      }])
      .then((ids) => {
        var user_id = ids[0];
        req.session.user_id = user_id;
        res.send("Ok")
    })
  })
});
///////////LOGIN ROUTES///////////////////
app.post("/api/login", (req, res) => {
  const email = req.body.email;
    const password = req.body.password;
    let flag = false
    let pswrdFromDatabase = ''
    let userIndex = 0

    knex.select('email', 'id', 'password').from('users').then((users) => {
      for (let i = 0; i < users.length; i ++) {
        if (users[i].email === email) {
          flag = true
          pswrdFromDatabase = users[i].password
          userIndex = i
        }
      }
      if (flag === true && (bcrypt.compareSync(password, pswrdFromDatabase))) {
      knex('users')
        .returning('id')
        .then((ids) => {
          req.session.grocer_id = ids[userIndex].id;
          res.json({
            success: true,
          })
          res.redirect("/")
      })
      }
    })

});

//////////// Make a donation////////////////////
 app.post("/api/product", (req, res) => {
  const { name, quantity, unit, expiry_date } = req.body
  if(req.session.user_id){
    knex('products').insert({
      name: name,
      quantity: quantity,
      unit: unit,
      expiry_date: expiry_date,
      user_id: req.session.user_id
    }).then(product => {
      console.log('product', product)
      res.status(200).send("Ok")
    })
  }
}); 

////////////Get A Donation/////////////////////
app.get("/products", (req, res) => {
  //check if query string exists, search that query in the database and show the ones that have the key
  const {
    search
  } = req.query;
  if (search) {
    knex
      .select("*")
      .from("products")
      .where("name", "like", `%${search}%`)
      .then(products => {
        console.log("searched products",products)
        res.json(products);
      });
  } else {
    knex
      .select("*")
      .from("products")
      .then(products => {
          console.log("products", products);
          res.json(products);
      });
  }
});



// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log('App is listening on port ' + port);