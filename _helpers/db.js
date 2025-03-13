require('dotenv').config();
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    const { host, port, user, password, database } = process.env;
    const connection = await mysql.createConnection({ host: host, port: port, user: user, password: password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    const sequelize = new Sequelize(database, user, password, {dialect: 'mysql', host: host, port: port, define: {id: false,}}); 

    db.User = require('../users/user.model')(sequelize);

    await sequelize.sync({alter: true});
}