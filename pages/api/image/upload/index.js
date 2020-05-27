import cloudinary from 'cloudinary';
import nextConnect from "next-connect";
// import db from '../../../../middlewares/database';
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nextConnect();
cloudinary.config({ 
    cloud_name: 'dzeqj2xv1', 
    api_key: '941628444336851', 
    api_secret: 'HVkGg6mMHPHPWhyESCdYch6Gaqo' 
  });

handler
  .post((req, res) => {
    console.log('post')
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if(err) {
        console.log(err);
        throw err;
      }

      console.log('fields: ', fields)
      console.log('files: ', files)
    cloudinary.v2.uploader.upload(files.file.path, function(error, result) {
        if(error){
          console.log(error);
        }
        console.log(result);
        res.send(result)
      });
    });


  });
 
export default handler;