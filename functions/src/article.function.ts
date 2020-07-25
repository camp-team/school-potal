import { Algolia } from './utils/algolia.function';
import * as functions from 'firebase-functions';

const algolia = new Algolia();

export const createArticle = functions
  .region('asia-northeast1')
  .firestore.document('articles/{id}')
  .onCreate((snap) => {
    const data = snap.data();
    return algolia.saveRecord({
      indexName: 'articles',
      largeConcentKey: 'features',
      data: {
        id: data.id,
        name: data.name,
        title: data.title,
        category: data.category,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        type: data.type,
        featureTitle1: data.featureTitile1,
        featureBody1: data.featureBody1,
        featureTitle2: data.featureTitile2,
        featureBody2: data.featureBody2,
      },
    });
  });

export const deleteArticle = functions
  .region('asia-northeast1')
  .firestore.document('articles/{id}')
  .onDelete((snap) => {
    const data = snap.data();

    if (data) {
      return algolia.removeRecord('articles', data.id);
    } else {
      return;
    }
  });

export const updateArticle = functions
  .region('asia-northeast1')
  .firestore.document('articles/{id}')
  .onUpdate((change) => {
    const data = change.after.data();
    return algolia.saveRecord({
      indexName: 'articles',
      largeConcentKey: 'body',
      isUpdate: true,
      data: {
        id: data.id,
        name: data.name,
        title: data.title,
        category: data.category,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        type: data.type,
        featureTitle1: data.featureTitile1,
        featureBody1: data.featureBody1,
        featureTitle2: data.featureTitile2,
        featureBody2: data.featureBody2,
      },
    });
  });
