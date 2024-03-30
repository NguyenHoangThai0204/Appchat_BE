const UserService = require('../services/UserServices');
const JwtService = require('../services/JwtService');

const createUser = async (req, res) => {
    try {
        // console.log(req.body);
        const { name, username, phone, password, confirmPassword } = req.body;
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isCheckEmail = reg.test(username);
        if (!name || !username || !phone || !password || !confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required',
            });
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email',
            });
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is equal confirmPassword',
            });
        }
        // console.log('check', isCheckEmail);
        const response = await UserService.createUser(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        // console.log(req.body);
        const { username, password } = req.body;
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isCheckEmail = reg.test(username);
        if (!username || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required',
            });
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email',
            });
        }

        const response = await UserService.loginUser(req.body);
        const { refreshToken, ...newReponse } = response;
        // console.log('response', response);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            samesite: 'strict',
        });
        return res.status(200).json(newReponse);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        // console.log('check', isCheckEmail);
        const userId = req.params.id;
        const data = req.body;
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required',
            });
        }

        console.log('userId', userId);
        const response = await UserService.updateUser(userId, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        // console.log('check', isCheckEmail);
        const userId = req.params.id;
        // const token = req.headers;
        // console.log('token', token);
        // console.log('userId', userId);

        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required',
            });
        }

        // console.log('userId', userId);
        const response = await UserService.deleteUser(userId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required',
            });
        }

        const response = await UserService.getDetailsUser(userId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const refreshToken = async (req, res) => {
    // console.log('req.cookie', req.cookies);
    try {
        const token = req.cookies.refresh_Token;
        if (!token) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required',
            });
        }

        const response = await JwtService.refreshTokenJwtService(token);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const logoutUser = async (req, res) => {
    // console.log('req.cookie', req.cookies);
    try {
        res.clearCookie('refreshToken');

        return res.status(200).json({
            status: 'OK',
            message: 'LOGOUT SUCCESSFULLY',
        });
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken,
    logoutUser,
};
