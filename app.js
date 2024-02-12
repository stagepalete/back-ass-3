var express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
var path = require('path');
var bodyParser = require('body-parser')
var Routes = require('./routes/routes');
var apiRoutes = require('./routes/api');
var adminRoutes = require('./routes/admin');
var connectToDatabase = require('./config/db');

var app = express();

const port = 3002
const uri = 'mongodb+srv://admin:GBxMIni3B2r13jcq@louisvuitton.h0htcgr.mongodb.net/'; // url of mongodb
const store = new MongoDBStore({
    uri: uri,
    collection: 'sessions'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'EJFKNLMwekflmq,1-3298jf2940[ncwmepk-kpmq23kfmm',
    resave: false,
    saveUninitialized: true,
    store: store
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', Routes);
app.use('/api/', apiRoutes);
app.use('/admin/', adminRoutes);


connectToDatabase(uri)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error(err);
    });

app.listen(port, () => {
    console.log(`Server is running on  http://localhost:${port}`);
});
