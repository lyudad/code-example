import immutablePersistenceTransform from 'Services/ImmutablePersistenceTransform'
import { AsyncStorage } from 'react-native'

export default {
  active: true,
  reducerVersion: '1.0',
  storeConfig: {
    storage: AsyncStorage,
    whitelist: [
      'viewer'
    ],
    transforms: [immutablePersistenceTransform]
  }
}
