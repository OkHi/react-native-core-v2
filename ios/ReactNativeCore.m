#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ReactNativeCore, NSObject)

RCT_EXTERN_METHOD(multiply:(float)a withB:(float)b withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(initialize:(NSString *)branchId clientKey:(NSString *)clientKey environment:(NSString *)environment resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(isLocationPermissionGranted: (RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(isBackgroundLocationPermissionGranted: (RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(isLocationServicesEnabled: (RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(openLocationServicesSettings: (RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(requestEnableLocationServices: (RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getSDKVersion: (RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

@end
