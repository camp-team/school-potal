import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as Twitter from 'twitter';

export const db = admin.firestore();

export const createUserWithTwitterData = functions
  .region('asia-northeast1')
  .https.onCall(async (data) => {
    const twitterData = await (
      await db.doc(`users/${data.uid}/private/twitter`).get()
    ).data();

    if (twitterData) {
      const twitterClient = new Twitter({
        consumer_key: functions.config().twitter.consumer_key,
        consumer_secret: functions.config().twitter.consumer_secret,
        access_token_key: twitterData.accessToken,
        access_token_secret: twitterData.secret,
      });
      const TwitterProfile = await twitterClient.get('users/show', {
        user_id: twitterData.uid,
        screen_name: twitterData.name,
        description: twitterData.description,
      });

      console.log(TwitterProfile);
      return true;
    } else {
      throw new Error('認証に失敗しました');
    }
  });
