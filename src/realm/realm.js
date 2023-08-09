import Realm from 'realm';

export const Music = {
  name: 'Music',
  primaryKey: 'id',
  properties: {
    id: 'string',
    title: 'string',
    thumbnailUrl: 'string',
    currentTime: {type: 'double', default: 0},
    duration: {type: 'double', default: 0},
    rate: {type: 'double', default: 0},
  },
};

const realm = new Realm({
  schema: [Music],
  schemaVersion: 1,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 1) {
      const oldObjects = oldRealm.objects('Music');
      const newObjects = newRealm.objects('Music');
      for (let i = 0; i < oldObjects.length; i++) {
        newObjects[i].rate =
          Math.floor(
            ((oldObjects[i].currentTime * 100) / oldObjects[i].duration) * 100,
          ) / 100;
      }
    }
  },
});

export function saveMusic(type, data: Partial) {
  try {
    realm.write(() => {
      realm.create(type, data, true);
      console.log('保存成功');
    });
  } catch (error) {
    console.log('保存失败:' + error);
  }
}

export function deleteMusic(data) {
  return Promise.resolve(() => {
    try {
      realm.write(() => {
        realm.delete(data);
      });
    } catch (error) {
      console.log('删除失败');
    }
  });
}

export function deleteAll(type) {
  try {
    realm?.write(() => {
      let data = realm.objects(type);
      realm.delete(data);
    });
  } catch (error) {
    console.log('删除失败');
  }
}

export function queryMusic(type, query) {
  if (query) {
    return realm.objects(type).filtered(query);
  }
  return realm.objects(type);
}


export default realm;
