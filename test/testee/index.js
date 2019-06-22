'use strict'
 
var bookshelf = require('./bookshelf')
var Article = require("./models/article")

var getInsertedArticle = (id, callback) =>{
    console.log("\nNow get the article from the db\n")
    Article.where('id', id).fetch().then(function(article) {
      callback(article)
    })
  }
 
var insertArticle = (callback) =>{
 // create a new entry in articles database
 new Article({
   title: "Sample title",
   body: "Sample body"
 }).save()
 .then(function(saved) {
   console.log('saved', saved)
   const insertedId = saved.attributes.id
 
   callback(insertedId)
 })
}
 
// insert the article, and when we are done, destroy connection and get the inserted article
// insertArticle(function(id){
//   bookshelf.knex.destroy()
//   console.log("inserted article with id: " + id)
// })
 
insertArticle(function(id) {
    getInsertedArticle(id, function(article) {
      bookshelf.knex.destroy()
      console.log(article)
    })
  })