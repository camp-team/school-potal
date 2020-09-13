import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as Twitter from 'twitter';
import { Teacher } from './interfaces/teacher';

export const db = admin.firestore();

export const setTeacherDataById = functions
  .region('asia-northeast1')
  .https.onCall(async (param) => {
    const masterId: string = functions.config().twitter.masterid;
    const twitterData = (await db.doc(`users/${masterId}`).get()).data();

    if (twitterData) {
      const twitterClient = new Twitter({
        consumer_key: functions.config().credential.twitter.consumer_key,
        consumer_secret: functions.config().credential.twitter.consumer_secret,
        access_token_key: functions.config().twitter.token_key,
        access_token_secret: functions.config().twitter.token_secret,
      });

      const teacherIds: string = param.teacherIds.join(',');

      const twitterProfile = await twitterClient.get('users/lookup', {
        screen_name: teacherIds,
      });

      console.log(teacherIds);
      console.log(param.articleId);

      param.teacherIds.map((teacherId: string) => {
        console.log(teacherId);
        console.log(param.articleId);
        console.log(twitterProfile);
        const teacher: Teacher = {
          id: teacherId,
          name: twitterProfile.name,
          screenName: twitterProfile.screen_name,
          description: twitterProfile.description,
          profileImageUrl: twitterProfile.profile_image_url_https.replace(
            '_normal',
            ''
          ),
          twitterUid: twitterProfile.user_id,
        };
        return db
          .doc(`articles/${param.articleId}/teachers/${teacherId}`)
          .set(teacher);
      });
      return true;
    } else {
      throw new Error('認証に失敗しました');
    }
  });
