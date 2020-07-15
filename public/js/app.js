console.log('Client side js')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')


weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    messageOne.textContent ='Loading Forecast'
    messageTwo.textContent = ''
    const location = search.value
    fetch('http://localhost:3000/weather?location='+location).then((response) => {
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.Location
                messageTwo.textContent = data.Forecast
            }
        })
    })

})