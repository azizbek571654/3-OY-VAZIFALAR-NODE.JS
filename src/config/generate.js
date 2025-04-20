import jwt from "jsonwebtoken"

export const generatetoken = (paylod, jwtSecret, option) => {
       return jwt.sign(paylod, jwtSecret, option)
    
}