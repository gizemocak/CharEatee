const express = require('express');
const ENV = process.env.ENV || "development"
const bcrypt = require('bcrypt')
const cookieSession = require('cookie-session')
const NodeGeocoder = require('node-geocoder');
const saltRounds = 10;
const path = require('path');
const enforce = require('express-sslify');
require('dotenv').config()
var bodyParser = require('body-parser')

const app = express();
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const knexLogger = require('knex-logger');

require('dotenv').config()
// Serve the static files from the React app
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(knexLogger(knex));
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"]
  })
);

var options = {
  provider: 'openstreetmap',
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: process.env.GOOGLEMAPS_APIKEY, // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};
console.log("api", process.env.GOOGLEMAPS_APIKEY)
var geocoder = NodeGeocoder(options);

// An api endpoint that returns a short list of items
app.get('/api/getList', (req, res) => {
  const list = ["item1", "item2", "item3"];
  res.json(list);
});

///////////GEt google api key////////////
app.get('/api/getApiKey', (req, res) => {
  const key = process.env.GOOGLEMAPS_APIKEY
  res.send({
    apiKey: key
  })
})

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
  // console.log("register reqbody", req.body)
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const address = req.body.address;
  const city = req.body.city;
  const province = req.body.province;
  const postalcode = req.body.postalcode;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  const type = req.body.type;

  if (email.length === 0 || password.length === 0) {
    res.status(400).send("Email or password is empty");
  }
  knex.select('*').from('users').where('email', email).first().then((user) => {
    // console.log('regisger user', user)
    if (user && (user.username || user.email)) {
      res.status(403).send('User already exists')
      return false
    }
    let latitude = ''
    let longitude = ''
    geocoder.geocode({
      address,
      city,
      zipcode: postalcode,
      state: 'ontario',
      country: 'Canada'
    }, function (err, geocoderResponse) {
      knex('users')
        .returning('id')
        .insert([{
          type: type,
          username: username,
          email: email,
          password: hashedPassword,
          address: address,
          city: city,
          province: province,
          postalcode: postalcode,
          latitude: geocoderResponse.length > 0 && geocoderResponse[0].latitude,
          longitude: geocoderResponse.length > 0 && geocoderResponse[0].longitude
        }])
        .then((ids) => {
          // console.log("ids", ids)
          let user_id = ids[0];
          req.session.user_id = user_id;
          res.json({
            userId: user_id,
            type: type,
            username: username,
            email: email,
            address: address,
            city: city,
            province: province,
            postalcode: postalcode,
          })
        })
    });
  })
});
///////////LOGIN ROUTES///////////////////
app.post("/api/login", (req, res) => {
  // console.log(req.body)
  const email = req.body.email;
  const password = req.body.password;

  knex.select('*').from('users').where('email', email).first().then((user) => {
    // console.log('user', user);

    if (user && bcrypt.compareSync(password, user.password)) {

      req.session.user_id = user.id;
      res.send({
        name: user.username,
        email: user.email,
        address: user.address,
        user_id: user.id,
        type: user.type,

      })
    } else {
      res.sendStatus(401)
    }
  })

});

//////////// Make a donation////////////////////
app.post("/api/products", (req, res) => {
  let rows = req.body
  // console.log('row', rows)
  let chunkSize = 1000;
  knex.batchInsert('products', rows, chunkSize)
    .then(product => {
      // console.log('product', product)
      res.status(200.).send('OK')
    })
});


/////////Get stores//////////
app.get("/api/stores", (req, res) => {
  //check if query string exists, search that query in the database and show the ones that have the key
  // console.log('req', req.cookies)
  knex.select("*")
    .from("users")
    .join("products", {
      "users.id": "products.user_id"
    })
    .then(users => {
      //console.log("users:",users)
      res.send(users)
    })
});

app.get("/api/v2/stores", (req, res) => {
  //check if query string exists, search that query in the database and show the ones that have the key
  // console.log('req', req.cookies)
  /*   knex.select("*")
      .from("users")
      .then(users => {

        const storesWithProducts = users.map(user => {
          knex.select("*")
          .from("users")
        })
        console.log('v2', users)
        //console.log("users:",users)
        res.send(users)
      }) */

  knex.raw("SELECT id, json_build_object('id', id, 'username', username, 'email', email, 'address', address,'type', type, 'imgurl',imgurl, 'latitude', latitude, 'longitude', longitude, 'city', city, 'province',province,'postalcode', postalcode,'products', (SELECT json_agg(json_build_object('id',products.id, 'name', products.name, 'imgurl', products.imgurl,  'quantity', products.quantity ,'unit', products.unit,  'expiry', products.expiry_date,  'userId', products.user_id, 'deleted_at', products.deleted_at)) FROM products where products.user_id=users.id)) from users").then(response => {
    res.send(response.rows.map(row => row.json_build_object))
  })
});

////////////Get A Donation/////////////////////
app.get("/api/products", (req, res) => {
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
        // console.log("searched products", products)
        res.json(products);
      });
  } else {
    knex
      .select("*")
      .from("products")
      .then(products => {
        // console.log("products", products);
        res.json(products);
      });
  }
});
////////////get orders/////////////////////
app.get("/api/orders/", (req, res) => {
  const {userId , type} = req.query
  /* var query = knex("orders")
    .select("*")

    if(type === "Charity")
    query.where('charity_id', userId) // <-- only if param exists
  else
    query.where('user_id', userId) // <-- for instance

  query.then(function(results) {
    console.log("query" ,results)
    //query success

    results.map(item => {
      return (
        item
      )
    })
    res.send();
  })
  .then(null, function(err) {
    //query fail
    res.status(500).send(err);
  }); */

  knex.raw(`SELECT orders.user_id, orders.charity_id, json_build_object('orderId', id, 'lineItems', 
    (SELECT json_agg(json_build_object('id',line_items.id, 'product', products.name))
    FROM line_items INNER JOIN products ON (line_items.product_id = products.id)
    where line_items.order_id=orders.id)) from orders 
    where ${type === "Charity" ? `orders.charity_id=${userId}` : `orders.user_id=${userId}`}`)
  .then(response => {
    console.log("query responseee", response)
   res.send({
    current_user_id: userId,
     orders:response.rows.map(row => {
     return {
      user_id: row.user_id,
      charity_id: row.charity_id,
      line_items: row.json_build_object
     }
   })})
  })
});


////////////place order/////////////////////
app.post("/api/order", (req, res) => {
  // console.log("api order", req.body)
  const {
    charityId,
    products,
    grocerId,
  } = req.body

  knex('orders')
    .insert({
      user_id: grocerId,
      charity_id: charityId,
      status: 'complete'
    })
    .returning('id')
    .then(ids => {
      // console.log('id', ids)
      const productsToInsert = products.map(product => {
        return {
          order_id: ids[0],
          product_id: product.id,
        }
      })

      knex('line_items').insert(productsToInsert).returning("*").then(line_items => {
        
          line_items.forEach(item => {
            console.log('line_itemsrr',item,'timre', knex.fn.now())
         //knex('products').where('id', item.product_id).update('deleted_at', 'deleted')
            knex.raw(`UPDATE products set deleted_at = current_date where products.id = ${item.product_id}`).then(response => {
              console.log('response')
            })
          })
          
          res.status(200).send(line_items)
        })
        .catch(error => {
          res.status(400).send(error);
        });
    })
});


// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log('App is listening on port ' + port);