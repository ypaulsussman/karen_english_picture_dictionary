// connection.js
var pg = require('pg');
var connectionString = '';

if(process.env.DATABASE_URL !== undefined) {
    // connectionString = process.env.DATABASE_URL + "?ssl=true";
    connectionString = process.env.DATABASE_URL;
    pg.defaults.ssl = true;
} else {
    connectionString = 'postgres://localhost:5432/kepd';
}

module.exports = connectionString;
