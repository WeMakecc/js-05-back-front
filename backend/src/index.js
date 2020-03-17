import express from 'express'
import cors from 'cors'
import got from 'got'

require('dotenv').config()

const port = 3000
const app = express()

// Enable All CORS Requests
// DO NOT USE in production
app.use(cors())
app.options('*', cors())

// curl 127.0.0.1:3000
app.get('/', function(req, res) {
  console.log('get /')
  res.send('Hello')
})

app.get('/data/', (req, res) => {
  const url = `https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json`

  console.log(`Asking for: \n ${url} \n\n`)
  got(url)
    .then(response => {
      const responseObject = JSON.parse(response.body)
      // console.log(responseObject)

      // ------------------------------------------------------- actual data
      const result = []
      for (let i = 0; i < responseObject.length; ++i) {
        const item = responseObject[i]
        result.push({
          regione: item.denominazione_regione,
          tamponi: item.tamponi,
          data: item.data.split(' ')[0],
        })
      }

      // ------------------------------------------------------- unique dates and regions
      const regioni = []
      const dates = []
      for (let i = 0; i < responseObject.length; ++i) {
        const item = responseObject[i]

        if (!regioni.includes(item.denominazione_regione)) {
          regioni.push(item.denominazione_regione)
        }

        const date = item.data.split(' ')[0]
        if (!dates.includes(date)) {
          dates.push(date)
        }
      }

      // ------------------------------------------------------- tampon min-max
      let min = Number.MAX_VALUE
      let max = Number.MIN_VALUE
      for (let i = 0; i < responseObject.length; ++i) {
        const item = responseObject[i]
        min = Math.min(min, item.tamponi)
        max = Math.max(max, item.tamponi)
      }

      res.json({
        regions: regioni,
        dates: dates,
        data: result,
        range: [min, max],
      })
    })
    .catch(error => {
      console.log(error)
      res.status(500)
    })
})

app.listen(port, () => {
  console.log(`The server is up and running at http://127.0.0.1:${port}`)
})
