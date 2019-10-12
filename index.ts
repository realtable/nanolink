import * as express from 'express'
const app = express()
const port = 3000

app.get('/create/:id', (req, res) => res.send(`create ${req.params.id}`))
app.get('/:id', (req, res) => res.send(`resolve ${req.params.id}`))
app.get('/', (_, res) => res.send('foo bar baz'))

app.listen(port, () => console.log(`nanolink server listening on port ${port}`))
