const fs = require('fs');

module.exports = {
    development: {
        username: 'root',
        password: '100grilo',
        database: 'sgLegis',
        host: 'localhost',
        port: 3306,
        dialect: 'mysql',
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOSTNAME,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        // dialectOptions: {
        //     ssl: {
        //         ca: fs.readFileSync(__dirname + '/ca-certificate.crt')
        //     }
        // }
    }
};