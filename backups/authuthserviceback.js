const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const { Op } = require('sequelize');
const db = require('_helpers/db');


module.exports = {
    authenticate
};


async function authenticate({ username, password}) {
    const account = await db.User.scope('withHash').findOne({
        where: { username },
       attributes: ['username', 'passwordHash', 'role'] });

    if (!account || !(await bcrypt.compare(password, account.passwordHash))) {
        throw 'username or password is incorrect';
    }

    // if (account.isDeleted) {
    //     throw 'Account is deleted';
    // }

    // authentication successful so generate jwt and refresh tokens
    const jwtToken = generateJwtToken(account);
    // const refreshToken = generateRefreshToken(account, ipAddress);

    // save refresh token
    // await refreshToken.save();

    // return basic details and tokens
    return {
        // ...basicDetails(account),
        jwtToken,
        // refreshToken: refreshToken.token
    };
}

function generateJwtToken(account) {

    return jwt.sign({ sub: account.id, id: account.id, role: account.role }, config.secret, { expiresIn: '360m' });
}


function basicDetails(account) {
    const { id,  username, role } = account;
    return { id, username, role };
}
