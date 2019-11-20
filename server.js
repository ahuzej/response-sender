if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const cors = require('cors');
const expressApp = express()



expressApp.set('view engine', 'ejs')
expressApp.set('views', __dirname + '/views')
expressApp.use('/public', express.static('public'))  


const sqlite = require('sqlite3').verbose()

var bodyParser = require('body-parser');
expressApp.use(bodyParser.json());

const db = new sqlite.Database(process.env.DATABASE_NAME || 'paramDb.sqlite', (err) => {
    if(err) {
        console.log('An error has occured')
    } else {
        console.log('Connected to SQLite database')
    }
})


 

const indexRouter = require('./routes/index')

expressApp.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  
expressApp.use(indexRouter)

expressApp.use(cors());

expressApp.listen(process.env.PORT || 3000)