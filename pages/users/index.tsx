import React from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import Layout from '../../components/layout';

const Users:NextPage = ({people}) => {
return <Layout><div>users page {JSON.stringify(people)}</div></Layout>
}

Users.getInitialProps = async (ctx) => {
    const cookie = ctx.req?.headers.cookie;

    const response = await fetch('http://localhost:3000/api/users', {
        headers: { cookie }
    });

    // client side rendering
    if(response.status === 401 && !ctx.req) {
        Router.replace('/login');
        return;
    }

    // server side rendering
    if(response.status === 401 && ctx.req) {
        ctx.res.writeHead(302, {
            Location: 'http://localhost:3000/login'
        });

        ctx.res.end();
        return;
    }

    const json = await response.text();
    return { people: json };
}

export default Users;