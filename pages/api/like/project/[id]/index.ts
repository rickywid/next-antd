import {NextApiRequest, NextApiResponse} from 'next';
import nextConnect from "next-connect";
import db from '../../../../../middlewares/database';
import formidable from "formidable";
import { unlink } from 'fs';
const handler = nextConnect();
 
export const config = {
  api: {
    bodyParser: false,
  },
};

handler
    .get((
        req: NextApiRequest, 
        res: NextApiResponse) => {
        const form = new formidable.IncomingForm();
        
        form.parse(req, async (err, fields, files) => { 
            
            if(err) {
                console.log('err');
            throw err;
            }
     
            const getLikes = {
                text: 
                `
                    SELECT
                        (SELECT array_agg(user_id) AS users 
                        FROM likes 
                        WHERE project_id = $1),
                        COUNT(*)
                    FROM likes
                    WHERE project_id = $1;
                `,
                values: [req.query.id]
            }

            const likes = await db.query(getLikes);

            res.json({
                status: 200,
                data: likes.rows[0]
            });
        });
    })
  .post((
    req: NextApiRequest, 
    res: NextApiResponse) => {
      const form = new formidable.IncomingForm();
      form.parse(req, async (err, fields, files) => { 
          console.log(fields)
          
          if(err) {
            console.log('err');
          throw err;
          }
          
          const like = {
          text: `
          INSERT INTO likes (user_id, project_id)
          VALUES ($1, $2);
          `,
          values: [fields.user_id, fields.project_id]
      };   

      const getLikes = {
          text: 
          `
            SELECT
                (SELECT array_agg(user_id) AS users 
                FROM likes 
                WHERE project_id = $1),
                COUNT(*)
            FROM likes
            WHERE project_id = $1;
          `,
          values: [fields.project_id]
      }

      await db.query(like);
      const likes = await db.query(getLikes);

      res.json({
          status: 200,
          data: likes.rows[0]
        });
    });
  })
  .delete((
    req: NextApiRequest, 
    res: NextApiResponse) => {
      
      const form = new formidable.IncomingForm();
      form.parse(req, async (err, fields, files) => { 
          
          if(err) {
            console.log('err');
          throw err;
          } 

      const unLike = {
          text: 
          `
            DELETE FROM likes
            WHERE project_id = $1
            AND user_id = $2;
          `,
          values: [fields.project_id, fields.user_id]
      }

      const getLikes = {
        text: 
        `
          SELECT
              (SELECT array_agg(user_id) AS users 
              FROM likes 
              WHERE project_id = $1),
              COUNT(*)
          FROM likes
          WHERE project_id = $1;
        `,
        values: [fields.project_id]
    }

      await db.query(unLike);
      const likes = await db.query(getLikes);

      // prevent returning NULL value - return an empty array if no users has liked the project
      likes.rows[0]['users'] = likes['users'] || [];

      res.json({
          status: 200,
          data: likes.rows[0]
        });
    });
  })
export default handler;
