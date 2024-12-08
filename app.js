const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// express app
const app = express();

// connect to mongoDB
const dbURI = 'mongodb+srv://jimmie:lastname@nodetuts.evas5.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodetuts'
mongoose.connect(dbURI)
.then((result) => app.listen(3000, 'localhost'))
.catch((err) => console.log(err));


app.set('view engine', 'ejs');
app.set('views', 'ejs_views');

// middleware and static files
app.use(express.static('public'));


// routes
app.get('/', (req, res) => {
	
	res.redirect('/blogs');

});

app.get('/about', (req,res) => {

	res.render('about', { title: 'About' });

})

//blog routes
app.get('/blogs', (req, res) => {
	// sort blogs in descending order
	Blog.find().sort({ createdAt: -1 })
	.then((result) => {
		res.render('index', { title: 'All-Blogs', blogs: result });
	}).catch((err) => {
		console.log(err);
	})
})

app.get('/blogs/create', (req, res) => {

	res.render('create', { title: 'Create New Blog'});

})

app.use((req, res) => {

	res.status(404).render('404', { title: '404'});

})
