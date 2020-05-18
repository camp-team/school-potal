import * as functions from 'firebase-functions';

const db = admin.firestore;

export const createUser = functions.auth.user().onCreate((user) => {
  db.doc(`users/${user.uid}`).set();
});
