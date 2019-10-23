import * as express from 'express'
import * as crypto from 'crypto'
import * as fs from 'fs'
import db = require('./database.json')

const app = express()
const port = 3000

var short = () => crypto.randomBytes(4).toString('hex')

function reply(code: number, error: string, res: express.Response) {
  res.status(code)
  res.set('Content-Type', 'text/plain');
  res.send(error)
}

app.get('/create/*', (req, res) => {
  let newID = short()
  while (db[newID]) {
    newID = short()
  }
  
  db[newID] = req.params[0]
  fs.writeFileSync('database.json', JSON.stringify(db));
  
  let url = `${req.protocol}://${req.get('host')}/${newID}`
  reply(200, `200 Success: ${url}`, res)
})

app.get('/:id', (req, res) => {
  let result = db[req.params.id]
  if (result) {
    res.redirect(result)
  } else {
    reply(404, '404 File Not Found', res)
  }
})

app.get('/', (req, res) => {
  let url = `${req.protocol}://${req.get('host')}`
  let message = `*** nanolink ***\nQuery ${url}/create/myURL to create a new link.\nIf you find a bug, please report it at https://github.com/realtable/nanolink/issues.`
  reply(200, message, res)
})


app.listen(port, () => console.log(`nanolink server listening on port ${port}`))
