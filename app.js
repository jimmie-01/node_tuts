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

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) =>{
	const blog = new Blog({
		title: 'new blog',
		snippet: 'abouut my new blog',
		body: 'more about my new blog'
	});

	blog.save()
	.then((result) => {
		res.send(result);
	}).catch((err) =>{
		console.log(err);
	});
});

// routes
app.get('/', (req, res) => {
	const blogs = [
		{title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
		{title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
		{title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
	  ];
	res.render('index', { title: 'Home', blogs });

});

app.get('/about', (req,res) => {

	res.render('about', { title: 'About' });

})

app.get('/blogs/create', (req, res) => {

	res.render('create', { title: 'Create New Blog'});

})

app.use((req, res) => {

	res.status(404).render('404', { title: '404'});

})
