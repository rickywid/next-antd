import nextConnect from "next-connect";
import db from '../../../middlewares/database';
import jwt from 'jsonwebtoken';

const handler = nextConnect();

const Authenticate = (req, res, next) => {

  jwt.verify(req.cookies.auth, 'somesecretstring', async function(err, decoded) {
    if (!err && decoded) {
      return next();  
    }

    res.status(401).json({ message: 'Sorry you are not authenticated' });
  });
}

handler
  .use(Authenticate)
  .get((req, res, next) => {   
      db.query(`SELECT * FROM users`, (err, result) => {
          res.json({users: [{name: 'john'}]})
      })
  })

 
export default handler;
