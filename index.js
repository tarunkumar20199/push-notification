import {AppRegistry} from 'react-native';
import App from '../PushNotification/src/App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
messaging().getInitialNotification(async remoteMessage => {
  console.log('Message handled in the kill!', remoteMessage);
});
AppRegistry.registerComponent(appName, () => App);