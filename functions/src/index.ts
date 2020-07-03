import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

export {
  createUserWithGoogle,
  createUserWithTwitter,
} from './create-user.function';

export { createUserWithTwitterData } from './twitter.function';
