const Sequelize = require('sequelize');
const db = require('../db');

const Campus = db.define("campus", {

  name: {
    type: Sequelize.STRING,
    allowNull: false
  },

  imgUrl: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: 'https://admission.brown.edu/sites/g/files/dprerj526/files/styles/ultrawide_med/public/2020-06/Hosted-Virtual-Campus-Tour-banner-larger.jpg?h=298f6650&itok=55wGTeb3'
  },

  address: {
    type: Sequelize.TEXT,
    allowNull: false
  },

  description: {
    type: Sequelize.TEXT,
  }



});

module.exports = Campus;