import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import * as OkHi from '@okhi/react-native-core';

OkHi.init({
  branchId: '<my_branch_id>',
  clientKey: '<my_client_key>',
  environemnt: 'sandbox',
}).then(console.log);

AppRegistry.registerComponent(appName, () => App);
