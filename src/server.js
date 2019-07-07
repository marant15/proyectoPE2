const express = require('express');

//initialization
const app = express();

//settings
app.set('port', process.env.PORT || 4000);
//Global variables

//other
app.use(express.json());

//Routes
app.use(require('./routes/routes.js'));
app.use('/courses', require('./routes/courses.js'));
app.use('/aut',require('./routes/aut.js'));

//Starting
app.listen(app.get('port'), ()=>{
    console.log('Server on port ', app.get('port'));
})