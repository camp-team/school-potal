import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

export { createUser } from './create-user.function';

export { setTeacherDataById } from './twitter.function';
