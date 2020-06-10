import {NextApiRequest, NextApiResponse} from 'next';
import nextConnect from "next-connect";
import passport from 'passport';
import middleware from '../../../../../middlewares/middleware'
import '../../../../../lib/passport';
import cookie from 'cookie';
import {cookieHeader} from '../../../../../lib/cookieConf';
const handler = nextConnect();

handler.use(middleware);

handler
    .use(passport.authenticate('github'),
    function(req, res) {
        
        res.setHeader('Set-Cookie', [ 
            cookie.serialize('token', 'token', cookieHeader)
          ]);
        res.writeHead(302, {
            Location: 'http://localhost:3000/'
        });
        res.end();
    })
  .get((
    req: NextApiRequest, 
    res: NextApiResponse) => {     
  });
 
export default handler;
