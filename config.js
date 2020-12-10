module.exports = {
   api: {
      port: process.env.PORT || 3000,
   },
   jwt: {
      secret: process.env.JWT_SECRET || 'secretnote!',
   },
   mysql: {
      host: process.env.MYSQL_HOST || 'remotemysql.com',
      user: process.env.MYSQL_USER || 'y97g1jcUYZ',
      password: process.env.MYSQL_PASS || 'jkPDnEOJSK',
      database: process.env.MYSQL_DB || 'y97g1jcUYZ'
   }
}