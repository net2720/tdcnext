import { NextApiRequest, NextApiResponse } from 'next';
const db = require('../../lib/db');

export default function read(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  db.query('SELECT * FROM tdcnext.todos', function (err: any, result: any) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'DB 오류' });
    } else {
      res.json(result);
    }
  });
}
