const app = require('express')()
const bodyParser = require('body-parser')
const logger = require('morgan')

const port = process.env.PORT || 3030

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('*', (req, res) => {
  res.send('Local revenue collection. The digital way. <kgasta@gmail.com>')
})

app.post('*', (req, res) => {
  let {sessionId, serviceCode, phoneNumber, text} = req.body
  if (text == '') {
    // This is the first request. Note how we start the response with CON
    let response = `CON What would you want to do
    1. Pay Tax
    2. Mini statement`
    res.send(response)
  } else if (text == '1') {
    // Business logic for first level response
    let response = `CON Choose the period
    1. Daily
    2. Weekly 
    3. Monthly`
    res.send(response)
  } else if(text == '1*3'){
    let response = `CON Choose your tax monthly tax ammount
    1. 200,000
    2. 500,000
    3. 100,000`
    res.send(response)
  } else if(text == '1*2'){
    let response = `CON Choose your tax weekly tax ammount
    1. 5,000
    2. 15,000
    3. 20,000`
    res.send(response)
  } else if(text == '1*1'){
    let response = `CON Choose your tax monthly tax ammount
    1. 500
    2. 1,000
    3. 1,500`
    res.send(response)
  }
  //  else if (text == '2') {
    // Business logic for first level response
    // let response = `END Your phone number is ${phoneNumber}`
    // res.send(response)
  // } else if (text == '1*1') {
    // Business logic for first level response
    // let accountNumber = 'ACC1001'
    // This is a terminal request. Note how we start the response with END
    // let response = `END Your account number is ${accountNumber}`
    // res.send(response)
  // } 
  else if (text == '2') {
    // This is a second level response where the user selected 1 in the first instance
    let balance = 'NGN 10,000'
    // This is a terminal request. Note how we start the response with END
    let response = `END Your balance is ${balance}`
    res.send(response)
  } else {
    res.status(400).send('Bad request!')
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})