import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as Twitter from 'twitter';

export const db = admin.firestore();

export const setTeacherDataById = functions
  .region('asia-northeast1')
  .https.onCall(async (teacherId) => {
    const masterId: string = functions.config().masterid;
    const twitterData = (
      await db.doc(`users/${masterId}/private/twitter`).get()
    ).data();

    console.log(twitterData);

    if (twitterData) {
      const twitterClient = new Twitter({
        consumer_key: functions.config().twitter.consumer_key,
        consumer_secret: functions.config().twitter.consumer_secret,
        access_token_key: functions.config().twitter.token_key,
        access_token_secret: functions.config().twitter.toke_secret,
      });
      const TwitterProfile = await twitterClient.get('users/show', {
        screen_name: teacherId,
      });

      await db.doc(`articles/${teacherId}/teachers/teacherData`).set({
        screen_name: TwitterProfile.screen_name,
        description: TwitterProfile.description,
        profile_banner_url: TwitterProfile.profile_banner_url,
      });
      console.log(TwitterProfile);

      return true;
    } else {
      throw new Error('認証に失敗しました');
    }
  });
