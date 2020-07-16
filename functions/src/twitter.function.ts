import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as Twitter from 'twitter';

export const db = admin.firestore();

export const setTeacherDataById = functions
  .region('asia-northeast1')
  .https.onCall(async (param) => {
    const masterId: string = functions.config().twitter.masterid;
    const twitterData = (
      await db.doc(`users/${masterId}/private/twitter`).get()
    ).data();

    console.log(twitterData);

    if (twitterData) {
      const twitterClient = new Twitter({
        consumer_key: functions.config().credential.twitter.consumer_key,
        consumer_secret: functions.config().credential.twitter.consumer_secret,
        access_token_key: functions.config().twitter.token_key,
        access_token_secret: functions.config().twitter.token_secret,
      });
      const TwitterProfile = await twitterClient.get('users/show', {
        screen_name: param.teacherId,
      });

      await db
        .doc(`articles/${param.articleId}/teachers/${param.teacherId}`)
        .set({
          name: TwitterProfile.name,
          screenName: TwitterProfile.screen_name,
          description: TwitterProfile.description,
          profileImageUrl: TwitterProfile.profile_image_url_https,
        });
      console.log(TwitterProfile);

      return true;
    } else {
      throw new Error('認証に失敗しました');
    }
  });
