import express from 'express'
import crypto from 'crypto'
import fs from 'fs'
import db from '../database.json'

const app = express()
const port = 3000

var short = () => crypto.randomBytes(4).toString('hex')

function reply(code: number, message: string, res: express.Response) {
  res.status(code)
  res.set('Content-Type', 'text/plain');
  res.send(message)
}

app.get('/create/*', (req: express.Request, res: express.Response) => {
  let newID = short()
  while (db[newID]) {
    newID = short()
  }
  
  db[newID] = req.params[0]
  fs.writeFileSync('database.json', JSON.stringify(db));
  
  let url = `${req.protocol}://${req.get('host')}/${newID}`
  reply(200, `200 Success: ${url}`, res)
})

app.get('/:id', (req: express.Request, res: express.Response) => {
  let result = db[req.params.id]
  if (result) {
    res.redirect(result)
  } else {
    reply(404, '404 File Not Found', res)
  }
})

app.get('/', (req: express.Request, res: express.Response) => {
  let url = `${req.protocol}://${req.get('host')}`
  let message = `*** nanolink ***\nQuery ${url}/create/myURL to create a new link for 'myURL'.\nIf you find a bug, please report it at https://github.com/realtable/nanolink/issues.`
  reply(200, message, res)
})


app.listen(port, () => console.log(`nanolink server listening on port ${port}`))
