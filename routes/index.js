const express = require('express')
const router = express.Router()

const sqlite = require('sqlite3').verbose()

const db = new sqlite.Database(process.env.DATABASE_NAME || 'paramDb.sqlite', (err) => {
    if(err) {
        console.log('An error has occured')
    } else {
        console.log('Connected to SQLite database')
        db.run('CREATE TABLE IF NOT EXISTS params(key text, value text)')
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
    res.render('_param_field', { param: {}})
})

//Gets the param values from client and updates them
router.post('/saveParams', (req, res) => {
    let statusMessage = ''
    db.run('DELETE FROM params', (err) => {
        statusMessage=err
    })
    let statement = db.prepare('INSERT INTO params VALUES(?,?)')
    req.body.forEach((val) => {
        statement.run(val.key, val.value)
    })
    statement.finalize()
    if(statusMessage === '') {
        res.send('Database updated!')
    } else {
        res.send('Database update failed')
    }
})

//Retrives the URL to send the HTTP GET request to
router.get('/getRequestUrl', (req, res) => {
    //combining the URL of the request site with a CORS proxy
    res.send(process.env.CORS_BYPASS + process.env.REQUEST_SITE)
})

module.exports = router