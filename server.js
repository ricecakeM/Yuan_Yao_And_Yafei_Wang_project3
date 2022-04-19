const express = require('express')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

app.engine('ejs', ejsMate)

mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

// for images in public folder
// app.use(methodOverride('_method'))
// app.use(express.static('public'))

app.get('/', async (req, res) => {
    // sort and newly created will show up at the top
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(8000)