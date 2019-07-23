const express = require('express');
var cors = require('cors');
var bodyParser = require( 'body-parser' );

//initialization
const app = express();

//settings
app.use( bodyParser.json( { limit: '50MB' } ) );
app.set('port', process.env.PORT || 4000);
app.use(cors());
//Global variables

//other
app.use(express.json());

//Routes
app.use(require('./routes/routes.js'));
app.use('/courses', require('./routes/courses.js'));
app.use('/aut',require('./routes/aut.js'));
app.use('/admin',require('./routes/admin.js'))

//Starting
app.listen(app.get('port'), ()=>{
    console.log('Server on port ', app.get('port'));
})