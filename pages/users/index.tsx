import React, { ReactNode } from 'react';
import { NextPage, NextPageContext } from 'next';
import Router from 'next/router';
import Layout from '../../components/layout';
import { ApiService } from '../../lib/apiService';

interface IUsers {
    children?: ReactNode;
    projects?: [];
}

const Users:NextPage = ({projects}:IUsers) => {
return <Layout><div>users page {JSON.stringify(projects)}</div></Layout>
}

Users.getInitialProps = async (ctx: NextPageContext) => {
    
    const cookie = ctx.req?.headers.cookie;

    const api = new ApiService(cookie as string);
    const response = await api.getUsers();

    // client side rendering
    if(response.status === 401 && !ctx.req) {
        Router.replace('/login');
        return;
    }

    // server side rendering 
    if(response.status === 401 && ctx.req) {
        ctx.res!.writeHead(302, {
            Location: 'http://localhost:3000/login'
        });

        ctx.res!.end();
        return;
    }

    const projects = await response.json();
    return { projects: projects };
} 

export default Users;