"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt')
const cookieSession = require('cookie-session')

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
    const salt = bcrypt.genSaltSync(5);
    const hashedPassword = bcrypt.hashSync(password, salt);

    knex.select('name', 'id').from('grocers').then((grocers) => {
      for (let i = 0; i < grocers.length; i ++) {
        if (grocers[i].name === grocername ||grocers[i].email === email ) {
          res.status(403).send('User already exists')
          return false
        }
      }
      knex('users')
        .returning('id')
        .insert([{
          name: grocername, 
          email: email,
          password: hashedPassword,
          address: address
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
    const pswrd = req.body.password;
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