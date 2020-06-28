import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const db = admin.firestore();

export const createUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate((user) => {
    return db.doc(`users/${user.uid}`).set({
      name: user.displayName,
      photoURL: user.photoURL,
      email: user.email,
      createdAt: new Date(),
    });
  });
