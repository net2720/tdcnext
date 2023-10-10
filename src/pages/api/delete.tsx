import { NextApiRequest, NextApiResponse } from 'next';
const db = require('../../lib/db');

export default function update(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  if (req.method === 'DELETE') {
    const { id } = req.body;
    const query = `DELETE FROM tdcnext.todos WHERE id = ${req.body.id}`;
    const values = [id];
    db.query(query, values, (err: any, result: any) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'DB 오류' });
      } else {
        res
          .status(201)
          .json({ success: true, message: '데이터가 삭제되었습니다.' });
      }
    });
  }
}
