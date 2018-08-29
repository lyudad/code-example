import { platform } from 'Helpers/pickers'

export default {
  yellowBox: platform({ ios: __DEV__, android: false }),
  useReactotron: __DEV__
}
