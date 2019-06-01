const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const chalk = require('chalk')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

//Setup routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'My Weather App',
        name: 'Alfred Jayaprakash'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Alfred Jayaprakash'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Alfred Jayaprakash',
        message: 'This is the help message that i want to display in the screen'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You need to provide an address"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }= {}) => {
        if (error) {
            console.log(error)
            return res.send({
                error
            })
        } else {
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    console.log(error)
                    return res.send({
                        error
                    })
                } else {
                    console.log("Forecast summary for %s:", chalk.blue.bold(location))
                    console.log(forecastData)
                    return res.send({
                        location,
                        forecast: forecastData.forecast,
                        summary: forecastData.summary
                    })
                }
            })
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Requested page not found'
    })
})

//Startup the server
app.listen(port, () => {
    console.log("server is up on port "+port)
})