
import nextConnect from "next-connect";
import db from '../../../middlewares/database';

const handler = nextConnect();
 
handler
  .get((req, res) => {
      db.query("SELECT * from tasks", (err, result) => {
	    if (err) {
	      return console.log(err)
	    }
	    
	    console.log(result)
	    // data = result;
	    res.json({name: result.rows[0].name} );
	  })
  })
  .post((req, res) => {
    res.json({ hello: 'world' });
  })
  .put(async (req, res) => {
    res.end('async/await is also supported!');
  });
 
export default handler;