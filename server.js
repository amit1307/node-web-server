const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3001;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  fs.appendFile('server.log', `\n${now}: ${req.method} ${req.url}`, (err) => {
    if (err) {
      console.log('Unable to log the request');
    }
  });
  console.log(`${now}: ${req.method} ${req.url}`);
  next();
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

app.get('/', (req, res) => {
    res.render('home.hbs', {
      title:'HBS Home Page',
      year: new Date().getFullYear(),
      welcomeMessage:'Welcome to About Home'
    })
});

app.get('/about', (req, res) => {
  res.send('<h1>About Page</h1>');
});

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

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
