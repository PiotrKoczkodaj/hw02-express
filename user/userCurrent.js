import  jwt  from "jsonwebtoken";

export const userCurrent = async (req) => {
    const tokenFromRequest = req.headers.authorization;
    const tokenWithoutBearer = tokenFromRequest.slice(7)
    const userFromToken = jwt.decode(tokenWithoutBearer);

    return {
        email: userFromToken.email,
        subscription: userFromToken.subscription
    }
}