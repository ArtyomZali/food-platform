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

const { DATABASE_URL } = process.env;
const dbUrl = url.parse(DATABASE_URL);
const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
const password = dbUrl.auth.substr(
  dbUrl.auth.indexOf(':') + 1,
  dbUrl.auth.length
);
const dbName = dbUrl.path.slice(1);
const host = dbUrl.hostname;
const { port } = dbUrl;
config.host = host;
config.port = port;
const sequelize = new Sequelize(dbName, username, password, config);

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
