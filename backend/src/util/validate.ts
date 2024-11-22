import {  cleanEnv, port, str } from "envalid";


export default cleanEnv(process.env, {
    MONGO_CONNECTING_STRING : str(),
    PORT : port(),
    SESSION_SECREAT: str(),
    NODE_ENV: str(),
    
});

