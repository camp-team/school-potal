import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { shouldEventRun, markEventTried } from './utils/firebase-util';

const db = admin.firestore();

export const countUpPin = functions
  .region('asia-northeast1')
  .firestore.document('articles/{articleId}/pinnedUids/{uid}')
  .onCreate(async (snap, context) => {
    const eventId = context.eventId;
    return shouldEventRun(eventId).then(async (should) => {
      if (should) {
        await db
          .doc(`articles/${context.params.articleId}`)
          .update('pinCount', admin.firestore.FieldValue.increment(1));
        return markEventTried(eventId);
      } else {
        return;
      }
    });
  });

export const countDownPin = functions
  .region('asia-northeast1')
  .firestore.document('articles/{articleId}/pinnedUids/{uid}')
  .onDelete(async (snap, context) => {
    const eventId = context.eventId;
    return shouldEventRun(eventId).then(async (should) => {
      if (should) {
        await db
          .doc(`articles/${context.params.articleId}`)
          .update('pinCount', admin.firestore.FieldValue.increment(-1));
        return markEventTried(eventId);
      } else {
        return;
      }
    });
  });
