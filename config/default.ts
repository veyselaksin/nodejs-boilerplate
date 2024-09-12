export default {
    APP_PORT: parseInt(process.env.APP_PORT!, 10),
    MONGO_URI: process.env.MONGO_URI!,
    SALT_WORK_FACTOR: parseInt(process.env.SALT_WORK_FACTOR!, 10)
}
