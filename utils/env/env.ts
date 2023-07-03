/******************************************************************************
 * @Author                : ngocdd<ngocdd94@gmail.com>                        *
 * @CreatedDate           : 2023-07-03 09:42:33                               *
 * @LastEditors           : ngocdd<ngocdd94@gmail.com>                        *
 * @LastEditDate          : 2023-07-03 09:42:42                               *
 *****************************************************************************/

export function setEnv (){

    // default ENV is UAT
    process.env['ENV'] = 'stg';

    // decrypt en
    require('@tka85/dotenvenc').decrypt({ encryptedFile: `./utils/env/.${process.env.ENV}.enc`});
}
