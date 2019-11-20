const express = require('express')
const router = express.Router()

const sqlite = require('sqlite3').verbose()

const db = new sqlite.Database(process.env.DATABASE_NAME || 'paramDb.sqlite', (err) => {
    if(err) {
        console.log('An error has occured')
    } else {
        console.log('Connected to SQLite database')
    }
})
router.get('/', (req, res) => {
    
    db.all('SELECT * FROM params', (err, row) => {
        let parameters = []
        parameters = row
        res.render('index', {
            parameters: parameters
        })
    }) 

})

//Renders input param form on the client
router.get('/newParam', (req, res) => {
    db.all('SELECT * FROM params', (err, row) => {
        let parameters = row
        res.render('_param_field', {
            param: parameters
        })
    }) 
})

//Gets the param values from client and updates them
router.post('/saveParams', (req, res) => {
    db.run('DELETE FROM params')
    let statement = db.prepare('INSERT INTO params VALUES(?,?)')
    req.body.forEach((val) => {
        statement.run(val.key, val.value)
    })
    statement.finalize()
})

//Retrives the URL to send the HTTP GET request to
router.get('/getRequestUrl', (req, res) => {
    res.send('https://postman-echo.com/get?')
})

module.exports = router