import {NextApiRequest, NextApiResponse} from 'next';
import nextConnect, {NextHandler} from "next-connect";
import cookie from 'cookie';
import {cookieHeader} from '../../../lib/cookieConf';

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
            cookie.serialize('token', '', cookieHeader), 
            cookie.serialize('userID', '', cookieHeader) 
          ]
        );

    res.send({isAuthenticated: false});
  })

 
export default handler;
 