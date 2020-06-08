import {NextApiRequest, NextApiResponse} from 'next';
import nextConnect from "next-connect";
import db from '../../../middlewares/database';
import formidable from "formidable";

const handler = nextConnect();

export const config = {
    api: {
      bodyParser: false,
    },
  };

handler
  .post((
    req: NextApiRequest, 
    res: NextApiResponse) => {     
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => { 
            console.log('fields', fields);
            if(err) {
            console.log('err');
            throw err;
            }

            
            const getProject = {
            text: `
            INSERT INTO comments (user_id, project_id, comment)
            VALUES ($1, $2, $3);
            `,
            values: [fields.user_id, fields.project_id, fields.comment]
        };   

        await db.query(getProject);

        res.json({status: 200});
    });
  })
 
export default handler;
