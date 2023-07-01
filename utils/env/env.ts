export function setEnv (){

    // default ENV is UAT
    process.env['ENV'] = 'stg';

    // decrypt en
    require('@tka85/dotenvenc').decrypt({ encryptedFile: `./utils/env/.${process.env.ENV}.enc`});
}




