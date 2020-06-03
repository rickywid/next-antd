import {NextApiRequest, NextApiResponse} from 'next';
import nextConnect, {NextHandler} from "next-connect";
import db from '../../../middlewares/database';
import jwt from 'jsonwebtoken';

const handler = nextConnect();

const Authenticate = (
  req: NextApiRequest, 
  res: NextApiResponse, 
  next: NextHandler) => {
    
  jwt.verify(req.cookies.token, process.env.JWT_SECRET!, async function(err, decoded) {
    if (!err && decoded) {
      return next();  
    }

    res.status(401).json({ message: 'Unauthorized' });
  });
}

handler
  .use(Authenticate)
  .get((req, res, next) => {   
      db.query(`SELECT * FROM users`, (err, result) => {
          res.json({users: result.rows})
      })
  })

 
export default handler;
   