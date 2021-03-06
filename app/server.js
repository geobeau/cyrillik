var express = require('express')
var app = express()

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use('/static', express.static(__dirname + '/static'));

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/createData', function (req, res) {
  res.render('createdata');
});


app.listen(80, function () {
  console.log('Listening on port 80!')
})
