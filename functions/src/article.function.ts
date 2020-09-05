import { Algolia } from './utils/algolia.function';
import * as functions from 'firebase-functions';

const algolia = new Algolia();

export const createArticle = functions
  .region('asia-northeast1')
  .firestore.document('articles/{id}')
  .onCreate((snap) => {
    const data = snap.data();
    const tmp = data.feature;
    const removeTag = tmp.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
    return algolia.saveRecord({
      indexName: 'articles',
      largeConcentKey: 'feature',
      data: {
        id: data.id,
        name: data.name,
        title: data.title,
        category: data.category,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        type: data.type,
        feature: removeTag,
        thumbnailURL: data.thumbnailURL,
        tags: data.tags,
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
    const tmp = data.feature;
    const removeTag = tmp.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
    return algolia.saveRecord({
      indexName: 'articles',
      largeConcentKey: 'feature',
      isUpdate: true,
      data: {
        id: data.id,
        name: data.name,
        title: data.title,
        category: data.category,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        type: data.type,
        feature: removeTag,
        thumbnailURL: data.thumbnailURL,
        tags: data.tags,
      },
    });
  });
