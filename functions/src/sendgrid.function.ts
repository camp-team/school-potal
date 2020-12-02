import * as functions from 'firebase-functions';
import * as sgMail from '@sendgrid/mail';
import * as admin from 'firebase-admin';

export const db = admin.firestore();

const API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(API_KEY);

export const sendEmail = (data: {
  to: string;
  templateId: string;
  dynamicTemplateData?: { [name: string]: any };
}) => {
  return sgMail.send({
    from: {
      email: 'edu.univ.japan@gmail.com',
      name: 'eduu',
    },
    ...data,
  });
};

export const sendEmailForAuthApply = functions
  .region('asia-northeast1')
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'Must be logged with an email address'
      );
    } else {
      const msg = {
        to: 'edu.univ.japan@gmail.com',
        from: 'edu.univ.japan@gmail.com',
        templateId: 'd-d0e0b39b7ad6421289346c2a9e480d52',
        dynamic_template_data: {
          name: data.name,
          email: data.email,
          text: data.text,
          uid: context.auth.uid,
        },
      };

      await sgMail.send(msg);
      return { success: true };
    }
  });
