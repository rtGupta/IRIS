import jwt from 'jsonwebtoken';

/**
 * Function to check if the user is Authorized
 * @param {*} response 
 */
export const setUnauthorizedErrorResponse = (response) => {
    response.status(401);
    response.json({
        message: "Unauthorized user"
    });
}

/**
 * Function to check if the received token is valid for access, if not user will be asked to login again
 * @param {*} request 
 * @returns 
 */
export const isAuth = (request) => {
    const authorization = request.headers['authorization'];
    if (!authorization) {
        console.log("You need to login");
    }

    const token = authorization.split(' ')[1];
    
    return jwt.verify(token, "e67f01c4e0f093db97550b5bcaea35af833512315b1876f652cfdb579118bb4ab241872fbcf6e4ead155b4ee7dc1aa62bb7971d00ce66ebe2c8215493e8b57fb", (err, userId) => {
        if (err) {
            return null;
        } else {
            return userId;
        }

    });
}

// export default {isAuth, setUnauthorizedErrorResponse};

// module.exports = {
//     isAuth,
// }