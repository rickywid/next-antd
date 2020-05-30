import nextConnect from "next-connect";
import db from '../../../middlewares/database';
import formidable from "formidable";
import bcrypt from "bcrypt-nodejs";
import jwt from "jsonwebtoken";
import cookie from 'cookie';

const handler = nextConnect();
 
export const config = {
  api: {
    bodyParser: false,
  },
};

const generateToken = () => {
  return jwt.sign({foo: 'bar'}, 'somesecretstring');
}

handler
  .post((req, res, next) => {   
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
      const { username, password } = fields;

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

           const token = generateToken();

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
