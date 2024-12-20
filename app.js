const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongoDB
const dbURI = 'mongodb+srv://jimmie:lastname@nodetuts.evas5.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodetuts'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
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
app.use('/blogs', blogRoutes);


app.use((req, res) => {
	res.status(404).render('404', { title: '404'});
});