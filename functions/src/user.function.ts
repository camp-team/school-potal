import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { sendEmail } from './sendgrid.function';

export const db = admin.firestore();

export const createUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate((user) => {
    return db.doc(`users/${user.uid}`).set({
      uid: user.uid,
      name: user.displayName,
      photoURL: user.photoURL,
      email: user.email,
      createdAt: new Date(),
      isAdmin: false,
      plan: 'free',
    });
  });

export const deleteAfUser = functions
  .region('asia-northeast1')
  .https.onCall((data, _) => {
    return admin.auth().deleteUser(data);
  });

export const deleteUserAccount = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete(async (user, _) => {
    return db.doc(`users/${user.uid}`).delete();
  });

export const sendEmailCreateUser = functions
  .region('asia-northeast1')
  .firestore.document('users/{uid}')
  .onCreate((snap) => {
    const user = snap.data();
    return sendEmail({
      to: user.email,
      templateId: 'd-347a1159a5a44b84a31c3a4694d1c177',
      dynamicTemplateData: {
        name: user.name,
      },
    });
  });

export const sendEmailDeleteUser = functions
  .region('asia-northeast1')
  .firestore.document('users/{uid}')
  .onDelete((snap) => {
    const user = snap.data();
    return sendEmail({
      to: user.email,
      templateId: 'd-7957bcb26523496aa6a56cf954dce54b',
      dynamicTemplateData: {
        name: user.name,
      },
    });
  });
