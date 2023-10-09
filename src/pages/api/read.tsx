import { NextApiRequest, NextApiResponse } from 'next';
const db = require('../../lib/db');

export default function read(req: NextApiRequest, res: NextApiResponse) {
  db.query('SELECT * FROM tdcnext.todos', function (err: any, result: any) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
}
