if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const cors = require('cors');
const expressApp = express()



expressApp.set('view engine', 'ejs')
expressApp.set('views', __dirname + '/views')
expressApp.use('/public', express.static('public'))  


var bodyParser = require('body-parser');
expressApp.use(bodyParser.json());
 

const indexRouter = require('./routes/index')
  
expressApp.use(indexRouter)

expressApp.use(cors());

expressApp.listen(process.env.PORT || 3000)