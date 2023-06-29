import authenticate from "./utils/auth/auth.setup";
import { setEnv } from './utils/env/env';

async function globalSetup() {
    // setup env for run test
    await setEnv();
    
    // get authentication for all tests
    await authenticate();
}

export default globalSetup;