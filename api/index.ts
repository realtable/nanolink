import { NowRequest, NowResponse } from '@now/node'

export default function(req: NowRequest, res: NowResponse) {
  const { resolve, create } = req.query
  
  if (resolve) {
    res.send(`resolve ${resolve}`)
  } else if (create) {
    res.send(`create ${create}`)
  } else {
    res.send('foo bar baz')
  }
}
