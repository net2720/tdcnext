import { NextApiRequest, NextApiResponse } from 'next';
const db = require('../../lib/db');

export default function create(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  if (req.method === 'POST') {
    const { date, content } = req.body;
    const query = `INSERT INTO tdcnext.todos (date, content, isFinished) VALUES (${req.body.date}, '${req.body.content}', 0)`;
    const values = [date, content];
    db.query(query, values, (err: any, result: any) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'DB 오류' });
      } else {
        res
          .status(201)
          .json({ success: true, message: '데이터가 생성되었습니다.' });
      }
    });
  }
}
