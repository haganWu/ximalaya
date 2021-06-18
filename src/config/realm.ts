import Realm, {schemaVersion} from 'realm';

export interface ISaveProgram {
  id: string;
  title: string;
  thumbnailUrl: string;
  currentTime: number;
  duration: number;
  rate: number;
  listenTime: number;
}

/**
 * 声明表
 */
class Program {
  currentTime = 0;
  duration = 0;
  static schema = {
    name: 'Program',
    primaryKey: 'id',
    properties: {
      id: 'string',
      title: 'string',
      thumbnailUrl: 'string',
      currentTime: {type: 'double', default: 0},
      duration: {type: 'double', default: 0},
      // rate: {type: 'double', default: 0},
      listenTime: {type: 'double', default: 0},
    },
  };
  get rate() {
    return this.duration > 0
      ? Math.floor(((this.currentTime * 100) / this.duration) * 100) / 100
      : 0;
  }
}

const realm = new Realm({
  schema: [Program],
  schemaVersion: 1,
  /* migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 1) {
      const oldObjects1 = oldRealm.objects<ISaveProgram>('Program');
      const newObjects1 = newRealm.objects<ISaveProgram>('Program');
      for (let i = 0; i < oldObjects1.length; i++) {
        newObjects1[i].rate =
          Math.floor(
            ((oldObjects1[i].currentTime * 100) / oldObjects1[i].duration) *
              100,
          ) / 100;
      }
    }
  }, */
});

/**
 * Partial:把一个属性的类型全部设置成可选的
 * @param data
 */
export function saveProgram(data: Partial<ISaveProgram>) {
  try {
    realm.write(() => {
      //给Program这张表插入数据
      realm.create('Program', data, Realm.UpdateMode.All);
    });
  } catch (error) {
    console.log('saveProgram 保存失败 error:', error);
  }
}

export default realm;
