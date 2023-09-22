const mongoose = require('mongoose');

async function databaseConnect (url) {
  try {
    const db = await mongoose.connect(url);
    console.log('DB is connected to ', db.connection.host)
  } catch (error) {
    console.error(error);
  }
}

module.exports = { databaseConnect };