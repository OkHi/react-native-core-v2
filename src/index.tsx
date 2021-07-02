import { NativeModules, Platform, PermissionsAndroid } from 'react-native';
import { OkHiException } from './OkHiException';

export * from './types';
export * from './OkHiException';
export * from './OkHiCore';
export * from './OkHiMode';

/**
 * @ignore
 */
type ReactNativeCoreType = {
  isLocationPermissionGranted(): Promise<boolean>;
  isLocationServicesEnabled(): Promise<boolean>;
  isGooglePlayServicesAvailable(): Promise<boolean>;
  isBackgroundLocationPermissionGranted(): Promise<boolean>;
  openLocationServicesSettings(): Promise<void>;
  requestEnableLocationServices(): Promise<boolean>;
  requestEnableGooglePlayServices(): Promise<boolean>;
  getSDKVersion(): Promise<number>;
  requestLocationPermission(): Promise<boolean>;
  requestBackgroundLocationPermission(): Promise<boolean>;
  initialize(
    branchId: string,
    clientKey: string,
    environemt: string
  ): Promise<boolean>;
};

/**
 * @ignore
 */
const ReactNativeCore: ReactNativeCoreType = NativeModules.ReactNativeCore;

/**
 * Checks whether foreground location permission is granted.
 * @return {Promise<boolean>} A promise that resolves to a boolean value indicating whether or not the permission is granted.
 */
export const isLocationPermissionGranted = (): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    if (Platform.OS === 'ios') {
      resolve(await ReactNativeCore.isLocationPermissionGranted());
    } else if (Platform.OS === 'android') {
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      resolve(hasPermission);
    } else {
      reject(
        new OkHiException({
          code: OkHiException.UNSUPPORTED_PLATFORM_CODE,
          message: OkHiException.UNSUPPORTED_PLATFORM_MESSAGE,
        })
      );
    }
  });
};

/**
 * Checks whether location services are available and turned on.
 * @return {Promise<boolean>} A promise that resolves to a boolean value indicating whether or not the the service is available.
 */
export const isLocationServicesEnabled = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'android' || Platform.OS == 'ios') {
      ReactNativeCore.isLocationServicesEnabled()
        .then(resolve)
        .catch((error) =>
          reject(
            new OkHiException({
              code: error.code,
              message: error.message,
            })
          )
        );
    } else {
      reject(
        new OkHiException({
          code: OkHiException.UNSUPPORTED_PLATFORM_CODE,
          message: OkHiException.UNSUPPORTED_PLATFORM_MESSAGE,
        })
      );
    }
  });
};

/**
 * Checks whether Google Play Service is available and turned on.
 * @return {Promise<boolean>} A promise that resolves to a boolean value indicating whether or not the the service is available.
 */
export const isGooglePlayServicesAvailable = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (Platform.OS !== 'android') {
      reject(
        new OkHiException({
          code: OkHiException.UNSUPPORTED_PLATFORM_CODE,
          message: OkHiException.UNSUPPORTED_PLATFORM_MESSAGE,
        })
      );
    }
    ReactNativeCore.isGooglePlayServicesAvailable()
      .then(resolve)
      .catch((error) =>
        reject(
          new OkHiException({
            code: error.code,
            message: error.message,
          })
        )
      );
  });
};

/**
 * Launches the user's devices location settings, enabling them to turn on location services.
 * @return {Promise<void>}
 */
export const openLocationServicesSettings = (): Promise<void> => {
  return new Promise((_, reject) => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      ReactNativeCore.openLocationServicesSettings();
    } else {
      reject(
        new OkHiException({
          code: OkHiException.UNSUPPORTED_PLATFORM_CODE,
          message: OkHiException.UNSUPPORTED_PLATFORM_MESSAGE,
        })
      );
    }
  });
};

/**
 * Displays an in app native modal, that prompts the user to enable location services.
 * @return {Promise<boolean>} A promise that resolves to a boolean value indicating whether or not the the service is available.
 */
