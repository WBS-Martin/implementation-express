const express = require('express')
const methodOverride = require('method-override')
const axios = require('axios')
const fs = require('fs')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.put('/', (req, res) => {
  res.sendFile(__dirname + '/testFile.html')
})

app.delete('/', (req, res) => {
  res.json({ good: 'yep' })
})

app.set('view engine', 'ejs')
app.get('/test-ejs', (req, res) => {
  res.render('pages/myEJS.ejs', {
    myTitle: 'First Title',
  })
})

app.get('/test-ejs2', (req, res) => {
  res.render('pages/myUsers.ejs', {
    users: ['Bob', 'John', 'Jane'],
  })
})

app.use(methodOverride('_method'))
app.put('/override', (req, res) => {
  console.log('banana')
  res.send('banana')
})

app.use(express.urlencoded({ extended: false }))

app.use(express.json())
app.post('/showPost', (req, res) => {
  console.log(req.body.firstName, req.body.lastName)
  res.send('POST request to the homepage')
})

app.get('/showGet', (req, res) => {
  console.log(req.query.firstName, req.query.lastName)
  res.send('GET request to the homepage')
})

app.get('/number/:id', (req, res) => {
  res.send(`The number is ${req.params.id}`)
  res.status(200).send(req.params.id)
})

app.get('/postlist', (req, res) => {
  axios.get('https://jsonplaceholder.typicode.com/posts/1').then((response) => {
    res.send(response.data)
  })
})

app.get('/postlist/json', (req, res) => {
  axios.get('https://jsonplaceholder.typicode.com/posts/1').then((response) => {
    fs.writeFile('test.json', JSON.stringify(response.data), (err) => {
      if (err) throw err
      console.log('alles gesaved')
      res.send('The file has been saved!')
    })
  })
})

// Exercise 12
// https://github.com/Unitech/pm2
// npm install pm2 -g
// pm2 start index.js
// pm2 list
// pm2 stop 0

// Exercise 13
// https://pm2.keymetrics.io/docs/usage/cluster-mode/
// pm2 start app.js -i max
// pm2 list
// pm2 delete 0

// Exercise 14
// https://pm2.keymetrics.io/docs/usage/watch-and-restart/
// pm2 start app.js --watch
// pm2 stop 0  ==> will not stop watching
// pm2 stop 0 --watch ==> will stop watching

// Exercise 15
// https://pm2.keymetrics.io/docs/usage/monitoring/
// pm2 logs 0
// pm2 logs 0 --lines 100
// pm2 monit

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
