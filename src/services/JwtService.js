const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const genneralAccessToken = (payload) => {
    // console.log('payload', payload);
    const accessToken = jwt.sign(
        {
            ...payload,
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: '30s' },
    );
    return accessToken;
};

const genneralRefreshToken = (payload) => {
    // console.log('payload', payload);
    const refreshToken = jwt.sign(
        {
            ...payload,
        },
        process.env.REFRESH_TOKEN,
        { expiresIn: '365h' },
    );
    return refreshToken;
};

const refreshTokenJwtService = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log('token', token);
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    resolve({
                        status: 'ERR',
                        message: 'The authenticaltion',
                    });
                }

                const { payload } = user;
                const access_token = await genneralAccessToken({
                    id: user.id,
                    isAdmin: user?.isAdmin,
                });
                // console.log('access_token', access_token);
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    access_token,
                });
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenJwtService,
};
