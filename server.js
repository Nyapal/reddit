const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const port = 3000

app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressValidator());

require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./data/reddit-db');

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;