const User = require('../models/User');
const bcrypt = require('bcrypt');
const { genneralAccessToken, genneralRefreshToken } = require('./JwtService');

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, username, phone, gender, dateOfBirth, password, confirmPassword } = newUser;

        try {
            const checkUser = await User.findOne({
                phone: phone,
            });
            if (checkUser !== null) {
                resolve({
                    status: 'ERR',
                    massage: 'User already exists',
                });
            }
            const hash = bcrypt.hashSync(password, 10);
            console.log('hash', hash);
            const createUser = await User.create({
                name,
                username,
                phone,
                gender,
                dateOfBirth,
                password: hash,
                confirmPassword,
            });
            if (createUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createUser,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { username, password } = userLogin;

        try {
            const checkUser = await User.findOne({
                username: username,
            });
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'User is not defined',
                });
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password);
            // console.log('comparePassword', comparePassword);

            if (!comparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'The password is incorrect',
                });
            }
            const accessToken = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            });
            const refreshToken = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            });
            // console.log('access_Token', access_Token);
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                accessToken,
                refreshToken,
                userLogin: checkUser,
            });
            // }
        } catch (e) {
            reject(e);
        }
    });
};

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({ _id: id });
            console.log('checkUser', checkUser);

            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    massage: 'User is not defined',
                });
            }
            
            const updateUser = await User.findByIdAndUpdate(id, data, { new: true });
            console.log('id update', id);
            console.log('data update', data);
            console.log('updateUserFindByIDAndUpdate', updateUser);
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updateUser,
            });
            console.log('updateUser', updateUser);
        } catch (e) {
            reject(e);
        }
    });
};

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({ _id: id });
            // console.log('checkUser', checkUser);

            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    massage: 'User is not defined',
                });
            }
            await User.findByIdAndDelete(id);
            // console.log('updateUser', updateUser);
            // console.log('access_Token', access_Token);
            resolve({
                status: 'OK',
                message: 'DELETE USER SUCCESS',
            });
            // }
        } catch (e) {
            reject(e);
        }
    });
};

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find();
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allUser,
            });
            // }
        } catch (e) {
            reject(e);
        }
    });
};

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({ _id: id });
            if (user === null) {
                resolve({
                    status: 'ERR',
                    massage: 'User is not defined',
                });
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: user,
            });
            // }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
};
