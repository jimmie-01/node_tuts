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
app.use(express.urlencoded({ extended: true }));


// routes
app.get('/', (req, res) => {
	res.redirect('/blogs');
});

app.get('/about', (req, res) => {
	res.render('about', { title: 'About' });
});

// blog route
app.get('/blogs/create', (req, res) => {
	res.render('create', { title: 'Create a new blog' });
});

app.get('/blogs', (req, res) => {
	Blog.find().sort({ createdAt: -1})
		.then(result => {
			res.render('index', { title: 'All Blogs', blogs: result });
		}).catch(err => {
			console.log(err);
		});
});

app.post('/blogs', (req, res) => {
	const blog = new Blog(req.body);
	
	blog.save()
		.then(result => {
			res.redirect('/blogs');
		}).catch(err => {
			console.log(err);
		})
})

app.get('/blogs/:id', (req, res) => {
	const id = req.params.id;
	Blog.findById(id)
	  .then(result => {
		res.render('details', { blog: result, title: 'Blog Details' });
	  })
	  .catch(err => {
		console.log(err);
	  });
  });

app.use((req, res) => {
	res.status(404).render('404', { title: '404'});
});