import {NextApiRequest, NextApiResponse} from 'next';
import nextConnect, {NextHandler} from "next-connect";
import db from '../../../middlewares/database';
import formidable from "formidable";
import bcrypt from "bcrypt-nodejs";
import cookie from 'cookie';
import generateToken from '../../../lib/generateToken';

const handler = nextConnect();

interface IFields {
  username: string;
  password: string;
}
 
export const config = {
  api: {
    bodyParser: false,
  },
};

handler
  .post((
    req: NextApiRequest, 
    res: NextApiResponse, 
    next:NextHandler) => {   
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields) => {
      const { username, password }: IFields = fields as any as IFields;
      
      const token = generateToken(username.toString());

      if(err) {
        console.log(err);
        throw err;
      }

      db.query(`
        SELECT * FROM users
        WHERE username = $1;
      `, [username], (err, result) => {
        if (err) {
          return console.log(err)
        }

        if (result.rows.length === 0) {
          res.status(400).send('Username not found');
        }

        const user = result.rows[0];
      
        bcrypt.compare(password, user.password, function(err, isMatch) {
          if(err || !isMatch) {
            res.json({message: 'Username or password incorrect'});
            next();
           }
           
           res.setHeader('Set-Cookie', cookie.serialize('auth', token, {
             httpOnly: true,
             secure: process.env.NODE_ENV !== 'development',
             sameSite: 'strict',
             path: '/'
           }));
           
           res.json({message: 'ok'});
           next();
        });
        
      })
    })
  })

 
export default handler;
