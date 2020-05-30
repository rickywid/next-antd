import jwt from "jsonwebtoken";

const generateToken = (payload:string) => {
    return jwt.sign({user: payload}, process.env.JWT_SECRET!);
}

  export default generateToken;