import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as Twitter from 'twitter';

export const db = admin.firestore();

export const setTeacherDataById = functions
  .region('asia-northeast1')
  .https.onCall(async (data) => {
    const twitterData = (
      await db.doc(`articles/${data.uId}/private/twitter`).get()
    ).data();

    if (twitterData) {
      const twitterClient = new Twitter({
        consumer_key: functions.config().twitter.consumer_key,
        consumer_secret: functions.config().twitter.consumer_secret,
        access_token_key: twitterData.accessToken,
        access_token_secret: twitterData.secret,
      });
      const TwitterProfile = await twitterClient.get('users/show', {
        user_id: data.teacherId,
      });
      await db.doc(`articles/${data.teacherId}/teachers/teacherData`).set({
        screen_name: TwitterProfile.screen_name,
        description: TwitterProfile.description,
        profile_banner_url: TwitterProfile.profile_banner_url,
      });
      return true;
    } else {
      throw new Error('認証に失敗しました');
    }
  });
