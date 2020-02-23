const User = require('./../models/User.ts');
const passwordEncryptor = require('./../helpers/passwordEncryption.ts');

async function login(user) {
    try {
        let userExists = await User.findOne({username: user.username});
        if(!userExists) return {
            error: true,
            field: 'Username',
            message: 'Could not find user with this username.',
        }

        let passwordMatch = await passwordEncryptor.validatePassword(user.password, userExists.password);
        if(passwordMatch) {
            return {
                error: false,
                results: userExists,
            }
        } else {
            return {
                error: true,
                field: 'Password',
                message: 'Incorrect password',
            }
        }

    } catch(error) {
        console.error('Something went wrong ' + error);
        return {
            error: true,
            message: error,
        }
    }
}

async function register(user) {
    try {
        let userExists = await User.findOne({username: user.username});
        if(userExists) {
            return {
                error: true,
                field: 'Username',
                message: 'Username already exists',
            };
        } else {
            let hashedPassword = await passwordEncryptor.hashPassword(user.password);
            user.password = hashedPassword;

            let newUser = await User.create(user);
            return {
                error: false,
                results: newUser
            };
        }
    } catch (error) {
        return {
            error: true,
            message: error
        }
    }
}

module.exports = {
    register,
    login
};