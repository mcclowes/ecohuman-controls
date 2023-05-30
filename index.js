import * as dotenv from 'dotenv'
dotenv.config({path: '.env'})

import express from 'express'

import heating from './api/heating'

const app = express()

const getAndSend = async (req, res, func) => {
  try {
    const data = await func(req.params)
    res.send(data)
  } catch(err) {
    console.log(err)
  }
}

app.get('/', (req, res) => { res.send(`Available paths:
/heating
`) })

app.get(`/heating${process.env.HASH}`, async (req, res) => await getAndSend(req, res, heating.setHeating))

app.listen(3000, () => console.log('LISTENING ON 3000'))