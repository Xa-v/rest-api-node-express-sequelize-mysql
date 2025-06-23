const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
         vehicleCategory: {
            type: DataTypes.STRING,
            allowNull: false
        },
        vehicleModel: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dealer: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false, defaultValue:"N/A"
        },
        zipCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        commentsForDealer: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        timeframeToPurchase: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };

    const options = {
        timestamps: true, 
       
    };

    return sequelize.define('Quotation', attributes, options);
}