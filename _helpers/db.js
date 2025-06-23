const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
   const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: process.env.SQLITE_STORAGE || './db.sqlite', // default file path
        define: {
            id: false, // retain your original define settings
        }
    });

    // db.User = require('../users/user.model')(sequelize);
    db.Quote = require('../models/quotation.model')(sequelize);

    await sequelize.sync({alter: true});
}