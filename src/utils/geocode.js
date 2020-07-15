const request = require('postman-request')

const geocode = (place, callback) => {
    const mapUrl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+place+'.json?access_token=pk.eyJ1IjoicmFqZWV2bGFrc2htaW5hcmFzaW1oYW4iLCJhIjoiY2tidWF5ZXB1MGk5ZjJ4bDY1ZmR2azd2aSJ9.6Z9ExiypNYj9H78E8dWbIA&limit=1'

request({url: mapUrl, json: true}, (error,{body}) => {
    

    if(error){
        callback('Unable to connect to geocode',undefined)
    } else if(body.features.length===0){
        callback('No mathcing result',undefined)
    } else{
        callback(undefined,{
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
        })
    }

})
}  
module.exports = geocode
