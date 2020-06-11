import { GetServerSidePropsContext } from 'next';
import c from 'cookie';

export default (ctx: GetServerSidePropsContext) => {
    const cookie = ctx.req.headers.cookie || "";
    const user = c.parse(cookie as string)
   
    let id = user.userID;
    let username = user.login;

    return {
        id,
        username
    }
}