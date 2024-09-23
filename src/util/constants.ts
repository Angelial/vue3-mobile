import env from './env'
// const appConfig = {
//   ios: {
//     key: 'd271c356cf12c87351fba0371429a273',
//     secret: '62753fe3429f6891dc2c13575562895f'
//   },
//   android: {
//     key: 'f3e33599419d53487161144c467598ce',
//     secret: '2bf8659a9a43519b65ca19e036fe3bcf'
//   },
//   PC: {
//     key: 'f3e33599419d53487161144c467598ce',
//     secret: '2bf8659a9a43519b65ca19e036fe3bcf'
//   }
// }
const appConfigObj = {
  prod: {
    android: {
      key: '55270eb79ee6038a08a37cffe711675d',
      secret: 'ad34939c06b9b51efb70e7eb995ca3bd'
    },
    ios: {
      key: 'ea2efc4bfaf2b8d5185701f22cf41791',
      secret: '0eb128f044ed90e0ce4362cadb76b958'
    },
    PC: {
      key: '55270eb79ee6038a08a37cffe711675d',
      secret: 'ad34939c06b9b51efb70e7eb995ca3bd'
    }
  },
  test: {
    ios: {
      key: 'd271c356cf12c87351fba0371429a273',
      secret: '62753fe3429f6891dc2c13575562895f'
    },
    android: {
      key: 'f3e33599419d53487161144c467598ce',
      secret: '2bf8659a9a43519b65ca19e036fe3bcf'
    },
    PC: {
      key: 'f3e33599419d53487161144c467598ce',
      secret: '2bf8659a9a43519b65ca19e036fe3bcf'
    }
  }
}

const appConfig =
  process.env.NODE_ENV === 'production' ? appConfigObj.prod : appConfigObj.test
// const appConfig = appConfigObj.prod

const envPlatform = env.inEnv()
export const ClientInfo = {
  appKey: appConfig[envPlatform].key,
  platform: envPlatform,
  appVersion: '1.7.10', // 接口版本号
  channel: 'H5',
  outAppVersion: '1.0.6', // 程序版本号
  appPackage: 'com.mysterybox.mojo'
}
export const ClientSecret = appConfig[envPlatform].secret
export const sysVersion = '1.0.0'
