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
        dialect: 'mysql',
        uri: process.env.DATABASE_URL
        // dialectOptions: {
        //     ssl: {
        //         ca: fs.readFileSync(__dirname + '/ca-certificate.crt')
        //     }
        // }
    }
};