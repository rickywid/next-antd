import { GetServerSidePropsContext } from 'next';

export default (ctx: GetServerSidePropsContext) => {
    const cookie = ctx.req.headers.cookie;
    let id = cookie?.split(';')[1].split('userID=')[1];
    let username = cookie?.split(';')[2].split('login=')[1];

    return {
        id,
        username
    }
}