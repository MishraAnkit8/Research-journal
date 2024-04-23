const { redisClient } = require("../config/redis")
const { internalServerError } = require("./error/error.handler")

module.exports.getRedisData = async (key) => {
    if(!key) {
        internalServerError()
    }
    const redisCLientConn = await redisClient
    const data = await redisCLientConn.get(key)

    if(!data) {
        internalServerError()
    }

    return JSON.parse(data)
}

module.exports.setRedisData = async (key, data) => {
    const redisConnection = await redisClient

    redisConnection.set(key, JSON.stringify(data))
}