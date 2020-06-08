import {NextApiRequest, NextApiResponse} from 'next';
import nextConnect from "next-connect";
import db from '../../../../middlewares/database';
const handler = nextConnect();

handler
  .get(async (
    req: NextApiRequest, 
    res: NextApiResponse) => {

        const id = req.query.id;

        const getProject = {
            text: `
            SELECT 
              projects.id,
              projects.name,
              projects.tagline,
              projects.description,
              projects.url,
              projects.collaboration,
              projects.images,
              projects.created_on,
              (SELECT username 
               FROM users 
               WHERE users.id = projects.user_id),
              (SELECT array_agg(technologies.name::TEXT)
               FROM projects_technologies
               INNER JOIN technologies
               ON technologies.id = projects_technologies.technology_id
               WHERE projects_technologies.project_id = projects.id) AS technologies
            FROM projects
            WHERE projects.id = $1;
          `,
            values: [id]
        };

        const getComments = {
            text: `
            SELECT 
              comments.id AS comment_id,
              comment,
              project_id, 
              comments.created_on,
              username,
              users.id AS user_id
            FROM comments
            JOIN users
            ON users.id = comments.user_id
            WHERE project_id = $1;
          `,
            values: [id]
        };
        

        const project = await db.query(getProject);
        const comments = await db.query(getComments);
       
        res.json({ 
            data: project.rows[0], 
            comments: comments.rows 
        });
  })
 
export default handler;
