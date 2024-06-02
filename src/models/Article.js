const { DataTypes } = require('sequelize');
const sequelize = require('../../config/firebase');

const Article = sequelize.define('Article', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'articles',
    timestamps: true
});

module.exports = Article;
