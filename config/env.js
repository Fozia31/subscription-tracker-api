import {config} from 'dotenv'

// eslint-disable-next-line no-undef
config( {path:`.env.${process.env.NODE_ENV || 'development'}.local`} );

// eslint-disable-next-line no-undef
export const {PORT,NODE_ENV,DB_URI,JWT_SECRET,JWT_EXPIRE_IN , ARJET_ENV,ARCJET_KEY,QSTASH_URL,QSTASH_TOKEN,QSTASH_CURRENT_SIGNING_KEY,QSTASH_NEXT_SIGNING_KEY,EMAIL_PASSWORD} = process.env;