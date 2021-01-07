module.exports = {
   remoteDB: process.env.REMOTE_DB || false,
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
   },
   post: {
      port: process.env.POST_PORT || 3002
   },
   mysqlService: {
      host: process.env.MYSQL_SERV_HOST || 'localhost',
      port: process.env.MYSQL_SERV_PORT || 3001
   },
   cacheService: {
      host: process.env.CACHE_SERV_HOST || 'localhost',
      port: process.env.CACHE_SERV_PORT || 3003
   },
   redisConfig: {
      host: process.env.REDIS_HOST || 'redis-10964.c10.us-east-1-2.ec2.cloud.redislabs.com',
      port: process.env.REDIS_PORT || '10964',
      password: process.env.REDIS_PASS || 'BnPhcA1FZPQhycNsVdcF4uL1vkLy5e2J'
   }
}