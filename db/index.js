const { Sequelize } = require('sequelize');
// Determine the environment (dev or prod)
const env = (process.env.NODE_ENV || 'development').trim();
const config = require('../config/config.json')[env];

const pool = {
  max: 100,
  min: 10,
};

const retry = {
  max: 5,
};

const sequelize = new Sequelize("postgres://vckdqvmyyrpcdi:7cd4a51cf8d4c2b28cf6ef4d45327363b59fdc8859bd8e9ba8601c6d066dee9f@ec2-3-211-6-217.compute-1.amazonaws.com:5432/d1s5ghfijnqm3g");

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Connection to the DB has been established successfully in ${env} environment.`);
  } catch (error) {
    console.error('Unable to connect to the DB:', error);
  }
};

connect();

module.exports = sequelize;
