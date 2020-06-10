import {NextApiRequest, NextApiResponse} from 'next';
import nextConnect from "next-connect";
import passport from 'passport';
import middleware from '../../../../../middlewares/middleware'
import '../../../../../lib/passport';
import generateToken from '../../../../../lib/generateToken';
import cookie from 'cookie';
import {cookieHeader} from '../../../../../lib/cookieConf';
const handler = nextConnect();

handler.use(middleware);

handler
    .use(passport.authenticate('github'),
    function(req, res) {
        res.setHeader('Set-Cookie', [ 
            cookie.serialize('token', generateToken(req.user.username), cookieHeader),
            cookie.serialize('userID', req.user.id, cookieHeader) ,
            cookie.serialize('login', req.user.username, cookieHeader) 
          ]);
        res.writeHead(302, {
            Location: process.env.DOMAIN
        });
        res.end();
    })
  .get((
    req: NextApiRequest, 
    res: NextApiResponse) => {     
  });
 
export default handler;
