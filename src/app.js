const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

console.log(__dirname)
console.log(__filename)

const app = express()
const indexDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

//Setup static path
app.use(express.static(indexDir))

app.get('',(req, res) =>{
    res.render('index',{
        title: 'Index',
        name: 'Rajeev'
    })
})

app.get('/about',(req, res) =>{
    res.render('about',{
        title: 'About',
        name: 'Rajeev'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        helpText: 'This is help text',
        title: 'Help',
        name: 'Rajeev'
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.location){
        return res.send({
            error: 'Location is mandatory'
        })
    }

    geocode(req.query.location,(error,data ={}) => {
        if(error){
            return res.send({
                error: 'Error during geocode'
            })
        }

        forecast(data.latitude, data.longitude , (error, forecastdata) => {
            if(error){
                return res.send({
                    error: 'Error during forecast'
                })
            }

            res.send({
                Location: data.location,
                Forecast: forecastdata,
                address: req.query.location
            })

        })

    })

})

app.get('/help/*',(req, res) =>{
    res.render('404', {
        title: '404 page',
        name: 'Rajeev',
        errorMessage: 'Help not found'
    })
})

app.get('*',(req, res) =>{
    res.render('404',{
        title: '404 Page',
        name: 'Rajeev',
        errorMessage: 'Page not found'
    })
})


app.listen(3000)
