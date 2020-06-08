import {NextApiRequest, NextApiResponse} from 'next';
import nextConnect, {NextHandler} from "next-connect";
import cookie from 'cookie';
import {cookieHeaderSignOut} from '../../../lib/cookieConf';

const handler = nextConnect();

interface IFields {
  username: string;
  password: string;
}
 
export const config = {
  api: {
    bodyParser: false,
  },
};

handler
  .post((
    req: NextApiRequest, 
    res: NextApiResponse, 
    next:NextHandler) => {           
        res.setHeader('Set-Cookie', 
          [ 
            cookie.serialize('token', '', cookieHeaderSignOut), 
            cookie.serialize('userID', '', cookieHeaderSignOut),
            cookie.serialize('login', '', cookieHeaderSignOut) 
          ]
        );

    res.send({status: 200});
  })

 
export default handler;
 