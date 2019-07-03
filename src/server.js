const express = require('express');

//initialization
const app = express();

//settings
app.set('port', process.env.PORT || 4000);

//Global variables

//Routes

//Starting
app.listen(app.get('port'), ()=>{
    console.log('Server on port ', app.get('port'));
})