import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

export { createUser, sendEmailCreateUser } from './create-user.function';

export { setTeacherDataById } from './twitter.function';

export {
  createArticle,
  deleteArticle,
  updateArticle,
} from './article.function';

export { countUpLiked, countDownLiked } from './like.function';

export { countUpPin, countDownPin } from './pin.function';

export { sendEmailForAuthApply } from './sendgrid.function';
