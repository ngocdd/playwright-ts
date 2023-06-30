export function setEnv (){

    // default ENV is UAT
    process.env['ENV'] = 'stg';

    // env config
    const envConfig = {
    path: `./utils/env/.env.${process.env.ENV}`,
    // path: `./utils/env/.env.uat`,
    override: true
    }
    
    // console.log(`${process.env.ENV}`);
    // setup env config
    // require('dotenv').config(envConfig);

    // decrypt en
    require('@tka85/dotenvenc').decrypt({ encryptedFile: `./utils/env/.${process.env.ENV}.enc`});

    // test get env var
    // console.log(process.env.BASE_URL);

}




