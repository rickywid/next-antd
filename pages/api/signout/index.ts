import {NextApiRequest, NextApiResponse} from 'next';
import nextConnect, {NextHandler} from "next-connect";
import cookie from 'cookie';
import CookieConfig from '../../../lib/cookieConf';

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
            cookie.serialize('token', '', CookieConfig), 
            cookie.serialize('userID', '', CookieConfig) 
          ]
        );

    res.send({isAuthenticated: false});
  })

 
export default handler;
 