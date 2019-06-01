console.log("Client-side Javascript is loaded")

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'From JavaScript'

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = ''
    messageTwo.textContent = ''

    if(!location) {
        return messageOne.textContent = 'Please provide a location'       
    }

    //Invoke the Weather API
    messageOne.textContent = 'Loading ...'
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then(({ error, location, forecast } = data) => {
            if (error) {
                messageOne.textContent = error
            } else {
                messageOne.textContent = location
                messageTwo.textContent = forecast
            }
        })
    })
})

