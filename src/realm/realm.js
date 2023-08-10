import Realm from 'realm';
//数据库实体
export const Music = {
  name: 'Music',
  primaryKey: 'id',
  properties: {
    id: 'string',
    title: 'string',
    thumbnailUrl: 'string',
    url: 'string',
    currentTime: {type: 'double', default: 0},
    duration: {type: 'double', default: 0},
    rate: {type: 'double', default: 0},
  },
};
/**
 * realm 版本迁移
 * @type {Realm}
 */
const realm = new Realm({
  schema: [Music],
  schemaVersion: 2,
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

/**
 * 保存数据
 * @param type
 * @param data
 */
export function saveRealm(type, data: Partial) {
  try {
    realm?.write(() => {
      realm.create(type, data, true);
      console.log('保存成功');
    });
  } catch (error) {
    console.log('保存失败:' + error);
  }

}

/**
 * 删除一个
 * @param data
 * @returns {Promise<void>}
 */
export function deleteRealm(data) {
  return Promise.resolve(() => {
    try {
      realm?.write(() => {
        realm.delete(data);
      });
    } catch (error) {
      console.log('删除失败');
    }
  });
}

/**
 * 删除所有数据
 * @param type
 */
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

/**
 * 查询数据
 * @param type
 * @param query
 * @returns {Realm.Results<Realm.Object>}
 */
export function queryRealm(type, query) {
  if (query) {
    return realm.objects(type).filtered(query);
  }
  return realm.objects(type);
}


export default realm;
