exports.cors = {
    origin: "*"
};

exports.environment = "local"; //local, product

exports.port = process.env.PORT || 8888;

exports.ConfigDB = {
    mysql: {
        client: 'mysql',
        connection: {
            host: process.env.MYSQL_HOST || 'localhost',
            user: process.env.MYSQL_USER || '****',
            password: process.env.MYSQL_PASS || '*****',
            database: process.env.MYSQL_DB || 'api_blog',
            charset: 'utf8mb4',
            port: process.env.MYSQL_PORT || '3306',
            options: {
                cryptoCredentialsDetails: {
                    minVersion: 'TLSv1'
                },
                "enableArithAbort": true
            }
        },
        migrations: {
            directory: './migrations',
            tableName: 'migrations',
        },
        seeds: {
            directory: './seeds',
        },
    },
};

exports.ConfigMail = {
    Email: 'sciencepost95@gmail.com',
    PassWord: '******'
}

exports.ConfigKeySecret = {
    accessTokenSecret: "***********************************",
    accessTokenLife: "2h",
    refreshTokenLife: "3650d",
    refreshTokenSecret: "******************************************************************"
}
