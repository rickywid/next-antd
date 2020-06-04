export default {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: true,
    path: '/'
}