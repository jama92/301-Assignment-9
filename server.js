var express = require('express')
var app = express()
var config = require('./config')
console.log(config)
var DB = config.DB
var PORT = config.PORT
var models = require('./models')
var parsedArticles = require('./data/ipsumArticles.json');

app.use(function(req, res, next){
 res.header("Access-Control-Allow-Origin", "*")
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
 res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
 next()
})

app.get('/articles', function(req, res) {
  console.log('Received request for articles')
  models.Article.findAll().then(function(articles){
    res.json(articles)
  })
})


models.sequelize.sync({force: true}).then(function(x) {
  parsedArticles.forEach(function(article) {
    models.Article.create({
      title: article.title,
      category: article.category,
      author: article.author,
      authorUrl: article.authorUrl,
      publishedOn: article.publishedOn,
      body: article.body
    })
  })
})


app.listen(PORT, function() {
  console.log('server started')
  console.log('listening on PORT: ' + PORT)
  console.log('DB URI STRING: ' + DB)
})
