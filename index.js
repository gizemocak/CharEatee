const express = require('express');
const path = require('path');
const enforce = require('express-sslify');
require('dotenv').config()

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
// app.use(enforce.HTTPS({ trustProtoHeader: true }));


// An api endpoint that returns a short list of items
app.get('/api/getList', (req, res) => {
  console.log('logging')
  const list = ["item1", "item2", "item3"];
  res.json(list);
  console.log('Sent list of items');
});

app.get('/api/getApiKey',(req, res) => {
  const key = process.env.GOOGLEMAPS_APIKEY
  console.log(process.env.GOOGLEMAPS_APIKEY)
  res.send({apiKey: key})
})

// Handles any requests that don't match the ones above

// App routes

app.post("api/register", (req, res) => {

});

app.post("api/login_grocer", (req, res) => {

});

app.post("api/login_charity", (req, res) => {

});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});






const port = process.env.PORT || 8080;
app.listen(port);

console.log('App is listening on port ' + port);