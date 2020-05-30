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
  .get((req, res) => {
      db.query(`
      select 
      projects.name,
      projects.description,
      projects.tagline,
      projects.url,
      projects.images,
      projects.collaboration,
      (select count(*) from comments where comments.project_id = projects.id) as comment_count,
      (select array_agg(technologies.name::TEXT)
        from projects_technologies
        inner join technologies
        on technologies.id = projects_technologies.technology_id
        where projects_technologies.project_id = projects.id) as technologies,
      (select array_agg(tags.name::TEXT)
      from projects_tags
      inner join tags
      on tags.id = projects_tags.tag_id
      where projects_tags.project_id = projects.id) as tags
    from projects;
      `, (err, result) => {
	    if (err) {
	      return console.log(err)
	    }
	    res.json({data: result.rows} );
	  })
  })
  .post((req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if(err) {
        console.log(err);
        throw err;
      }

      const { name, description, tagline, url, technologies, tags, collaboration, screenshots, user_id } = fields;


      const tagsArr = tags.split(',').map(num => parseInt(num));
      const technologiesArr = technologies.split(',').map(num => parseInt(num));;
      const screenshotsArr = screenshots.split(',');

      db.query(`
          WITH
            t1 AS (INSERT INTO projects(name, description, tagline, url, collaboration, user_id, images) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7) returning id),
            t2 AS (INSERT INTO projects_technologies(project_id, technology_id) 
                    SELECT t1.id, unnest($8::integer[]) from t1) 

          INSERT INTO projects_tags(project_id, tag_id) select t1.id, unnest($9::integer[]) 
          FROM t1;`,[name, description, tagline, url, collaboration, user_id, screenshotsArr, technologiesArr, tagsArr], (err, result) => {
        if (err) {
          return console.log(err)
        }
        
        res.json({status: 200});
      })
    });
  })
  .put(async (req, res) => {
    res.end('async/await is also supported!');
  });
 
export default handler;
