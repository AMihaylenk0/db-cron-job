const { Sequelize, Op  } = require('sequelize');
require('dotenv').config();
const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 1));
// const sequelize = new Sequelize(`${process.env.DATABASE_URI}?sslmode=require`, {
const sequelize = new Sequelize(`${process.env.DATABASE_URI}?sslmode=require`, {
  url: process.env.DATABASE_URI,
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // very important
    }
  }
})

let News = sequelize.define('News', {});
async function deleteRow() {
  try {
    await News.destroy({
      where: {
        created_at: {
          // $lt: sevenDaysAgo,
          [Op.lte]: sevenDaysAgo
        },
        // sportCategory: 'football'
      },
      // truncate: true,
      // restartIdentity: true // works only with truncate
    });
    console.log('table cleared')
  } catch (error) {
    throw error
  }
  sequelize.close();
}
deleteRow();