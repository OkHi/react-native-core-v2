import * as React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import {
  isGooglePlayServicesAvailable,
  isLocationPermissionGranted,
  isLocationServicesEnabled,
  requestEnableGooglePlayServices,
  requestEnableLocationServices,
  requestLocationPermission,
  isBackgroundLocationPermissionGranted,
  requestBackgroundLocationPermission,
} from '@okhi/react-native-core';
import secret, { Core } from './secret';

function signIn() {
  const core = new Core();
  try {
    core.signInWithPhone(secret.phone).then(console.log).catch(console.log);
    core.signInWithUserId(secret.userId).then(console.log).catch(console.log);
  } catch (error) {
    console.log(error);
  }
}

async function checkPermissions() {
  if (!(await isGooglePlayServicesAvailable())) {
    const hasPlayServices = await requestEnableGooglePlayServices();
    console.log('hasPlayServices', hasPlayServices);
  }

  if (!(await isLocationPermissionGranted())) {
    const hasPermission = await requestLocationPermission();
    console.log('hasPermission', hasPermission);
  }

  if (!(await isLocationServicesEnabled())) {
    const hasLocationServices = await requestEnableLocationServices();
    console.log('hasLocationServices', hasLocationServices);
  }

  if (!(await isBackgroundLocationPermissionGranted())) {
    const hasLocationServices = await requestBackgroundLocationPermission();
    console.log('hasBackgroundLocationServices', hasLocationServices);
  }
  console.log('DONE');
}

export default function App() {
  return (
    <View style={styles.container}>
      <Button title="Sign In" onPress={() => signIn()} />
      <Button title="Check permissions" onPress={() => checkPermissions()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
