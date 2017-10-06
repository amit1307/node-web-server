//Load the required modules
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//Heroku sets the port on environment variable so accessing it from env.
//For local run assigning the port as 3001
const port = process.env.PORT || 3001;

//Creates an Express application
var app = express();

//This line registers any files under partials directory with handlebars
//Any file registered here can be directly used anywhere in the hbs templates
hbs.registerPartials(__dirname + '/views/partials');

//Sets the view engine as handlebar
app.set('view engine', 'hbs');

//Serve static content from public directory
app.use(express.static(__dirname+'/public'));

//Mounting a middleware function that will be executed for every request.
app.use((req, res, next) => {
  var now = new Date().toString();
  fs.appendFile('server.log', `\n${now}: ${req.method} ${req.url}`, (err) => {
    if (err) {
      console.log('Unable to log the request');
    }
  });
  console.log(`${now}: ${req.method} ${req.url}`);
  next(); //This call is very important, without this call app will not proceed beyond MW
})

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });
// app.get('/', (req, res) => {
//   //res.send('Hello Express!');
//   res.send({
//     name:'Amit',
//     interests: [
//       'Cricket', 'Tennis'
//     ]
//   });
// });

//Defining a default route which will load the home hbs template.
app.get('/', (req, res) => {
    res.render('home.hbs', {
      title:'HBS Home Page',
      year: new Date().getFullYear(),
      welcomeMessage:'Welcome to About Home'
    })
});

//Defining an about route which will show a basic html page.
app.get('/about', (req, res) => {
  res.send('<h1>About Page</h1>');
});

//Defining a error route which will return JSON response
app.get('/bad', (req, res) => {
    res.send({
      errorMessage:'Error occurred'
    });
});

app.get('/hbsabout', (req, res) => {
  res.render('about.hbs', {
    title:'HBS Title Page',
    year: new Date().getFullYear()
  });
});

//Starting app
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
