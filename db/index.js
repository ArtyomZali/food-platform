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



const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
      ssl: {
          require: true,
          rejectUnauthorized: false
      }
  }
});

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
