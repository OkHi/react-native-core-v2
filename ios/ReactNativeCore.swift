import UIKit
import OkCore

@objc(ReactNativeCore)
class ReactNativeCore: NSObject {
    
    var credentials: NSDictionary?
    
    let okhiLocationService = OkHiLocationService()
    
    @objc func initialize(_ branchId: String, clientKey: String, environment: String, resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
        credentials = [ "branchId": branchId, "clientKey": clientKey, "environment": environment ]
        resolve(true)
    }
    
    @objc func isLocationPermissionGranted(_ resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
        resolve(okhiLocationService.isLocationPermissionGranted())
    }
    
    @objc func isBackgroundLocationPermissionGranted(_ resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
        resolve(okhiLocationService.isLocationPermissionGranted()) // TODO: need isBackgroundLocationPermissionGranted
    }
    
    @objc func isLocationServicesEnabled(_ resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
        resolve(okhiLocationService.isLocationServicesAvailable())
    }
    
    @objc func openLocationServicesSettings (_ resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
        UIApplication.shared.open(URL(string:UIApplication.openSettingsURLString)!)
    }
    
    @objc func requestEnableLocationServices (_ resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
        UIApplication.shared.open(URL(string:UIApplication.openSettingsURLString)!)
    }
    
    @objc func getSDKVersion(_ resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
        resolve(UIDevice.current.systemVersion)
    }
}
