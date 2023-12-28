require('./models/db')
const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const bodyparser = require('body-parser')
const pegawaiController = require('./controllers/pegawaiController')

var app = express()
app.use(bodyparser.urlencoded({
    extended: true
}))

app.use(bodyparser.json())
//set base_url
app.set('views', path.join(__dirname, '/views/'))
//set enggine
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'layoututama', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs')

app.listen(3000, () => {
    console.log('express start pada port : 3000');
});
//pakai controller pegawai
app.use('/pegawai', pegawaiController)

module.exports = app;