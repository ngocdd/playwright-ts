/******************************************************************************
 * @Author                : ngocdd<ngocdd94@gmail.com>                        *
 * @CreatedDate           : 2023-07-05 20:02:29                               *
 * @LastEditors           : ngocdd<ngocdd94@gmail.com>                        *
 * @LastEditDate          : 2023-07-05 20:37:29                               *
 *****************************************************************************/

import winston = require('winston')

const Logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.uncolorize({ level: true, message: true, raw: true }),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.align(),
        winston.format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    }),
    new winston.transports.File({
      filename: './test-results/execution.log',
      format: winston.format.combine(
        winston.format.uncolorize({ level: true, message: true, raw: true }),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.align(),
        winston.format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    }),
  ],
})
export default Logger
