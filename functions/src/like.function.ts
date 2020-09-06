import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const db = admin.firestore();

export const countUpLiked = functions
  .region('asia-northeast1')
  .firestore.document('articles/{articleId}/likedUids/{uid}')
  .onCreate(async (snap, context) => {
    return db
      .doc(`articles/${context.params.articleId}`)
      .update('likeCount', admin.firestore.FieldValue.increment(1));
  });

export const countDownLiked = functions
  .region('asia-northeast1')
  .firestore.document('articles/{articleId}/likedUids/{uid}')
  .onDelete(async (snap, context) => {
    return db
      .doc(`articles/${context.params.articleId}`)
      .update('likeCount', admin.firestore.FieldValue.increment(-1));
  });
