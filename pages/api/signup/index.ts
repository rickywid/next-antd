import nextConnect from "next-connect";
import db from '../../../middlewares/database';
import formidable from "formidable";
import bcrypt from "bcrypt-nodejs";
import generateToken from '../../../lib/generateToken';

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
      WHERE name = $1
      OR email = $2
      `, [username, email], (err, result) => {
        if (err) {
          return console.log(err)
        }

        if (result.rows.length > 0) {
          res.status(400).send('Email or username is already taken');
        }

        bcrypt.genSalt(10, (err, salt) => {
          
          bcrypt.hash(password, salt, null, async (err, hash) => {
            if(err) console.log(err);

            db.query(`
              INSERT INTO users (name, email, password)
              VALUES ($1, $2, $3)
              RETURNING id
            `, [username, email, hash], (err, result) => {
              if(err) console.log(err);
              
              const userID = result.rows[0].id;
              
              res.json({
                id: userID,
                token: generateToken(username)
              })
            })
          });          
        })        
      })
    })
  })

 
export default handler;
