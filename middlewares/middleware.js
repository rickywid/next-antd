import nextConnect from 'next-connect';
import cors from 'cors';
import passport from 'passport';
const middleware = nextConnect();

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

// add middleware
middleware.use(cors(corsOptions));
middleware.use(passport.initialize());
middleware.use(passport.session());



export default middleware;