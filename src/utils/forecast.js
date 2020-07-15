const request = require('postman-request')

const forecast = (latitude,longitude,callback) => {

const url = 'http://api.weatherstack.com/current?access_key=2a8336fbe4850b081ef4ebc8d06bb053&query='+latitude+','+longitude+'&units=f'

request({url, json: true}, (error, {body}) => {

    if(error){
        callback('Unable to connect to location services', undefined)
    }else if (body.error){
        callback('Unable to find the location', undefined)
    }else{
        callback(undefined, 'The current temperature is '+body.current.temperature + ' degrees. But it feels like ' + body.current.feelslike +'. Humidity is '+body.current.humidity+'%.')
    }
})
}
module.exports = forecast