var express=require('express')
var bodyParser=require('body-parser')
var Sequelize=require('sequelize')
var api_routes=require('./routes/api.js')

//Database config
sequelize=new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqLite3'
})

//Verify connection
sequelize.authenticate()
    .then(()=>console.log('connected to sqLite'))
    .catch(err=>console.log('error connecting', err))

//Initialize encounter model
let encounter=require('./model/encounters.js')(sequelize, Sequelize)

//App config
var app=express()
app.use(bodyParser.json())

app.use('/api', api_routes(encounter))

//Start server
var server=app.listen(process.env.PORT || 3000, function(){
    console.log('app running on port', server.address().port)
})