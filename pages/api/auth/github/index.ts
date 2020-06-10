import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from "next-connect";
import passport from 'passport';
import middleware from '../../../../middlewares/middleware'
import '../../../../lib/passport';
const handler = nextConnect();

handler.use(middleware)

handler
    .use(passport.authenticate('github'))
    .get(async(
        req: NextApiRequest,
        res: NextApiResponse, next) => {
            console.log('blah')
    }
)

export default handler;