export const requestEnableLocationServices = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      ReactNativeCore.requestEnableLocationServices()
        .then(resolve)
        .catch((error) =>
          reject(
            new OkHiException({
              code: error.code,
              message: error.message,
            })
          )
        );
    } else {
      reject(
        new OkHiException({
          code: OkHiException.UNSUPPORTED_PLATFORM_CODE,
          message: OkHiException.UNSUPPORTED_PLATFORM_MESSAGE,
        })
      );
    }
  });
};

/**
 * Launches the device's Google Play Services settings, prompting the user to enable the service.
 * @return {Promise<boolean>} A promise that resolves to a boolean value indicating whether or not the the service is available.
 */
export const requestEnableGooglePlayServices = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (Platform.OS !== 'android') {
      reject(
        new OkHiException({
          code: OkHiException.UNSUPPORTED_PLATFORM_CODE,
          message: OkHiException.UNSUPPORTED_PLATFORM_MESSAGE,
        })
      );
    }
    ReactNativeCore.requestEnableGooglePlayServices()
      .then(resolve)
      .catch((error) =>
        reject(
          new OkHiException({
            code: error.code,
            message: error.message,
          })
        )
      );
  });
};

/**
 * Requests foreground location permission from the user.
 * @return {Promise<boolean>} A promise that resolves to a boolean value indicating whether or not the the permission is granted.
 */
export const requestLocationPermission = (): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    if (Platform.OS === 'android') {
      const hasPermission = await isLocationPermissionGranted();
      if (hasPermission) {
        return resolve(hasPermission);
      }
      const status: any = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);
      resolve(status['android.permission.ACCESS_FINE_LOCATION'] === 'granted');
    } else if (Platform.OS === 'ios') {
      resolve(await ReactNativeCore.requestLocationPermission());
    } else {
      reject(
        new OkHiException({
          code: OkHiException.UNSUPPORTED_PLATFORM_CODE,
          message: OkHiException.UNSUPPORTED_PLATFORM_MESSAGE,
        })
      );
    }
  });
};

/**
 * Checks whether background location permission is granted.
 * @return {Promise<boolean>} A promise that resolves to a boolean value indicating whether or not the permission is granted.
 */
export const isBackgroundLocationPermissionGranted = (): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    if (Platform.OS === 'ios') {
      resolve(await ReactNativeCore.isBackgroundLocationPermissionGranted());
    } else if (Platform.OS === 'android') {
      const sdkVersion = await ReactNativeCore.getSDKVersion();
      if (sdkVersion < 29) {
        resolve(await isLocationPermissionGranted());
      } else if (sdkVersion < 23) {
        resolve(true);
      } else {
        const hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION
        );
        resolve(hasPermission);
      }
    } else {
      reject(
        new OkHiException({
          code: OkHiException.UNSUPPORTED_PLATFORM_CODE,
          message: OkHiException.UNSUPPORTED_PLATFORM_MESSAGE,
        })
      );
    }
  });
};

/**
 * Requests background location permission from the user.
 * @return {Promise<boolean>} A promise that resolves to a boolean value indicating whether or not the the permission is granted.
 */
export const requestBackgroundLocationPermission = (): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    if (Platform.OS === 'android') {
      const hasPermission = await isBackgroundLocationPermissionGranted();
      if (hasPermission) {
        return resolve(hasPermission);
      }
      const status: any = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      ]);
      const sdkVersion = await ReactNativeCore.getSDKVersion();
      if (sdkVersion < 29) {
        resolve(
          status['android.permission.ACCESS_FINE_LOCATION'] === 'granted'
        );
      } else if (sdkVersion < 23) {
        resolve(true);
      } else {
        resolve(
          status['android.permission.ACCESS_BACKGROUND_LOCATION'] === 'granted'
        );
      }
    } else if (Platform.OS === 'ios') {
      resolve(await ReactNativeCore.requestBackgroundLocationPermission());
    } else {
      reject(
        new OkHiException({
          code: OkHiException.UNSUPPORTED_PLATFORM_CODE,
          message: OkHiException.UNSUPPORTED_PLATFORM_MESSAGE,
        })
      );
    }
  });
};

export const init = (credentials: {
  branchId: string;
  clientKey: string;
  environemnt: string;
}) => {
  return ReactNativeCore.initialize(
    credentials.branchId,
    credentials.clientKey,
    credentials.environemnt
  );
};
