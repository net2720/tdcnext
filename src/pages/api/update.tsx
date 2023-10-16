import { NextApiRequest, NextApiResponse } from 'next';
const db = require('../../lib/db');

export default function update(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    const { id, isFinished } = req.body;
    const query = `UPDATE tdcnext.todos SET isFinished = ${req.body.isFinished} WHERE (id = ${req.body.id})`;
    const values = [id, isFinished];
    db.query(query, values, (err: any, result: any) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'DB 오류' });
      } else {
        res
          .status(201)
          .json({ success: true, message: '데이터가 변경되었습니다.' });
      }
    });
  }
}
