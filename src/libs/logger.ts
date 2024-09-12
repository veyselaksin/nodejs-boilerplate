import logger from 'pino'
import dayjs from 'dayjs'

export default logger({
    base: {
        pid: false
    },
    transport: {
        target: 'pino-pretty',
        options: {
            levelFirst: true,
            translateTime: true,
            colorize: true
        }
    },
    timestamp: () => `,"time":"${dayjs().format()}"`
})
