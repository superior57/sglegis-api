const fs = require('fs');

module.exports = {
    development: {
        username: 'root',
        password: '100grilo',
        database: 'sgLegis',
        host: '127.0.0.1',
        dialect: 'mysql',
        port: 3306
    },
    test: {
        username: 'database_test',
        password: null,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'mysql',
        port: 3306
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOSTNAME,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        dialectOptions: {
            ssl: {
                ca: fs.readFileSync(__dirname + '/ca-certificate.crt')
            }
        }
    }
};