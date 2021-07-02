import { NativeModules } from 'react-native';

type ReactNativeCoreType = {
  multiply(a: number, b: number): Promise<number>;
};

const { ReactNativeCore } = NativeModules;

export default ReactNativeCore as ReactNativeCoreType;
