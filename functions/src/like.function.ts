import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { shouldEventRun, markEventTried } from './utils/firebase-util';

const db = admin.firestore();

export const countUpLiked = functions
  .region('asia-northeast1')
  .firestore.document('articles/{articleId}/likedUids/{uid}')
  .onCreate(async (snap, context) => {
    const eventId = context.eventId;
    return shouldEventRun(eventId).then(async (should) => {
      if (should) {
        await db
          .doc(`articles/${context.params.articleId}`)
          .update('likeCount', admin.firestore.FieldValue.increment(1));
        return markEventTried(eventId);
      } else {
        return;
      }
    });
  });

export const countDownLiked = functions
  .region('asia-northeast1')
  .firestore.document('articles/{articleId}/likedUids/{uid}')
  .onDelete(async (snap, context) => {
    const eventId = context.eventId;
    return shouldEventRun(eventId).then(async (should) => {
      if (should) {
        await db
          .doc(`articles/${context.params.articleId}`)
          .update('likeCount', admin.firestore.FieldValue.increment(-1));
        return markEventTried(eventId);
      } else {
        return;
      }
    });
  });
