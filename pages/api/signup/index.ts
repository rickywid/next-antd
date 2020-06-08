import nextConnect from "next-connect";
import db from '../../../middlewares/database';
import formidable from "formidable";
import bcrypt from "bcrypt-nodejs";
import generateToken from '../../../lib/generateToken';
import cookie from 'cookie';
import {cookieHeader} from '../../../lib/cookieConf';

const handler = nextConnect();
 
export const config = {
  api: {
    bodyParser: false,
  },
};

interface IFields {
  username: string;
  email: string;
  password: string;
}

handler
  .post((req, res) => {   
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
      const { username, email, password }: IFields = fields as any as IFields;;

      if(err) {
        console.log(err);
        throw err;
      }

      // check if username/email exists
      // create new user
      // generate salt
      // hash(encrypt) our password using the salt
      // execute sql query 


      db.query(`
      SELECT * 
      FROM users
      WHERE username = $1
      OR email = $2
      `, [username, email], (err, result) => {
        if (err) {
          return console.log(err)
        }

        if (result.rows.length > 0) {
          res.send({isAuthenticated: false});
        }

        bcrypt.genSalt(10, (err, salt) => {
          
          bcrypt.hash(password, salt, null, async (err, hash) => {
            if(err) console.log(err);

            db.query(`
              INSERT INTO users (username, email, password)
              VALUES ($1, $2, $3)
              RETURNING id
            `, [username, email, hash], (err, result) => {
              
              if(err) console.log(err);

              const token = generateToken(username.toString());
              const userID = result.rows[0].id;

              res.setHeader('Set-Cookie', [ 
                cookie.serialize('token', token, cookieHeader), 
                cookie.serialize('userID', userID, cookieHeader) ,
                cookie.serialize('login', username, cookieHeader) 
              ]);

              res.send({isAuthenticated: true});
            })
          });          
        })        
      })
    })
  })

 
export default handler;
