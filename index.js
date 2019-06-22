const express = require('express');
const path = require('path');

const app = express();
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req, res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log('Sent list of items');
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  if (req.secure) {
    // request was via https, so do no special handling
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
} else {
    // request was via http, so redirect to https
    res.redirect('https://' + req.headers.host + req.url);
}
  
  
});

// App routes

app.post("/register", (req, res) => {

});

app.post("/login_grocer", (req, res) => {

});

app.post("/login_charity", (req, res) => {

});






const port = process.env.PORT || 8080;
app.listen(port);

console.log('App is listening on port ' + port);