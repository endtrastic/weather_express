const express = require('express')
const app = express()
const fetch = require('node-fetch')
const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const key  = 'c96c8ff678b4a66e9a03560cd6a4515d'
let city = 'Tartu'

app.get('/', function (req, res) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    .then(response => {
      return response.json()
    })
    .then((data) => {
        let description = data.weather[0].description
        let city = data.name
        let temp = Math.round(parseFloat(data.main.temp) - 273.15)
        res.render('index', {
            description: description,
            city: city,
            temp: temp
        })
    })
})

app.post('/', function (req, res) {
    let city = req.body.cityname
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    .then(response => {
      return response.json()
    })
    .then((data) => {
      let description = data.weather[0].description
      let city = data.name
      let temp = Math.round(parseFloat(data.main.temp) - 273.15)
      res.render('index', {
        description: description,
        city: city,
        temp: temp
          })
      })
  })

app.listen(8080)