"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt')
const cookieSession = require('cookie-session')
const NodeGeocoder = require('node-geocoder');
const saltRounds = 10;


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




module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("grocers")
      .then((results) => {
        res.json(results);
    });
  });
// routes for registration need to get lat/log from address input, to do
  router.post("/register", (req, res) => {

    const grocername = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const address = req.body.address;
    
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    knex.select('name', 'id').from('grocers').then((grocers) => {
      for (let i = 0; i < grocers.length; i ++) {
        if (email.length === 0 || password.length === 0) {
          res.status(400).send("Email or password is empty");
        } else if 
        (grocers[i].name === grocername ||grocers[i].email === email ) {
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
          name: grocername, 
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

  router.post("/login", (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    let flag = false
    let pswrdFromDatabase = ''
    let userIndex = 0

    knex.select('email', 'id', 'password').from('grocers').then((grocers) => {
      for (let i = 0; i < grocers.length; i ++) {
        if (grocers[i].email === email) {
          flag = true
          pswrdFromDatabase = grocers[i].password
          userIndex = i
        }
      }
      if (flag === true && (bcrypt.compareSync(password, pswrdFromDatabase))) {
      knex('users')
        .returning('id')
        .then((ids) => {
          req.session.grocer_id = ids[userIndex].id;
          res.redirect("/")
      })
      }
    })
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/")
  });

  return router;
}